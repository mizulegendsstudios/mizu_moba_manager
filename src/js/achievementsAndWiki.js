// scr/js/achievements.js

const Achievements = (function() {
    // Lista de logros disponibles. La propiedad 'unlocked' será actualizada.
    let achievements = [
        { id: 1, name: "Primer Equipo", description: "Crea tu primer equipo", unlocked: false },
        { id: 2, name: "5 Victorias", description: "Gana 5 partidos seguidos", unlocked: false },
        { id: 3, name: "Campeón de la Liga", description: "Gana el Bracket Final", unlocked: false }
    ];

    // Desbloquea un logro específico por su ID.
    function unlockAchievement(achievementId) {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            console.log(`Logro desbloqueado: ${achievement.name}`);
            // Aquí podrías agregar lógica para mostrar una notificación en la UI
        }
    }

    // Obtiene la lista completa de logros.
    function getAchievements() {
        return achievements;
    }

    // Carga los logros desde datos guardados.
    function loadAchievements(data) {
        if (data && data.achievements) {
            achievements = data.achievements;
        }
    }

    // Expone las funciones públicas del módulo.
    return {
        unlockAchievement,
        getAchievements,
        loadAchievements
    };
})();

export { Achievements };
