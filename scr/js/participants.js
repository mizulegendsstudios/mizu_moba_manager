function renderParticipants() {
    allTeamsContainer.innerHTML = '';
    
    gameState.teams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = "p-6 bg-[#23262d] rounded-xl border border-[#30363d]";
        
        const teamTitleHTML = `<h3 class="text-xl font-bold mb-4 text-white">${team.emoji} ${team.name}</h3>`;
        
        const playersContainer = document.createElement('div');
        playersContainer.className = "flex flex-wrap gap-4 justify-center";
        
        team.players.forEach(player => {
            const isStarter = team.starters.some(s => s.id === player.id);
            renderPlayerCard(player, playersContainer, isStarter, true);
        });
        
        teamCard.innerHTML = teamTitleHTML;
        teamCard.appendChild(playersContainer);
        allTeamsContainer.appendChild(teamCard);
    });
    
    setTimeout(() => {
        gameState.teams.forEach(team => {
            team.players.forEach(player => {
                renderRadarChart(player, true);
            });
        });
    }, 50);
}
