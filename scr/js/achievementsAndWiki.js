// Sistema de Logros
function updateTournamentStats() {
    const winner = gameState.bracket.gfHistory[0]?.winner;
    const second = gameState.bracket.gfHistory[0]?.loser;
    const third = gameState.bracket.lbHistory[1]?.loser;
    const fourth = gameState.bracket.lbHistory[0]?.loser;
    if (winner && winner.isUserTeam) {
        tournamentStats.first++;
        addSocialPost("achievement", "¡Felicidades, tu equipo ha quedado en primer lugar! 🥇", "🎉");
    }
    if (second && second.isUserTeam) {
        tournamentStats.second++;
        addSocialPost("achievement", "¡Felicidades, tu equipo ha quedado en segundo lugar! 🥈", "🎉");
    }
    if (third && third.isUserTeam) {
        tournamentStats.third++;
        addSocialPost("achievement", "¡Felicidades, tu equipo ha quedado en tercer lugar! 🥉", "🎉");
    }
    if (fourth && fourth.isUserTeam) {
         addSocialPost("achievement", "Tu equipo ha quedado en cuarto lugar.", "👏");
    }
}

// Wiki
function initializeWiki() {
    // La wiki ya está implementada en el HTML estático
    // Esta función podría usarse para inicializar contenido dinámico en el futuro
    console.log("Wiki inicializada");
}
