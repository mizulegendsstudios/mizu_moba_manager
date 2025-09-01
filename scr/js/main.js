// scr/js/main.js
import { init } from './submain.js';
import * as EventLogAndSchedule from './eventLogAndSchedule.js';
import * as StandingsAndBracket from './standingsAndBracket.js';
import * as TeamManagement from './teamManagement.js';
import * as Achievements from './achievements.js'; // Importación actualizada
import * as Participants from './participants.js';
import * as SaveSystem from './saveSystem.js';
import * as ControlsAndCompatibility from './controlsAndCompatibility.js';

// Inicializa el juego al cargar la página
window.onload = () => {
    init(
        EventLogAndSchedule,
        StandingsAndBracket,
        TeamManagement,
        Achievements, // Módulo renombrado
        Participants,
        SaveSystem,
        ControlsAndCompatibility
    );
};
