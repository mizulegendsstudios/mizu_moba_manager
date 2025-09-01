function initializeControls() {
    // Controles de teclado
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'Enter':
                if (!nextStepBtn.disabled) {
                    simulateNextStep();
                }
                break;
            case 'Escape':
                if (!notificationModal.classList.contains('hidden')) {
                    closeModalBtn.click();
                }
                break;
            case 'ArrowRight':
                // Navegación entre pestañas
                const activeTab = document.querySelector('.tab-btn.active');
                if (activeTab) {
                    const nextTab = activeTab.nextElementSibling;
                    if (nextTab && nextTab.classList.contains('tab-btn')) {
                        nextTab.click();
                    }
                }
                break;
            case 'ArrowLeft':
                // Navegación entre pestañas
                const activeTabLeft = document.querySelector('.tab-btn.active');
                if (activeTabLeft) {
                    const prevTab = activeTabLeft.previousElementSibling;
                    if (prevTab && prevTab.classList.contains('tab-btn')) {
                        prevTab.click();
                    }
                }
                break;
        }
    });
    
    // Soporte para gamepads
    const gamepadHandler = () => {
        const gamepads = navigator.getGamepads();
        
        for (const gamepad of gamepads) {
            if (gamepad) {
                // Botón A (Enter)
                if (gamepad.buttons[0].pressed) {
                    if (!nextStepBtn.disabled) {
                        simulateNextStep();
                    }
                }
                
                // Botón B (Escape)
                if (gamepad.buttons[1].pressed) {
                    if (!notificationModal.classList.contains('hidden')) {
                        closeModalBtn.click();
                    }
                }
                
                // D-pad derecho (flechas)
                if (gamepad.buttons[15].pressed) { // Derecha
                    const activeTab = document.querySelector('.tab-btn.active');
                    if (activeTab) {
                        const nextTab = activeTab.nextElementSibling;
                        if (nextTab && nextTab.classList.contains('tab-btn')) {
                            nextTab.click();
                        }
                    }
                }
                
                if (gamepad.buttons[14].pressed) { // Izquierda
                    const activeTab = document.querySelector('.tab-btn.active');
                    if (activeTab) {
                        const prevTab = activeTab.previousElementSibling;
                        if (prevTab && prevTab.classList.contains('tab-btn')) {
                            prevTab.click();
                        }
                    }
                }
            }
        }
        requestAnimationFrame(gamepadHandler);
    };
    
    // Iniciar soporte para gamepads
    if ('getGamepads' in navigator) {
        requestAnimationFrame(gamepadHandler);
    }
    
    // Soporte para Smart TV
    if (navigator.userAgent.includes('TV') || navigator.userAgent.includes('SmartTV')) {
        document.body.classList.add('tv-mode');
        console.log("Modo Smart TV activado");
    }
}

function initializeCompatibility() {
    // Verificar soporte para localStorage
    if (typeof(Storage) === "undefined") {
        console.error("LocalStorage no está disponible. El guardado de partidas no funcionará.");
        addSocialPost("error", "Tu navegador no soporta guardado de partidas", "❌");
    }
    
    // Verificar soporte para gamepads
    if (!('getGamepads' in navigator)) {
        console.log("Gamepads no soportados en este navegador");
    }
    
    // Verificar soporte para notificaciones
    if (!("Notification" in window)) {
        console.log("Notificaciones no soportadas");
    }
}
