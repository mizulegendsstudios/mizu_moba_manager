// controlsAndCompatibility.js
const ControlsAndCompatibility = (function() {
    // Configuración de controles
    let controls = {
        select: 'Enter',
        back: 'Escape',
        // Agrega más controles según sea necesario
    };

    // Verifica la compatibilidad del navegador
    function checkCompatibility() {
        return {
            localStorage: typeof(Storage) !== 'undefined',
            // Agrega más verificaciones según sea necesario
        };
    }

    // Obtiene la configuración de controles
    function getControls() {
        return controls;
    }

    return {
        checkCompatibility,
        getControls
    };
})();

export { ControlsAndCompatibility };
