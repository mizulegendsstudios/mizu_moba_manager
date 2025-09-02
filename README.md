# Mizu Coder

**Versión: 2.0.0**  
**Desarrollado por: Mizu Legends Studios**

---

## 📖 Descripción

**Mizu Coder** es una aplicación web interactiva diseñada para facilitar la edición y previsualización de código **HTML**, **CSS** y **JavaScript** en tiempo real.  
Permite a los usuarios escribir código en editores separados por pestañas, ver resultados instantáneamente en una vista previa integrada y depurar con una consola personalizada.

---

## 🚀 Novedades de la versión 2.0.0

- ✅ **División del código** en archivos **HTML + CSS + JS** (antes estaba todo unificado).  
- ✅ Nuevo **selector de modo estilo Apple** con las siguientes opciones:
  - **Modo Unificado** → Un solo archivo HTML con todo el código.  
  - **Modo Separado** → HTML, CSS y JS en pestañas independientes.  
  - **Modo Mizu** (⚠️ en desarrollo) → Usará `src/css/core.css` + `src/js/core.js`.  
  - **Modo Personalizado** (⚠️ en desarrollo) → Permitirá crear y gestionar múltiples archivos.  
- ✅ **Redimensionamiento mejorado** con slider responsivo:  
  - Horizontal en pantallas grandes.  
  - Vertical en pantallas pequeñas.  
- ✅ Estado actual: **estable y funcional**.  

> ℹ️ Nota: **Modo Mizu** y **Modo Personalizado** aún no están habilitados.  
En próximas versiones se agregará la capacidad de crear múltiples pestañas JS/CSS para activarlos.

---

## ✨ Funcionalidades principales

- 📝 **Editores en pestañas** para HTML, CSS y JS.  
- 🔄 **Vista previa en vivo** dentro de un `iframe`.  
- 🖥️ **Consola integrada** con soporte para `console.log`, `console.warn` y `console.error`.  
- 💾 **Guardado automático** en `localStorage`.  
- 📤 **Exportación de código** de cada pestaña como archivo descargable.  
- 📐 **Ajuste dinámico** entre editor y vista previa con slider.  

---

## 📂 Estructura del proyecto

mizu-coder/
│── index.html # Interfaz principal
│── src/
│ ├── css/
│ │ └── core.css # Estilos base
│ └── js/
│ └── core.js # Lógica principal


---

## 🛠️ Instalación y uso

1. Clona o descarga este proyecto en tu máquina local.  
2. Abre el archivo `index.html` en tu navegador favorito.  
3. Escribe tu código HTML, CSS y JS en las pestañas correspondientes.  
4. Observa los resultados instantáneamente en la vista previa.  

---

## 📌 Roadmap (Próximos pasos)

- [ ] Agregar soporte para **pestañas dinámicas** de múltiples archivos JS/CSS.  
- [ ] Habilitar los modos **Mizu** y **Personalizado**.  
- [ ] Mejorar la gestión de proyectos y exportación.  
- [ ] Optimizar experiencia en dispositivos móviles.  

---

## 👨‍💻 Contribuyentes

- **Mizu Legends Studios**

---

## 📜 Licencia

Este proyecto está licenciado bajo **AGPL 3.0**.  
Eres libre de usarlo, modificarlo y distribuirlo bajo los términos de dicha licencia.
