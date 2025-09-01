// main.js

// =============================
// Importar módulos por secciones
// =============================
import * as EventLogAndSchedule from './eventLogAndSchedule.js';     // A
import * as StandingsAndBracket from './standingsAndBracket.js';     // B
import * as TeamManagement from './teamManagement.js';               // C
import * as AchievementsAndWiki from './achievementsAndWiki.js';     // D
import * as Participants from './participants.js';                   // E
import * as SaveSystem from './saveSystem.js';                       // F
import * as ControlsAndCompatibility from './controlsAndCompatibility.js'; // G
import * as Submain from './submain.js';                             // H

// =============================
// Inicialización del juego
// =============================
window.addEventListener("DOMContentLoaded", () => {
    console.log("Mizu Esports Simulator cargado ✅");

    // Inicializar compatibilidad (controles, atajos, etc.)
    ControlsAndCompatibility.initControls();

    // Inicializar sistema de guardado
    SaveSystem.loadGame();

    // Iniciar el juego principal
    Submain.initGame();
});
