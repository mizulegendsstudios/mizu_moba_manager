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

**Versión: 2.1.0**  
**Desarrollado por: Mizu Legends Studios**

---

## 📖 Descripción

**Mizu Coder** es una aplicación web interactiva para escribir y previsualizar código **HTML**, **CSS** y **JavaScript** en tiempo real.  
Su objetivo es ofrecer un entorno ligero, personalizable y modular, ideal tanto para pruebas rápidas como para la creación de proyectos más grandes.

En esta versión, se introduce un sistema de **módulos independientes** para mejorar la escalabilidad y la facilidad de mantenimiento.

---

## 🚀 Novedades de la versión 2.1.0

- 🔄 **Nueva arquitectura modular**:  
  - `core.js` ahora actúa como **gestor central de módulos**.  
  - Se pueden habilitar/deshabilitar funciones sin eliminar código.  
  - Hasta **20 módulos JS independientes** pueden ser cargados dinámicamente.  

- 📂 **Estructura de archivos actualizada**:
  - `index.html` → Interfaz principal.  
  - `src/css/core.css` → Estilos globales.  
  - `src/js/core.js` → Punto de entrada, gestiona los módulos.  
  - `src/js/moduleX.js` → Funciones opcionales (ej: logros, participantes, equipos, etc.).  

- 🖥️ **Modos de uso mejorados**:
  - **Unificado**: todo en un solo archivo HTML.  
  - **Separado**: HTML, CSS y JS distribuidos.  
  - **Mizu (experimental)**: usa `core.css` + `core.js` como base.  
  - **Personalizado (experimental)**: permitirá crear y gestionar múltiples archivos JS/CSS.  

- 📐 **Mejor manejo del rendimiento**:  
  - Los módulos no activos ya no se cargan en memoria.  
  - El editor funciona más rápido y con menos bloqueos.  

---

## ✨ Funcionalidades principales

- 📝 Editores en pestañas para **HTML, CSS y JS**.  
- 🔄 Vista previa en vivo en un `iframe`.  
- 🖥️ Consola integrada con logs, advertencias y errores.  
- 💾 Guardado automático en `localStorage`.  
- 📤 Exportación de cada pestaña como archivo.  
- 📐 Ajuste dinámico de ventana (slider horizontal/vertical).  
- ⚡ Activación selectiva de módulos desde `core.js`.  

---

mizu-coder/
│── index.html # UI principal
│── src/
│ ├── css/
│ │ └── core.css # Estilos globales
│ └── js/
│ ├── core.js # Gestor de módulos
│ ├── editor.js # Editor principal
│ ├── preview.js # Vista previa
│ ├── console.js # Consola
│ ├── tabs.js # Gestión de pestañas dinámicas
│ ├── module1.js # Ejemplo: logros
│ ├── module2.js # Ejemplo: participantes
│ ├── module3.js # Ejemplo: equipos
│ └── ... # Hasta module20.js

---

## 🛠️ Instalación y uso

1. Clona o descarga este repositorio.  
2. Abre `index.html` en tu navegador.  
3. Escribe tu código en las pestañas de **HTML, CSS y JS**.  
4. Activa o desactiva módulos desde `core.js`.  
5. Observa los resultados en la vista previa integrada.  

---

## 📌 Roadmap (Próximos pasos)

- [ ] Sistema de **pestañas dinámicas** para hasta 20 archivos JS.  
- [ ] Habilitar los modos **Mizu** y **Personalizado**.  
- [ ] Interfaz para **activar/desactivar módulos en vivo**.  
- [ ] Gestión avanzada de proyectos (exportación/importación completa).  
- [ ] Optimización para dispositivos móviles.  

---

## 👨‍💻 Contribuyentes

- **Mizu Legends Studios**

---

## 📜 Licencia

Este proyecto está licenciado bajo **AGPL 3.0**.  
Eres libre de usarlo, modificarlo y distribuirlo bajo los términos de dicha licencia.


## 📂 Estructura del proyecto

