function renderPlayerManagement() {
    const userTeam = gameState.teams.find(t => t.isUserTeam);
    teamNameInput.value = userTeam.name;
    teamEmojiInput.value = userTeam.emoji;
    tournamentsTotalSpan.textContent = tournamentStats.total;
    tournaments1stSpan.textContent = tournamentStats.first;
    tournaments2ndSpan.textContent = tournamentStats.second;
    tournaments3rdSpan.textContent = tournamentStats.third;
    starterCountSpan.textContent = `${userTeam.starters.length}/5`;
    matchHistoryList.innerHTML = '';
    userTeamHistory.forEach(match => {
        const li = document.createElement('li');
        const resultClass = match.result === 'Victoria' ? 'match-history-win' : 'match-history-loss';
        const resultText = match.result === 'Victoria' ? 'Victoria' : 'Derrota';
        li.className = `text-sm ${resultClass}`;
        li.innerHTML = `${match.round}: vs ${match.opponent} - <strong>${resultText} (${match.gameScore})</strong>`;
        matchHistoryList.appendChild(li);
    });
    starterPlayersContainer.innerHTML = '';
    availablePlayersContainer.innerHTML = '';
    
    const availablePlayers = userTeam.players.filter(player => !userTeam.starters.some(s => s.id === player.id));
    userTeam.starters.forEach(player => {
        renderPlayerCard(player, starterPlayersContainer, true, false);
    });
    availablePlayers.forEach(player => {
        renderPlayerCard(player, availablePlayersContainer, false, false);
    });
    
    setTimeout(() => {
        userTeam.starters.forEach(player => {
            renderRadarChart(player, false);
        });
        availablePlayers.forEach(player => {
            renderRadarChart(player, false);
        });
    }, 50);
}

function renderPlayerCard(player, container, isStarter, isParticipantView = false) {
    const cardId = `player-card-${player.id}-${isParticipantView ? 'part' : 'mng'}`;
    const playerCard = document.createElement('div');
    playerCard.dataset.playerId = player.id;
    playerCard.id = cardId;
    playerCard.className = `p-3 rounded-xl shadow-md transition-all duration-200 flex flex-col items-center space-y-2 player-card ${isStarter ? 'bg-[#0e7490] hover:bg-[#08617d] cursor-pointer' : 'bg-[#23262d] hover:bg-[#1e232b] cursor-pointer'}`;
    
    if (isParticipantView) {
         playerCard.classList.remove('hover:bg-[#08617d]', 'hover:bg-[#1e232b]', 'cursor-pointer');
    }
    
    const chartCanvasId = `chart-${player.id}-${isParticipantView ? 'part' : 'mng'}`;
    const cardContent = `
        <div class="player-card-content text-center w-full">
            <div class="flex-grow flex flex-col items-center justify-center">
                <span class="text-3xl">${player.emoji}</span>
                <p class="font-medium text-white text-sm">${player.name}</p>
                <p class="text-xs text-gray-400">${player.nationality}</p>
            </div>
            <div class="flex-shrink-0 w-full h-24">
                <canvas id="${chartCanvasId}" class="w-full h-full"></canvas>
            </div>
        </div>
    `;
    
    playerCard.innerHTML = cardContent;
    
    if (!isParticipantView) {
        playerCard.addEventListener('click', () => {
            toggleStarter(player);
            renderPlayerManagement();
        });
    }
    container.appendChild(playerCard);
}

function toggleStarter(player) {
    const userTeam = gameState.teams.find(t => t.isUserTeam);
    const isStarter = userTeam.starters.some(s => s.id === player.id);
    if (isStarter) {
        userTeam.starters = userTeam.starters.filter(s => s.id !== player.id);
    } else {
        if (userTeam.starters.length < 5) {
            userTeam.starters.push(player);
        } else {
            addSocialPost("alert", "Ya tienes 5 jugadores titulares. Elimina uno antes de añadir otro.", "⚠️");
        }
    }
}

function renderRadarChart(player, isParticipantView) {
    const canvasId = `chart-${player.id}-${isParticipantView ? 'part' : 'mng'}`;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }
    const attributeValues = Object.values(player.attributes);
    const attributeLabels = Object.keys(player.attributes).map(label => label.charAt(0).toUpperCase() + label.slice(1));
    
    const newChart = new Chart(canvas, {
        type: 'radar',
        data: {
            labels: attributeLabels,
            datasets: [{
                data: attributeValues,
                backgroundColor: 'rgba(23, 192, 235, 0.4)',
                borderColor: '#0e7490',
                borderWidth: 1,
                pointBackgroundColor: '#0e7490',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#0e7490'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    pointLabels: {
                        color: '#c9d1d9',
                        font: { size: 8 }
                    },
                    ticks: {
                        display: false,
                        max: 100
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            return `${context.label}: ${context.raw}`;
                        }
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 3
                }
            }
        }
    });
    
    charts[canvasId] = newChart;
}
