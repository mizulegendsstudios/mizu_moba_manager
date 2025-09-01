// saveSystem.js
const SaveSystem = (function() {
    const SAVE_KEY = 'mizuEsportsSaveData';

    // Guarda el estado actual del juego
    function saveGame(data) {
        try {
            localStorage.setItem(SAVE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Error al guardar el juego:", error);
            return false;
        }
    }

    // Carga el estado guardado del juego
    function loadGame() {
        try {
            const savedData = localStorage.getItem(SAVE_KEY);
            return savedData ? JSON.parse(savedData) : null;
        } catch (error) {
            console.error("Error al cargar el juego:", error);
            return null;
        }
    }

    // Elimina el guardado actual
    function deleteSave() {
        localStorage.removeItem(SAVE_KEY);
    }

    return {
        saveGame,
        loadGame,
        deleteSave
    };
})();

export { SaveSystem };
