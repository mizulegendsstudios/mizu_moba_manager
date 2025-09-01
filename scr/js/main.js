// scr/js/main.js
import { init } from './submain.js';
import * as EventLogAndSchedule from './eventLogAndSchedule.js';
import * as StandingsAndBracket from './standingsAndBracket.js';
import * as TeamManagement from './teamManagement.js';
import * as Achievements from './achievements.js'; 
import * as Participants from './participants.js';
import { SaveSystem } from './saveSystem.js'; // Importación Corregida
import * as ControlsAndCompatibility from './controlsAndCompatibility.js';

// Inicializa el juego al cargar la página
window.onload = () => {
    init(
        EventLogAndSchedule,
        StandingsAndBracket,
        TeamManagement,
        Achievements,
        Participants,
        SaveSystem,
        ControlsAndCompatibility
    );
};
