// src/js/core.js
const firstNames = ["Juan", "Maria", "Pedro", "Ana", "Luis", "Sofía", "Carlos", "Laura", "Diego", "Paula", "David", "Lucía", "Alejandro", "Elena", "José", "Isabel", "Fernando", "Carla", "Miguel", "Andrea"];
const lastNames = ["García", "Rodríguez", "López", "Martínez", "Pérez", "González", "Sánchez", "Romero", "Díaz", "Torres", "Ramírez", "Flores", "Gómez", "Morales", "Ortiz", "Navarro", "Jiménez", "Ruiz", "Hernández", "Cruz"];
const nationalities = [
    "Argentina 🇦🇷", "Brasil 🇧🇷", "Canadá 🇨🇦", "Chile 🇨🇱", "Colombia 🇨🇴", "México 🇲🇽", "España 🇪🇸", "EE. UU. 🇺🇸", "Japón 🇯🇵", "Corea del Sur 🇰🇷",
    "Panamá 🇵🇦", "Costa Rica 🇨🇷", "Guatemala 🇬🇹", "Honduras 🇭🇳", "El Salvador 🇸🇻", "Nicaragua 🇳🇮"
];
const attributes = ["vision", "reflexes", "communication", "tecnologia", "teamwork", "mood"];
const teamNames = ["Los Dragones 🐉", "La Hermandad 🛡️", "Los Espectros 👻", "La Élite 👑", "Los Titanes ⛰️", "Las Sombras 🌑"];
const playerEmojis = ["🥷", "🧙‍♀️", "🏹", "🗡️", "🛡️", "🤖", "👹", "👽", "🦄", "🐼"];
let playerIdCounter = 1;
let userTeamIndex = 0;

// Estado del juego
let gameState = {
    teams: [],
    schedule: [],
    results: [],
    currentWeek: 0,
    season: 1,
    bracket: {
        phase: 'regular',
        pendingMatches: [],
        wbHistory: [],
        lbHistory: [],
        gfHistory: [],
        winner: null
    }
};
let tournamentStats = { first: 0, second: 0, third: 0, total: 0 };
let userTeamHistory = [];

