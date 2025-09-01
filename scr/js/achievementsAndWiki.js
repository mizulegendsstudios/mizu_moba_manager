// achievementsAndWiki.js
const AchievementsAndWiki = (function() {
    // Lista de logros disponibles
    const achievements = [
        { id: 1, name: "Primer Equipo", description: "Crea tu primer equipo", unlocked: false },
        { id: 2, name: "5 Victorias", description: "Gana 5 partidos seguidos", unlocked: false },
        // Agrega más logros según sea necesario
    ];

    // Lista de artículos de la wiki
    const wikiArticles = {
        "mecanicas-basicas": {
            title: "Mecánicas Básicas",
            content: "Aquí va el contenido sobre las mecánicas básicas del juego..."
        },
        // Agrega más artículos según sea necesario
    };

    // Desbloquea un logro
    function unlockAchievement(achievementId) {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
            achievement.unlocked = true;
        }
    }

    // Obtiene la lista de logros
    function getAchievements() {
        return achievements;
    }

    // Obtiene un artículo de la wiki
    function getWikiArticle(articleId) {
        return wikiArticles[articleId];
    }

    return {
        unlockAchievement,
        getAchievements,
        getWikiArticle
    };
})();

export { AchievementsAndWiki };
