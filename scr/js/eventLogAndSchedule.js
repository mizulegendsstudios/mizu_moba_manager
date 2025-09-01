// Registro de eventos
function addSocialPost(type, message, icon) {
    const post = document.createElement('div');
    post.className = 'social-post';
    
    let iconColor = 'text-gray-400';
    if (type === 'announcement') iconColor = 'text-blue-400';
    else if (type === 'match') iconColor = 'text-green-400';
    else if (type === 'elimination') iconColor = 'text-red-400';
    else if (type === 'achievement') iconColor = 'text-yellow-400';
    else if (type === 'alert') iconColor = 'text-red-500';
    
    post.innerHTML = `
        <div class="flex items-center space-x-2 mb-2">
            <span class="text-xl ${iconColor}">${icon}</span>
            <span class="font-semibold text-white text-sm">MOBA News</span>
            <span class="text-xs text-gray-500 ml-auto">${new Date().toLocaleTimeString()}</span>
        </div>
        <p class="text-gray-300 text-sm">${message}</p>
    `;
    
    gameLogContainer.prepend(post);
    if (gameLogContainer.childElementCount > 50) {
        gameLogContainer.removeChild(gameLogContainer.lastChild);
    }
}

// Calendario
function renderMatchResults() {
    matchResultsContainer.innerHTML = '';
    
    if (gameState.currentWeek < gameState.schedule.length) {
        const weekMatches = gameState.schedule[gameState.currentWeek];
        weekMatches.forEach(match => {
            const team1 = gameState.teams[match[0]];
            const team2 = gameState.teams[match[1]];
            let resultText = "Próximo partido";
            const matchResult = gameState.results.find(r => 
                (r.team1 === team1.name && r.team2 === team2.name) || 
                (r.team1 === team2.name && r.team2 === team1.name)
            );
            if (matchResult) {
                resultText = `Ganador: ${matchResult.winner === team1.name ? team1.emoji : team2.emoji} ${matchResult.winner} (${matchResult.score})`;
            }
            const matchCard = document.createElement('div');
            matchCard.className = "p-4 bg-[#23262d] rounded-xl border border-[#30363d]";
            matchCard.innerHTML = `
                <p class="text-sm">Jornada ${gameState.currentWeek + 1}</p>
                <div class="flex items-center justify-between mt-1">
                    <span class="font-bold text-white">${team1.emoji} ${team1.name}</span>
                    <span class="text-gray-400">vs</span>
                    <span class="font-bold text-white">${team2.emoji} ${team2.name}</span>
                </div>
                <p class="mt-2 text-center text-sm font-semibold">${resultText}</p>
            `;
            matchResultsContainer.appendChild(matchCard);
        });
    } else {
        matchResultsContainer.innerHTML = `<p class="text-center text-gray-400">La temporada regular ha terminado.</p>`;
    }
}
