// scr/js/main.js
import { init } from './submain.js';
import { EventLogAndSchedule } from './eventLogAndSchedule.js';
import { StandingsAndBracket } from './standingsAndBracket.js';
import { TeamManagement } from './teamManagement.js';
import { Achievements } from './achievementsAndWiki.js'; 
import { Participants } from './participants.js'; // Importación Corregida
import { SaveSystem } from './saveSystem.js';
import { ControlsAndCompatibility } from './controlsAndCompatibility.js';

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
