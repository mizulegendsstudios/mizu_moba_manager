// scr/js/submain.js
import * as UIRenderer from './uiRenderer.js'; // Asumimos un nuevo módulo para la UI

// Variable para almacenar todos los módulos de juego
let gameModules = {};

// Inicializa el juego con todos los módulos
function init(
    EventLogAndSchedule,
    StandingsAndBracket,
    TeamManagement,
    Achievements,
    Participants,
    SaveSystem,
    ControlsAndCompatibility
) {
    // Almacena los módulos en un solo objeto para un acceso más fácil
    gameModules = {
        EventLogAndSchedule,
        StandingsAndBracket,
        TeamManagement,
        Achievements,
        Participants,
        SaveSystem,
        ControlsAndCompatibility
    };
    // En submain.js, después de cargar los módulos
console.log("Módulos cargados:");
console.log("EventLogAndSchedule:", Object.keys(gameModules.EventLogAndSchedule));
console.log("StandingsAndBracket:", Object.keys(gameModules.StandingsAndBracket));
console.log("TeamManagement:", Object.keys(gameModules.TeamManagement));
console.log("Achievements:", Object.keys(gameModules.Achievements));
console.log("Participants:", Object.keys(gameModules.Participants));
console.log("SaveSystem:", Object.keys(gameModules.SaveSystem));
console.log("ControlsAndCompatibility:", Object.keys(gameModules.ControlsAndCompatibility));
    // 1. Cargar el estado guardado del juego
    const savedData = gameModules.SaveSystem.loadGame();
    
    if (savedData) {
        console.log("Cargando juego guardado...");
        // Cargar los datos en los módulos correspondientes
        gameModules.Participants.loadParticipants(savedData);
        gameModules.StandingsAndBracket.loadStandings(savedData.standings);
        gameModules.Achievements.loadAchievements(savedData.achievements);
    } else {
        console.log("Iniciando nuevo juego...");
        // Inicializar con datos por defecto si no hay partida guardada
// En submain.js, justo antes de la línea que causa error
console.log('gameModules:', gameModules);
console.log('gameModules.Participants:', gameModules.Participants);
console.log('Tipo de gameModules.Participants:', typeof gameModules.Participants);

if (gameModules.Participants && typeof gameModules.Participants.loadParticipants === 'function') {
    gameModules.Participants.loadParticipants(null);
} else {
    console.error('loadParticipants no es una función o no está disponible');
}
//ERROR
        gameModules.Participants.loadParticipants(null);
        gameModules.StandingsAndBracket.initializeStandings(gameModules.Participants.getTeams());
    }

    // 2. Conectar los listeners de la UI
    // Esta es una fase clave. Aquí irían las llamadas a las funciones que manejan
    // la interacción con los botones y elementos del HTML.
    setupEventListeners();

    // 3. Renderizar la interfaz de usuario inicial
    // Asumiendo que tienes un módulo UIRenderer, lo llamarías aquí.
    // UIRenderer.render(); 
}

// Función para simular un paso del juego (ej. una semana de partidos)
// Esta función sería llamada por un botón en la interfaz de usuario
function simulateNextStep() {
    // Ejemplo de cómo se llamaría a la lógica de los otros módulos
    const teams = gameModules.Participants.getTeams();
    // Lógica de simulación de partidos...
    // Ejemplo:
    gameModules.StandingsAndBracket.updateStandings(teams[0].id, true);
    gameModules.Achievements.unlockAchievement(2);

    // Guarda el estado del juego después de un cambio importante
    saveGameState();

    // Actualiza la UI
    // UIRenderer.render();
}

// Guarda todo el estado del juego en un solo objeto
function saveGameState() {
    const gameState = {
        players: gameModules.Participants.getPlayers(),
        teams: gameModules.Participants.getTeams(),
        standings: gameModules.StandingsAndBracket.getStandings(),
        achievements: gameModules.Achievements.getAchievements(),
        // Agrega aquí cualquier otro dato que necesites guardar
    };
    gameModules.SaveSystem.saveGame(gameState);
}

// Función de ejemplo para manejar los eventos de la interfaz
function setupEventListeners() {
    // Ejemplo de un listener para un botón "Siguiente"
    const nextBtn = document.getElementById('next-step-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', simulateNextStep);
    }

    // Ejemplo de un listener para guardar el juego
    const saveBtn = document.getElementById('save-game-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveGameState);
    }
}

// Exporta la función init para ser usada por main.js
export { init };