// Referencias a los elementos del DOM
const nextStepBtn = document.getElementById('next-step-btn');
const newSeasonBtn = document.getElementById('new-season-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const gameLog = document.getElementById('game-log');
const leagueStandingsDiv = document.getElementById('league-standings');
const bracketTabBtn = document.getElementById('bracket-tab-btn');
const teamManagementDiv = document.getElementById('team-management-content');
const participantsContainer = document.getElementById('all-teams-container');
const teamNameInput = document.getElementById('team-name-input');
const teamEmojiInput = document.getElementById('team-emoji-input');
const updateTeamBtn = document.getElementById('update-team-btn');
const starterPlayersDiv = document.getElementById('starter-players');
const availablePlayersDiv = document.getElementById('available-players');
const starterCountSpan = document.getElementById('starter-count');
const matchResultsContainer = document.getElementById('match-results-container');
const currentWeekSpan = document.getElementById('current-week');
const tournamentTotalSpan = document.getElementById('tournaments-total');
const tournament1stSpan = document.getElementById('tournaments-1st');
const tournament2ndSpan = document.getElementById('tournaments-2nd');
const tournament3rdSpan = document.getElementById('tournaments-3rd');
const matchHistoryList = document.getElementById('match-history-list');
const notificationModal = document.getElementById('notification-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal-btn');
const wikiContentDiv = document.getElementById('wiki-content');

// Funciones de la lógica del juego
function createPlayer() {
    const player = {
        id: playerIdCounter++,
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        emoji: playerEmojis[Math.floor(Math.random() * playerEmojis.length)],
        nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
        attributes: {}
    };
    attributes.forEach(attr => {
        player.attributes[attr] = Math.floor(Math.random() * 100) + 1;
    });
    return player;
}

function generateTeamsAndPlayers() {
    for (let i = 0; i < teamNames.length; i++) {
        const teamName = teamNames[i];
        const teamKey = teamName.split(" ")[0] + teamName.split(" ")[1].replace(/\p{Emoji}/u, '');
        const team = {
            name: teamName,
            key: teamKey,
            players: [],
            starters: [],
            wins: 0,
            losses: 0,
            gamesWon: 0,
            gamesLost: 0,
            points: 0,
            emoji: teamName.split(" ").pop(),
            bracketLosses: 0,
            isUserTeam: i === userTeamIndex,
        };
        for (let j = 0; j < 10; j++) {
            team.players.push(createPlayer());
        }
        gameState.teams.push(team);
    }
}

function generateSchedule() {
    const numTeams = gameState.teams.length;
    const pairings = [];
    for (let i = 0; i < numTeams; i++) {
        for (let j = i + 1; j < numTeams; j++) {
            pairings.push([i, j]);
        }
    }
    gameState.schedule = pairings.sort(() => Math.random() - 0.5);
    
    const totalWeeks = (numTeams * (numTeams - 1)) / 2 / (numTeams / 2);
    const matchesPerWeek = numTeams / 2;
    const weeklySchedule = [];
    
    for (let w = 0; w < totalWeeks; w++) {
        weeklySchedule.push(gameState.schedule.splice(0, matchesPerWeek));
    }
    gameState.schedule = weeklySchedule;
}

function simulateGame(team1, team2) {
    const team1Power = team1.starters.reduce((sum, player) => {
        return sum + Object.values(player.attributes).reduce((s, val) => s + val, 0);
    }, 0);
    const team2Power = team2.starters.reduce((sum, player) => {
        return sum + Object.values(player.attributes).reduce((s, val) => s + val, 0);
    }, 0);
    
    let winner;
    const powerDiff = Math.abs(team1Power - team2Power);
    const weakerTeamChance = Math.max(0, 0.5 - (powerDiff / 500));
    if (team1Power > team2Power) {
        winner = (Math.random() < weakerTeamChance) ? team2.key : team1.key;
    } else {
        winner = (Math.random() < weakerTeamChance) ? team1.key : team2.key;
    }
    return winner;
}

function simulateMatch(team1, team2, isBracket = false) {
    if (!team1 || !team2) {
        return null;
    }
    
    if (!team1.isUserTeam && team1.starters.length === 0) {
        team1.starters = team1.players.sort(() => 0.5 - Math.random()).slice(0, 5);
    }
    if (!team2.isUserTeam && team2.starters.length === 0) {
        team2.starters = team2.players.sort(() => 0.5 - Math.random()).slice(0, 5);
    }
    let gamesWon1 = 0;
    let gamesWon2 = 0;
    let winnerKey = null;
    let loserKey = null;
    for(let i = 0; i < 3; i++) {
        if (gamesWon1 === 2 || gamesWon2 === 2) {
            break;
        }
        const gameWinnerKey = simulateGame(team1, team2);
        if (gameWinnerKey === team1.key) {
            gamesWon1++;
        } else {
            gamesWon2++;
        }
    }
    
    if (gamesWon1 > gamesWon2) {
        winnerKey = team1.key;
        loserKey = team2.key;
    } else {
        winnerKey = team2.key;
        loserKey = team1.key;
    }
    
    if (team1.isUserTeam || team2.isUserTeam) {
        const userTeam = gameState.teams.find(t => t.isUserTeam);
        userTeamHistory.push({
            opponent: winnerKey === userTeam.key ? team2.name : team1.name,
            result: winnerKey === userTeam.key ? "Victoria" : "Derrota",
            gameScore: `${gamesWon1}-${gamesWon2}`,
            round: isBracket ? `T${gameState.season}-${gameState.bracket.phase}` : `T${gameState.season}-Jornada ${gameState.currentWeek + 1}`
        });
    }
    return { winnerKey, loserKey, gamesWon1, gamesWon2 };
}

function startNewSeason() {
    gameState.season++;
    gameState.currentWeek = 0;
    gameState.schedule = [];
    gameState.results = [];
    gameState.bracket.phase = 'regular';
    gameState.bracket.pendingMatches = [];
    gameState.bracket.wbHistory = [];
    gameState.bracket.lbHistory = [];
    gameState.bracket.gfHistory = [];
    gameState.bracket.winner = null;
    
    gameState.teams.forEach(team => {
        team.wins = 0;
        team.losses = 0;
        team.gamesWon = 0;
        team.gamesLost = 0;
        team.points = 0;
        team.bracketLosses = 0;
    });
    
    tournamentStats.total++;
    
    generateSchedule();
}

// Funciones de la UI
function renderPlayerCard(player, isStarter) {
    const card = document.createElement('div');
    card.className = `player-card p-4 bg-[#23262d] rounded-xl border border-[#30363d] cursor-pointer hover:bg-[#2c323b] transition-colors duration-200 flex-shrink-0 relative`;
    card.dataset.id = player.id;
    card.innerHTML = `
        <div class="player-card-content">
            <div>
                <span class="absolute top-2 right-2 text-xl">${player.emoji}</span>
                <h4 class="font-bold text-lg mb-1 text-white">${player.name}</h4>
                <p class="text-xs text-gray-400">${player.nationality}</p>
                <ul class="text-xs mt-2 space-y-1 text-gray-300">
                    <li>👁️ Visión: ${player.attributes.vision}</li>
                    <li>⚡ Reflejos: ${player.attributes.reflexes}</li>
                    <li>💬 Comunicación: ${player.attributes.communication}</li>
                    <li>💻 Tecnología: ${player.attributes.tecnologia}</li>
                    <li>🤝 Trabajo en equipo: ${player.attributes.teamwork}</li>
                    <li>🧘 Estado de ánimo: ${player.attributes.mood}</li>
                </ul>
            </div>
            <div class="mt-4 flex justify-between items-center text-xs text-gray-400">
                <span>${isStarter ? 'Titular' : 'Suplente'}</span>
                <button class="player-toggle-btn px-2 py-1 rounded-full text-white font-semibold text-xs ${isStarter ? 'bg-red-600' : 'bg-green-600'}">
                    ${isStarter ? 'Quitar' : 'Añadir'}
                </button>
            </div>
        </div>
    `;
    return card;
}

function renderUI() {
    const userTeam = gameState.teams.find(t => t.isUserTeam);
    const teams = gameState.teams;

    // Renderizar la tabla de la liga
    const sortedTeams = [...teams].sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        return b.gamesWon - a.gamesWon;
    });

    leagueStandingsDiv.innerHTML = `
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-[#23262d]">
                    <th class="p-4 rounded-tl-lg">#</th>
                    <th>Equipo</th>
                    <th>G</th>
                    <th>P</th>
                    <th>Juegos G</th>
                    <th class="rounded-tr-lg">Juegos P</th>
                </tr>
            </thead>
            <tbody>
                ${sortedTeams.map((team, index) => `
                    <tr class="${team.isUserTeam ? 'bg-[#30363d] text-white font-bold' : ''} hover:bg-[#2c323b]">
                        <td class="p-4">${index + 1}</td>
                        <td>${team.emoji} ${team.name}</td>
                        <td>${team.wins}</td>
                        <td>${team.losses}</td>
                        <td>${team.gamesWon}</td>
                        <td>${team.gamesLost}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Renderizar la gestión del equipo
    if (userTeam) {
        teamNameInput.value = userTeam.name;
        teamEmojiInput.value = userTeam.emoji;

        starterPlayersDiv.innerHTML = userTeam.starters.map(player => renderPlayerCard(player, true).outerHTML).join('');
        availablePlayersDiv.innerHTML = userTeam.players.filter(player => !userTeam.starters.includes(player)).map(player => renderPlayerCard(player, false).outerHTML).join('');
        starterCountSpan.textContent = `${userTeam.starters.length}/5`;
    }

    // Renderizar la lista de todos los equipos
    participantsContainer.innerHTML = teams.map(team => `
        <div class="bg-[#23262d] p-4 rounded-xl border border-[#30363d]">
            <h3 class="font-bold text-lg mb-2">${team.emoji} ${team.name}</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                ${team.players.map(player => renderPlayerCard(player, false).outerHTML).join('')}
            </div>
        </div>
    `).join('');

    // Renderizar el historial de partidos del equipo de usuario
    matchHistoryList.innerHTML = userTeamHistory.map(match => `
        <li class="flex items-center space-x-2">
            <span class="text-xs text-gray-400">[${match.round}]</span>
            <span class="font-semibold ${match.result === 'Victoria' ? 'text-[#22c55e]' : 'text-[#ef4444]'}">${match.result}</span>
            <span class="text-sm">vs ${match.opponent} (${match.gameScore})</span>
        </li>
    `).join('');

    // Renderizar el historial de torneos
    tournamentTotalSpan.textContent = tournamentStats.total;
    tournament1stSpan.textContent = tournamentStats.first;
    tournament2ndSpan.textContent = tournamentStats.second;
    tournament3rdSpan.textContent = tournamentStats.third;

    // Renderizar el calendario de partidos de la jornada actual
    if (gameState.currentWeek < gameState.schedule.length) {
        currentWeekSpan.textContent = gameState.currentWeek + 1;
        const weekMatches = gameState.schedule[gameState.currentWeek];
        const htmlMatches = weekMatches.map(match => {
            const team1 = gameState.teams[match[0]];
            const team2 = gameState.teams[match[1]];
            return `
                <div class="bg-[#2e343d] p-4 rounded-lg flex justify-between items-center border border-[#30363d]">
                    <span class="text-sm md:text-base">${team1.emoji} ${team1.name}</span>
                    <span class="font-bold">vs</span>
                    <span class="text-sm md:text-base">${team2.emoji} ${team2.name}</span>
                </div>
            `;
        }).join('');
        matchResultsContainer.innerHTML = htmlMatches;
    } else {
        currentWeekSpan.textContent = gameState.schedule.length;
        matchResultsContainer.innerHTML = `<p class="text-center text-lg text-gray-400">La temporada regular ha terminado.</p>`;
    }
    
    // Renderizar el bracket
    if (gameState.bracket.phase !== 'regular') {
        bracketTabBtn.classList.remove('hidden');
    } else {
        bracketTabBtn.classList.add('hidden');
    }
    
    // Renderizar el contenido de la wiki
    const wiki = `
        <h3 class="font-bold text-white mb-2">Cómo se determinan las victorias</h3>
        <p>En cada partida, el juego calcula un "Poder Total" para tu equipo y para el equipo rival. El equipo con el mayor poder total es el ganador.</p>
        
        <h3 class="font-bold text-white mt-4 mb-2">Impacto de los Atributos</h3>
        <p>Cada jugador de tu **alineación titular** (los 5 que has seleccionado) contribuye al Poder Total del equipo. Todos los atributos de los jugadores se suman por igual para generar su poder individual, y la suma de los poderes de los 5 jugadores es el poder base del equipo. Por lo tanto, cada atributo es igualmente importante y un jugador con puntuaciones más altas en general hará que tu equipo sea más fuerte.</p>
        <ul class="list-disc list-inside space-y-2 mt-4">
            <li><strong>Visión:</strong> La habilidad del jugador para ver el mapa y anticipar los movimientos del enemigo.</li>
            <li><strong>Reflejos:</strong> La rapidez de reacción del jugador en situaciones de combate.</li>
            <li><strong>Comunicación:</strong> La efectividad del jugador para coordinar con sus compañeros.</li>
            <li><strong>Tecnología:</strong> La calidad de su equipamiento y conexión a internet.</li>
            <li><strong>Trabajo en equipo:</strong> La capacidad de un jugador para colaborar y sincronizarse con su equipo.</li>
            <li><strong>Estado de ánimo:</strong> El nivel de concentración y motivación mental del jugador.</li>
        </ul>
        
        <h3 class="font-bold text-white mt-4 mb-2">El Factor de Aleatoriedad</h3>
        <p>Para hacer las partidas más impredecibles y realistas, el juego añade un factor aleatorio al resultado final. Sin embargo, este factor está controlado: la probabilidad de que el equipo con menos poder gane disminuye a medida que la diferencia de poder entre los equipos aumenta. Esto asegura que los equipos más fuertes siempre tengan una ventaja clara, pero deja espacio para sorpresas en partidas reñidas.</p>
    `;
    wikiContentDiv.innerHTML = wiki;

}

