// scr/js/participants.js
const Participants = (function() {
    let players = [];
    let teams = [];

    // Carga los datos de jugadores y equipos, ya sea desde un guardado o por defecto
    function loadParticipants(data) {
        if (data && data.players) {
            players = data.players;
        } else {
            // Inicialización por defecto si no hay datos guardados
            players = [
                { id: 1, name: "Jugador 1", attributes: { vision: 8, reflexes: 7, communication: 9, tecnologia: 6, teamwork: 8, mood: 10 } },
                { id: 2, name: "Jugador 2", attributes: { vision: 7, reflexes: 9, communication: 8, tecnologia: 7, teamwork: 9, mood: 8 } },
            ];
        }

        if (data && data.teams) {
            teams = data.teams;
        } else {
            teams = [
                { id: 1, name: "Equipo 1", emblem: "⚡", players: [1, 2, 3, 4, 5] },
            ];
        }
    }

    // Crea y añade un nuevo equipo a la lista de equipos
    function createAndAddTeam(name, emblem) {
        const newTeam = {
            id: teams.length > 0 ? Math.max(...teams.map(t => t.id)) + 1 : 1,
            name,
            emblem,
            players: []
        };
        teams.push(newTeam);
        return newTeam;
    }

    // Agrega un jugador a un equipo
    function addPlayerToTeam(teamId, playerId) {
        const team = teams.find(t => t.id === teamId);
        if (team && !team.players.includes(playerId)) {
            team.players.push(playerId);
        }
    }

    // Elimina un jugador de un equipo
    function removePlayerFromTeam(teamId, playerId) {
        const team = teams.find(t => t.id === teamId);
        if (team) {
            team.players = team.players.filter(id => id !== playerId);
        }
    }

    // Obtiene los jugadores de un equipo
    function getTeamPlayers(teamId) {
        const team = teams.find(t => t.id === teamId);
        return team ? team.players.map(id => players.find(p => p.id === id)) : [];
    }
    
    // Obtiene la lista de jugadores
    function getPlayers() {
        return players;
    }

    // Obtiene la lista de equipos
    function getTeams() {
        return teams;
    }

    // Agrega un nuevo jugador
    function addPlayer(player) {
        players.push(player);
    }

    // Elimina un jugador
    function removePlayer(playerId) {
        players = players.filter(player => player.id !== playerId);
    }

    // Actualiza los atributos de un jugador
    function updatePlayerAttributes(playerId, newAttributes) {
        const player = players.find(p => p.id === playerId);
        if (player) {
            player.attributes = { ...player.attributes, ...newAttributes };
        }
    }

    return {
        loadParticipants,
        getPlayers,
        getTeams,
        addPlayer,
        removePlayer,
        updatePlayerAttributes,
        createAndAddTeam,
        addPlayerToTeam,
        removePlayerFromTeam,
        getTeamPlayers
    };
})();

export { Participants };
