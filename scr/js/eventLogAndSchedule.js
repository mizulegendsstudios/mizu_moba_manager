// eventLogAndSchedule.js
const EventLogAndSchedule = (function() {
    // Lista de eventos registrados
    let eventLog = [];

    // Calendario de partidos
    let schedule = [];

    // Agrega un evento al registro
    function addEvent(event) {
        eventLog.push(event);
    }

    // Agrega un partido al calendario
    function addMatch(match) {
        schedule.push(match);
    }

    // Obtiene el registro de eventos
    function getEventLog() {
        return eventLog;
    }

    // Obtiene el calendario de partidos
    function getSchedule() {
        return schedule;
    }

    return {
        addEvent,
        addMatch,
        getEventLog,
        getSchedule
    };
})();

export { EventLogAndSchedule };