// Funciones de la UI
function showModal(title, content) {
    modalTitle.textContent = title;
    modalContent.textContent = content;
    notificationModal.classList.remove('hidden');
}

function closeModal() {
    notificationModal.classList.add('hidden');
}

function addSocialPost(type, message, emoji) {
    const gameLog = document.getElementById('game-log');
    const post = document.createElement('div');
    post.className = `social-post`;
    post.innerHTML = `<span class="text-sm font-semibold text-gray-400 mb-1 block">${emoji} ${type.toUpperCase()}</span><p class="text-sm">${message}</p>`;
    gameLog.prepend(post);
}

// Configuración de los eventos
function setupEventListeners() {
    nextStepBtn.addEventListener('click', () => {
        const userTeam = gameState.teams.find(t => t.isUserTeam);
        if (gameState.bracket.winner) {
            showModal("¡Fin de Temporada!", "La temporada ha terminado. Puedes empezar una nueva temporada si lo deseas.");
            return;
        }
        if (gameState.bracket.phase === 'regular') {
            if (userTeam.starters.length !== 5) {
                addSocialPost("alert", "¡Atención! Debes seleccionar 5 jugadores titulares para tu equipo antes de simular.", "⚠️");
                return;
            }
        }
        
        // Lógica de simulación
        const weekMatches = gameState.schedule[gameState.currentWeek];
        addSocialPost("league", `--- Comienza la Jornada ${gameState.currentWeek + 1} ---`, "📢");
        
        weekMatches.forEach(match => {
            const team1 = gameState.teams[match[0]];
            const team2 = gameState.teams[match[1]];
            const { winnerKey, loserKey, gamesWon1, gamesWon2 } = simulateMatch(team1, team2);
            const winnerTeam = gameState.teams.find(t => t.key === winnerKey);
            const loserTeam = gameState.teams.find(t => t.key === loserKey);
            
            let winnerGamesWon, loserGamesWon;
            if (team1.key === winnerKey) {
                winnerGamesWon = gamesWon1;
                loserGamesWon = gamesWon2;
            } else {
                winnerGamesWon = gamesWon2;
                loserGamesWon = gamesWon1;
            }
            if(winnerTeam) {
                 winnerTeam.wins++;
                 winnerTeam.gamesWon += winnerGamesWon;
                 winnerTeam.gamesLost += loserGamesWon;
            }
            if(loserTeam) {
                loserTeam.losses++;
                loserTeam.gamesWon += loserGamesWon;
                loserTeam.gamesLost += winnerGamesWon;
            }
            const result = {
                week: gameState.currentWeek + 1,
                team1: team1.name,
                team2: team2.name,
                winner: winnerTeam.name,
                score: `${winnerGamesWon}-${loserGamesWon}`
            };
            gameState.results.push(result);
            addSocialPost("match", `${winnerTeam.emoji} ${winnerTeam.name} (${result.score}) vence a ${loserTeam.emoji} ${loserTeam.name} en la Jornada ${gameState.currentWeek + 1}!`, "✅");
        });
        
        gameState.currentWeek++;
        renderUI();
        
    });
    
    newSeasonBtn.addEventListener('click', () => {
        showModal("Iniciar Nueva Temporada", "¿Estás seguro de que quieres iniciar una nueva temporada? Se reiniciarán las estadísticas de la liga, pero tu equipo y las estadísticas de torneos se mantendrán.");
        closeModalBtn.addEventListener('click', () => {
            closeModal();
            startNewSeason();
            renderUI();
        }, { once: true });
    });
    
    closeModalBtn.addEventListener('click', closeModal);
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.dataset.tabTarget;
            document.querySelectorAll('.content-tab').forEach(tab => tab.classList.add('hidden'));
            document.getElementById(targetId).classList.remove('hidden');
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    updateTeamBtn.addEventListener('click', () => {
        const userTeam = gameState.teams.find(t => t.isUserTeam);
        const newName = teamNameInput.value.trim();
        const newEmoji = teamEmojiInput.value.trim();
        if (newName !== '') {
            userTeam.name = newName;
        }
        if (newEmoji !== '') {
            userTeam.emoji = newEmoji;
        }
        renderUI();
        addSocialPost("update", `Tu equipo ha sido renombrado a ${userTeam.emoji} ${userTeam.name}`, "📝");
    });

    starterPlayersDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('player-toggle-btn')) {
            const playerCard = e.target.closest('.player-card');
            const playerId = parseInt(playerCard.dataset.id);
            const userTeam = gameState.teams.find(t => t.isUserTeam);
            userTeam.starters = userTeam.starters.filter(p => p.id !== playerId);
            renderUI();
        }
    });
    
    availablePlayersDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('player-toggle-btn')) {
            const playerCard = e.target.closest('.player-card');
            const playerId = parseInt(playerCard.dataset.id);
            const userTeam = gameState.teams.find(t => t.isUserTeam);
            const playerToAdd = userTeam.players.find(p => p.id === playerId);
            if (userTeam.starters.length < 5) {
                userTeam.starters.push(playerToAdd);
                renderUI();
            } else {
                addSocialPost("alert", "No puedes tener más de 5 jugadores titulares.", "⚠️");
            }
        }
    });
}

function initGame() {
    generateTeamsAndPlayers();
    generateSchedule();
    const userTeam = gameState.teams.find(t => t.isUserTeam);
    if (userTeam && userTeam.starters.length === 0) {
        userTeam.starters = userTeam.players.slice(0, 5);
    }
    renderUI();
    setupEventListeners();
}

window.onload = initGame;
