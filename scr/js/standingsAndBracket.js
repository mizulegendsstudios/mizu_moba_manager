// Tabla de posiciones
function renderStandings() {
    const sortedTeams = [...gameState.teams].sort((a, b) => {
        if (b.wins !== a.wins) {
            return b.wins - a.wins;
        }
        return b.gamesWon - a.gamesWon;
    });
    let tableHTML = `<table class="min-w-full text-sm text-left text-gray-400 rounded-lg overflow-hidden">
                        <thead class="text-xs text-gray-200 uppercase bg-[#30363d]">
                            <tr>
                                <th scope="col" class="py-3 px-4 rounded-tl-lg">#</th>
                                <th scope="col" class="py-3 px-4">Equipo</th>
                                <th scope="col" class="py-3 px-4">Jugados (E)</th>
                                <th scope="col" class="py-3 px-4">Victorias (E)</th>
                                <th scope="col" class="py-3 px-4">Derrotas (E)</th>
                                <th scope="col" class="py-3 px-4">Jugadas (P)</th>
                                <th scope="col" class="py-3 px-4">Victorias (P)</th>
                                <th scope="col" class="py-3 px-4 rounded-tr-lg">Derrotas (P)</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
    sortedTeams.forEach((team, index) => {
        const isUserTeam = team.isUserTeam;
        const rowClass = isUserTeam ? 'bg-[#0e7490] text-white' : 'bg-[#1e232b] border-b border-[#30363d] last:border-b-0';
        const cellClass = isUserTeam ? 'text-white' : '';
        const gamesPlayed = team.wins + team.losses;
        const gamesTotal = team.gamesWon + team.gamesLost;
        tableHTML += `<tr class="${rowClass}">
                        <td class="py-3 px-4 font-bold ${cellClass}">${index + 1}</td>
                        <td class="py-3 px-4 ${cellClass}">${team.emoji} ${team.name}</td>
                        <td class="py-3 px-4 ${cellClass}">${gamesPlayed}</td>
                        <td class="py-3 px-4 text-green-400 ${cellClass}">${team.wins}</td>
                        <td class="py-3 px-4 text-red-400 ${cellClass}">${team.losses}</td>
                        <td class="py-3 px-4 ${cellClass}">${gamesTotal}</td>
                        <td class="py-3 px-4 text-green-400 ${cellClass}">${team.gamesWon}</td>
                        <td class="py-3 px-4 text-red-400 ${cellClass}">${team.gamesLost}</td>
                      </tr>`;
    });
    tableHTML += `</tbody></table>`;
    leagueStandingsContainer.innerHTML = tableHTML;
}

// Bracket final
function renderBracket() {
    bracketContainer.innerHTML = '';
    const sortedTeams = [...gameState.teams].sort((a, b) => {
        if (b.wins !== a.wins) {
            return b.wins - a.wins;
        }
        return b.gamesWon - a.gamesWon;
    });
    const topFourTeams = sortedTeams.slice(0, 4);
    const userTeamInBracket = topFourTeams.some(t => t.isUserTeam);
    
    if (gameState.bracket.phase === 'regular' && !userTeamInBracket) {
        bracketContainer.innerHTML = `
            <p class="text-center text-lg text-gray-400">Tu equipo no clasificó para el bracket final.</p>
            <p class="text-center text-sm mt-2">Aquí están los 4 equipos clasificados:</p>
            <div class="flex justify-center flex-wrap gap-4 mt-4">
                ${topFourTeams.map(t => `<div class="p-3 bg-[#23262d] rounded-xl border border-[#30363d] text-center"><p class="text-xl">${t.emoji}</p><p class="text-sm font-semibold">${t.name}</p></div>`).join('')}
            </div>
        `;
        return;
    }
    
    const renderMatch = (match) => {
        if (!match || !match.team1 || !match.team2) return '';
        const isWinner = match.winner && match.team1.key === match.winner.key;
        const winnerClass = 'text-green-400 font-bold';
        const loserClass = 'text-red-400 line-through';
        
        return `
            <div class="p-2 bg-[#1e232b] rounded-lg">
                <div class="flex items-center justify-between">
                    <span class="text-sm ${isWinner ? winnerClass : loserClass}">${match.team1.emoji} ${match.team1.name}</span>
                    <span class="text-sm text-gray-400">vs</span>
                    <span class="text-sm ${!isWinner ? winnerClass : loserClass}">${match.team2.emoji} ${match.team2.name}</span>
                </div>
            </div>
        `;
    };
    
    const renderRound = (title, matches) => {
        return `
            <div class="p-4 rounded-xl border border-[#30363d] space-y-4 flex-1">
                <h3 class="font-bold text-lg text-center">${title}</h3>
                <div class="space-y-2">
                    ${matches.length === 0 ? '<p class="text-center text-gray-400 text-sm">Próxima ronda...</p>' : matches.map(renderMatch).join('')}
                </div>
            </div>
        `;
    };
    
    let html = `<div class="flex flex-col md:flex-row gap-4">`;
    html += `<div class="flex flex-col md:w-1/3 gap-4">
                 ${renderRound("Ronda de Ganadores 1", gameState.bracket.wbHistory.slice(0, 2))}
                 ${renderRound("Final de Ganadores", gameState.bracket.wbHistory.slice(2, 3))}
            </div>`;
    html += `<div class="flex flex-col md:w-1/3 gap-4">
                 ${renderRound("Ronda de Perdedores 1", gameState.bracket.lbHistory.slice(0, 1))}
                 ${renderRound("Final de Perdedores", gameState.bracket.lbHistory.slice(1, 2))}
            </div>`;
    html += `<div class="flex flex-col md:w-1/3 gap-4">
                 ${renderRound("Gran Final", gameState.bracket.gfHistory)}
            </div>`;
    html += `</div>`;
    bracketContainer.innerHTML = html;
}
