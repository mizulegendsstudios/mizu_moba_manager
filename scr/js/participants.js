// participants.js
const Participants = (function() {
    // Lista de jugadores disponibles
    let players = [];

    // Lista de equipos disponibles
    let teams = [];

    // Inicializa jugadores y equipos con datos por defecto
    function initialize() {
        players = [
            { id: 1, name: "Jugador 1", attributes: { vision: 8, reflexes: 7, communication: 9, tech: 6, teamwork: 8, mood: 10 } },
            { id: 2, name: "Jugador 2", attributes: { vision: 7, reflexes: 9, communication: 8, tech: 7, teamwork: 9, mood: 8 } },
            // Agrega más jugadores según sea necesario
        ];

        teams = [
            { id: 1, name: "Equipo 1", emblem: "⚡", players: [1, 2, 3, 4, 5] },
            // Agrega más equipos según sea necesario
        ];
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

    // Inicializa los datos al cargar el módulo
    initialize();

    return {
        getPlayers,
        getTeams,
        addPlayer,
        removePlayer,
        updatePlayerAttributes
    };
})();

export { Participants };
