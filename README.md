# 🎮 Mizu Esports Simulator

## 📜 Descripción
Mizu Esports Simulator es un juego de gestión de equipos de esports MOBA en versión arcade 🏆, donde los jugadores pueden crear su propio equipo, seleccionar jugadores y competir en una liga. Actualmente disponible para PC, SmartTV y Smartphone a través de una página web.

## ✨ Características Actuales (Versión Arcade)
- 🏷️ **Creación de equipos**: Personaliza el nombre y emoji de tu equipo
- 👥 **Gestión de jugadores**: Selecciona 5 jugadores titulares de un grupo de 10
- 📊 **Sistema de atributos**: Cada jugador tiene 6 atributos aleatorios (Visión, Reflejos, Comunicación, Tecnología, Trabajo en equipo, Estado de ánimo)
- 🎮 **Simulación de partidos**: Basada en el poder total de los equipos
- 🏆 **Liga regular**: Compite contra otros equipos en una temporada
- 🏅 **Bracket final**: Los 4 mejores equipos avanzan a un bracket de doble eliminación
- 📜 **Registro de eventos**: Sigue todas las acciones en tiempo real
- 📈 **Estadísticas detalladas**: Tabla de posiciones, historial de partidos y resultados
- 📚 **Wiki integrada**: Información sobre mecánicas del juego

## 🛠️ Tecnologías Utilizadas
- 🌐 HTML5
- 🎨 CSS3 con TailwindCSS
- ⚡ JavaScript (ES6+)
- 📊 Chart.js para gráficos de radar de atributos
- 📱 Diseño responsive para múltiples dispositivos

## 💻 Instalación y Ejecución
Como es una aplicación web, no requiere instalación. Solo necesitas:
1. Clonar el repositorio
2. Abrir el archivo `index.html` en un navegador web moderno
3. También puedes alojarlo en un servidor web estático (GitHub Pages, Netlify, Vercel, etc.)

## 🚀 Etapas de Desarrollo (Ordenadas por Complejidad)

### 📅 Fase 1: Fundamentos y Experiencia Básica del Usuario
**Objetivo**: Implementar funcionalidades esenciales para la persistencia de datos y la experiencia básica del usuario.

- 💾 **Guardado local**: Usar localStorage para guardar equipos, jugadores y progreso
- 🏆 **Sistema de logros**: Logros simples (ej: "Ganar 5 partidos seguidos", "Crear tu primer equipo")
- 🎨 **Mejoras en HTML/CSS** (Asignado a Deepseek):
  - Estructura semántica del HTML
  - Estilos responsivos con TailwindCSS
  - Diseño de interfaces para logros y guardado
- ⚡ **JavaScript básico** (Asignado a Mistral, Gemini, Deepseek, Qwen, Copilot, ChatGPT, Z, Kimi):
  - Lógica para guardar y cargar datos desde localStorage
  - Implementación de logros y notificaciones
  - Validación de datos y manejo de errores básicos

### 📅 Fase 2: Sistema de Economía Básico
**Objetivo**: Introducir mecánicas económicas simples para gestionar recursos.
- Presupuesto inicial para el equipo
- Costos básicos para contratar jugadores
- Sistema de recompensas por victorias

### 📅 Fase 3: Desarrollo de Jugadores
**Objetivo**: Profundizar en la personalización y progresión de los jugadores.
- Sistema de entrenamiento básico para mejorar atributos
- Estado de ánimo dinámico (afectado por victorias/derrotas)
- Edad y retiro automático de jugadores después de X temporadas

### 📅 Fase 4: Gestión de Personal
**Objetivo**: Añadir roles de apoyo que afecten el rendimiento del equipo.
- Contratación de entrenadores (mejoran atributos específicos)
- Psicólogos (mejoran el estado de ánimo)
- Sistema de química básica entre jugadores y personal

### 📅 Fase 5: Mejoras en la Simulación de Partidos
**Objetivo**: Hacer los partidos más estratégicos y realistas.
- Simulación táctica con opciones básicas (ej: "Enfoque defensivo", "Ataque agresivo")
- Sistema de picks/bans simplificado
- Eventos aleatorios durante los partidos (ej: "Lesión temporal")

### 📅 Fase 6: Ligas y Torneos Básicos
**Objetivo**: Expandir la competencia más allá de la liga regular.
- Torneos con premios en dinero o jugadores
- Sistema de ascenso/descenso entre divisiones
- Calendario estático con eventos especiales (ej: "Torneo de Navidad")

### 📅 Fase 7: Narrativa y Eventos Aleatorios
**Objetivo**: Añadir profundidad con eventos que afecten al equipo.
- Eventos aleatorios con consecuencias (ej: "Patrocinio inesperado", "Lesión de jugador estrella")
- Decisiones simples con impacto en el equipo (ej: "Aceptar patrocinio con condiciones")

### 📅 Fase 8: Interfaz Avanzada y Personalización
**Objetivo**: Mejorar la experiencia visual y la usabilidad.
- Gráficos mejorados para partidos (animaciones simples)
- Modo oscuro/claro
- Personalización de menús (colores, disposición)

### 📅 Fase 9: Multijugador Local
**Objetivo**: Permitir competencia entre jugadores en el mismo dispositivo.
- Mercado de transferencias entre equipos locales
- Ligas locales con hasta 4 jugadores

### 📅 Fase 10: Multijugador en Línea (Futuro)
**Objetivo**: Llevar el juego a un entorno en línea.
- Competencia en tiempo real contra otros jugadores
- Ligas globales y rankings
- Mercado de transferencias en línea

### 📅 Fase 11: Inspiración de Juegos de Referencia (Meta Final)
**Objetivo**: Alcanzar la profundidad de juegos como Moba GM y Esports Life Tycoon.
- Sistema de gestión profunda (infraestructura, patrocinios avanzados)
- Narrativa compleja con múltiples finales
- Simulación táctica detallada (intervención en tiempo real)

## 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar el juego:
1. Haz un fork del repositorio
2. Crea una rama para tu función (`git checkout -b feature/nueva-funcion`)
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva función'`)
4. Envía la rama (`git push origin feature/nueva-funcion`)
5. Crea un Pull Request

## 📄 Licencia
Este proyecto está bajo la Licencia AGPL 3.0. Mira el archivo [LICENSE](LICENSE) para más detalles.

## 📧 Contacto
Si tienes preguntas o sugerencias, no dudes en contactarnos:
- **✉️ Email**: [mizulegendsgg@gmail.com](mailto:mizulegendsgg@gmail.com)

---

*Mizu Esports Simulator está en **desarrollo activo** 🚀. Sigue nuestro progreso en las redes sociales para conocer las últimas novedades sobre la evolución a simulador.*
```
