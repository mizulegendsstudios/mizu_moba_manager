function saveGameState() {
    const saveData = {
        gameState: gameState,
        tournamentStats: tournamentStats,
        userTeamHistory: userTeamHistory,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('mizuEsportsSimulatorSave', JSON.stringify(saveData));
    addSocialPost("system", "Partida guardada correctamente", "💾");
}

function loadGameState() {
    const savedData = localStorage.getItem('mizuEsportsSimulatorSave');
    
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        gameState = parsedData.gameState;
        tournamentStats = parsedData.tournamentStats;
        userTeamHistory = parsedData.userTeamHistory;
        
        // Restaurar referencias a funciones
        gameState.teams.forEach(team => {
            team.players = team.players.map(p => ({...p, attributes: {...p.attributes}}));
            team.starters = team.starters.map(s => ({...s, attributes: {...s.attributes}}));
        });
        
        renderUI();
        addSocialPost("system", "Partida cargada correctamente", "📂");
        return true;
    }
    return false;
}

function clearSaveData() {
    localStorage.removeItem('mizuEsportsSimulatorSave');
    addSocialPost("system", "Datos de guardado eliminados", "🗑️");
}
