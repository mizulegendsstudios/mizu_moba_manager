// scr/js/teamManagement.js
const TeamManagement = (function() {
    // Aquí puedes incluir cualquier lógica que necesite para la gestión de equipos
    // que no modifique directamente la data central.
    // Por ejemplo, funciones para validar nombres de equipo, o lógica de personalización.
    
    // Función de utilidad para manejar la personalización del equipo del usuario
    function updateTeamDetails(team, newName, newEmoji) {
        if (newName) {
            team.name = newName;
        }
        if (newEmoji) {
            team.emblem = newEmoji;
        }
        return team;
    }

    return {
        updateTeamDetails
    };
})();

export { TeamManagement };
