// Llamamos al modal del HTML, que será donde coloquemos todo lo relacionado al juego.
let modal = document.querySelector(".modal");

// Inicializamos 3 variables que necesitaremos para crear la interfaz de juego.
let canvas;
let c;
let timerId;

// Inicializamos 7 variables que tendremos que tener en cuenta para inicializar el juego.
let jugador1Score = (localStorage.getItem('jugador1Score')) || 0;
let jugador2Score = (localStorage.getItem('jugador2Score')) || 0;
let jugador1PersonajeElegido = null;
let jugador2PersonajeElegido = null;
let escenarioElegido;
let timer;
let resetFlag = false;
let sound = false;
const bgMusic = new Audio ('./assets/music/BGMusic/DecisiveBattle.wav');
bgMusic.volume = 0.05;



// Creamos las constantes correspondientes a la posición inicial de los jugadores, las teclas que utilizarán, el tiempo total de la partida y el tiempo para el reseteo.
const positionPlayer1 = {x:200, y:20};
const positionPlayer2 = {x:824, y:20};
const keysPlayer1 = {left : 'a', right : 'd', jump : 'w', down : 's', melee : 'n'};
const keysPlayer2 = {left : 'ArrowLeft', right : 'ArrowRight', jump : 'ArrowUp', down : 'ArrowDown', melee : '-'};
let matchTime = 30;
let restartTime = 0;

// Creamos las constantes que corresponderan a los bloques de colisión del piso, los bloques de colisión de las plataformas, al escenario y a los jugadores.
const floorCollisions = [];
const floorCollisionBlocks = [];
const platformCollisions = [];
const platformCollisionBlocks = [];
let player1;
let player2;
let background;

// Creamos el array que corresponde a los íconos para la selección de personajes.
let characterIcons = [`./assets/graphics/CharacterIcons/EvilWizardIcon.png`,`./assets/graphics/CharacterIcons/FantasyWarriorIcon.png`,`./assets/graphics/CharacterIcons/HuntressIcon.png`,`./assets/graphics/CharacterIcons/MedievalKingIcon.png`,`./assets/graphics/CharacterIcons/MedievalKing2Icon.png`,`./assets/graphics/CharacterIcons/MedievalWarriorIcon.png`];
let backgroundList = [`Bosque 1`,`StringStar Fields`,`Hills`,`Magic Cliffs`,`Fantasy Caves`];