// scr/js/standingsAndBracket.js
const StandingsAndBracket = (function() {
    let standings = [];
    let bracket = [];

    // Carga los datos de la tabla de posiciones desde un guardado
    function loadStandings(data) {
        if (data) {
            standings = data;
        }
    }

    // Inicializa la tabla de posiciones con los equipos
    function initializeStandings(teams) {
        standings = teams.map(team => ({
            teamId: team.id,
            wins: 0,
            losses: 0,
            points: 0
        }));
    }

    // Actualiza la tabla de posiciones después de un partido
    function updateStandings(teamId, isWin) {
        const teamStanding = standings.find(s => s.teamId === teamId);
        if (teamStanding) {
            if (isWin) {
                teamStanding.wins++;
                teamStanding.points += 2;
            } else {
                teamStanding.losses++;
                teamStanding.points += 1;
            }
        }
        standings.sort((a, b) => b.points - a.points);
    }

    // Genera el bracket final con los 4 mejores equipos
    function generateBracket() {
        const topTeams = standings.slice(0, 4);
        bracket = [
            { matchId: 1, team1: topTeams[0].teamId, team2: topTeams[1].teamId, winner: null },
            { matchId: 2, team1: topTeams[2].teamId, team2: topTeams[3].teamId, winner: null },
            { matchId: 3, team1: null, team2: null, winner: null }
        ];
    }

    // Obtiene la tabla de posiciones
    function getStandings() {
        return standings;
    }

    // Obtiene el bracket final
    function getBracket() {
        return bracket;
    }

    return {
        loadStandings,
        initializeStandings,
        updateStandings,
        generateBracket,
        getStandings,
        getBracket
    };
})();

export { StandingsAndBracket };
