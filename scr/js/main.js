// main.js
import * as EventLogAndSchedule from './eventLogAndSchedule.js';
import * as StandingsAndBracket from './standingsAndBracket.js';
import * as TeamManagement from './teamManagement.js';
import * as AchievementsAndWiki from './achievementsAndWiki.js';
import * as Participants from './participants.js';
import * as SaveSystem from './saveSystem.js';
import * as ControlsAndCompatibility from './controlsAndCompatibility.js';
import { init } from './submain.js';

// Inicializa el juego al cargar la página
window.onload = () => {
    init(
        EventLogAndSchedule,
        StandingsAndBracket,
        TeamManagement,
        AchievementsAndWiki,
        Participants,
        SaveSystem,
        ControlsAndCompatibility
    );
};
