// submain.js
// Inicializa el juego
function init(
    EventLogAndSchedule,
    StandingsAndBracket,
    TeamManagement,
    AchievementsAndWiki,
    Participants,
    SaveSystem,
    ControlsAndCompatibility
) {
    // Verifica la compatibilidad del navegador
    const compatibility = ControlsAndCompatibility.checkCompatibility();
    if (!compatibility.localStorage) {
        console.error("El navegador no soporta localStorage. Algunas funciones no estarán disponibles.");
    }

    // Carga el juego guardado si existe
    const savedData = SaveSystem.loadGame();
    if (savedData) {
        console.log("Cargando juego guardado...");
        // Aquí cargarías los datos en los módulos correspondientes
    } else {
        console.log("Iniciando nuevo juego...");
        // Inicializa los módulos con datos por defecto
        StandingsAndBracket.initializeStandings(Participants.getTeams());
    }

    // Ejemplo de uso de los módulos
    const newTeam = TeamManagement.createTeam("Mi Equipo", "🏆");
    TeamManagement.addPlayerToTeam(newTeam.id, 1);

    // Simula un partido
    StandingsAndBracket.updateStandings(newTeam.id, true);

    // Desbloquea un logro
    AchievementsAndWiki.unlockAchievement(1);

    // Guarda el estado del juego
    const gameData = {
        teams: Participants.getTeams(),
        players: Participants.getPlayers(),
        standings: StandingsAndBracket.getStandings(),
        achievements: AchievementsAndWiki.getAchievements()
    };
    SaveSystem.saveGame(gameData);
}

// Exporta la función init
export { init };
