// scr/js/controlsAndCompatibility.js
const ControlsAndCompatibility = (function() {
    // Configuración de controles por defecto
    const DEFAULT_CONTROLS = {
        select: 'Enter',
        back: 'Escape',
        simulate: 'S',
    };

    let controls = {};

    // Carga los controles desde un guardado o usa los por defecto
    function loadControls(data) {
        if (data && data.controls) {
            controls = data.controls;
        } else {
            controls = DEFAULT_CONTROLS;
        }
    }
    
    // Obtiene la configuración de controles actual
    function getControls() {
        return controls;
    }

    // Actualiza un control específico y lo guarda
    function setControl(action, key) {
        controls[action] = key;
    }

    // Verifica la compatibilidad del navegador
    function checkCompatibility() {
        return {
            localStorage: typeof(Storage) !== 'undefined',
        };
    }

    return {
        loadControls,
        getControls,
        setControl,
        checkCompatibility
    };
})();

export { ControlsAndCompatibility };
