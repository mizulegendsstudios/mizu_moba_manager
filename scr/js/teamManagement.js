// teamManagement.js
import { Participants } from './participants.js';

const TeamManagement = (function() {
    // Crea un nuevo equipo
    function createTeam(name, emblem) {
        const newTeam = {
            id: Participants.getTeams().length + 1,
            name,
            emblem,
            players: []
        };
        Participants.getTeams().push(newTeam);
        return newTeam;
    }

    // Agrega un jugador a un equipo
    function addPlayerToTeam(teamId, playerId) {
        const team = Participants.getTeams().find(t => t.id === teamId);
        if (team && !team.players.includes(playerId)) {
            team.players.push(playerId);
        }
    }

    // Elimina un jugador de un equipo
    function removePlayerFromTeam(teamId, playerId) {
        const team = Participants.getTeams().find(t => t.id === teamId);
        if (team) {
            team.players = team.players.filter(id => id !== playerId);
        }
    }

    // Obtiene los jugadores de un equipo
    function getTeamPlayers(teamId) {
        const team = Participants.getTeams().find(t => t.id === teamId);
        return team ? team.players.map(id => Participants.getPlayers().find(p => p.id === id)) : [];
    }

    return {
        createTeam,
        addPlayerToTeam,
        removePlayerFromTeam,
        getTeamPlayers
    };
})();

export { TeamManagement };
