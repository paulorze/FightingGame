// Llamamos al modal del HTML, que será donde coloquemos todo lo relacionado al juego
let modal = document.querySelector(".modal");

// Inicializamos 3 variables que necesitaremos para crear la interfaz de juego
let canvas;
let c;
let timerId;

// Inicializamos 4 variables que tendremos que tener en cuenta para inicializar el juego
let jugador1PersonajeElegido;
let jugador2PersonajeElegido;
let escenarioElegido;
let timer;

// Con la función elegirPersonajes, creamos la interfaz para que los jugadores elijan los personajes y el lugar de la batalla

let elegirPersonajes = ()=> {
    let container = document.createElement("div");
    container.setAttribute("class","selectorContainer");
    let elijanPersonajes = document.createElement("h1");
    elijanPersonajes.setAttribute("class","tituloJuego");
    elijanPersonajes.innerHTML = `Elijan sus personajes`;
    let contenedorJugadores = document.createElement("div");
    contenedorJugadores.setAttribute("class","contenedorJugadores");
    // Creamos los elementos para que elija el personaje el Jugador 1 y los eventListeners correspondientes.
    let jugador1 = document.createElement("div");
    jugador1.setAttribute("class","jugadorContainer");
    let nombreJugador1 = document.createElement("h2");
    nombreJugador1.setAttribute("class","nombreJugador");
    nombreJugador1.innerHTML = `Jugador 1`;
    let personajesJugador1 = document.createElement("div");
    personajesJugador1.setAttribute("class","personajesContainer");
    let personaje1Jugador1 = document.createElement("div");
    personaje1Jugador1.setAttribute("class","personaje");
    personaje1Jugador1.setAttribute("data-value","1");
    personaje1Jugador1.setAttribute("data-player","player1");
    personaje1Jugador1.addEventListener("click",()=> {
        if (!personaje1Jugador1.classList.contains("disabled")) {
            jugador1PersonajeElegido = 1;
            modifyButton(personaje1Jugador1,"player1");
        };
    });
    let imagenpersonaje1Jugador1 = document.createElement("img");
    imagenpersonaje1Jugador1.src = `./assets/graphics/CharacterIcons/EvilWizardIcon.png`;
    personaje1Jugador1.appendChild(imagenpersonaje1Jugador1);
    let personaje2Jugador1 = document.createElement("div");
    personaje2Jugador1.setAttribute("class","personaje");
    personaje2Jugador1.setAttribute("data-value","2");
    personaje2Jugador1.setAttribute("data-player","player1");
    personaje2Jugador1.addEventListener("click",()=> {
        if (!personaje2Jugador1.classList.contains("disabled")) {
            jugador1PersonajeElegido = 2;
            modifyButton(personaje2Jugador1,"player1");
        };
    });
    let imagenpersonaje2Jugador1 = document.createElement("img");
    imagenpersonaje2Jugador1.src = `./assets/graphics/CharacterIcons/FantasyWarriorIcon.png`;
    personaje2Jugador1.appendChild(imagenpersonaje2Jugador1);
    let personaje3Jugador1 = document.createElement("div");
    personaje3Jugador1.setAttribute("class","personaje");
    personaje3Jugador1.setAttribute("data-value","3");
    personaje3Jugador1.setAttribute("data-player","player1");
    personaje3Jugador1.addEventListener("click",()=> {
        if (!personaje3Jugador1.classList.contains("disabled")) {
            jugador1PersonajeElegido = 3;
            modifyButton(personaje3Jugador1,"player1");
        };
    });
    let imagenpersonaje3Jugador1 = document.createElement("img");
    imagenpersonaje3Jugador1.src = `./assets/graphics/CharacterIcons/HuntressIcon.png`;
    personaje3Jugador1.appendChild(imagenpersonaje3Jugador1);
    let personaje4Jugador1 = document.createElement("div");
    personaje4Jugador1.setAttribute("class","personaje");
    personaje4Jugador1.setAttribute("data-value","4");
    personaje4Jugador1.setAttribute("data-player","player1");
    personaje4Jugador1.addEventListener("click",()=> {
        if (!personaje4Jugador1.classList.contains("disabled")) {
            jugador1PersonajeElegido = 4;
            modifyButton(personaje4Jugador1,"player1");
        };
    });
    let imagenpersonaje4Jugador1 = document.createElement("img");
    imagenpersonaje4Jugador1.src = `./assets/graphics/CharacterIcons/MedievalKingIcon.png`;
    personaje4Jugador1.appendChild(imagenpersonaje4Jugador1);
    let personaje5Jugador1 = document.createElement("div");
    personaje5Jugador1.setAttribute("class","personaje");
    personaje5Jugador1.setAttribute("data-value","5");
    personaje5Jugador1.setAttribute("data-player","player1");
    personaje5Jugador1.addEventListener("click",()=> {
        if (!personaje5Jugador1.classList.contains("disabled")) {
            jugador1PersonajeElegido = 5;
            modifyButton(personaje5Jugador1,"player1");
        };
    });
    let imagenpersonaje5Jugador1 = document.createElement("img");
    imagenpersonaje5Jugador1.src = `./assets/graphics/CharacterIcons/MedievalKing2Icon.png`;
    personaje5Jugador1.appendChild(imagenpersonaje5Jugador1);
    let personaje6Jugador1 = document.createElement("div");
    personaje6Jugador1.setAttribute("class","personaje");
    personaje6Jugador1.setAttribute("data-value","6");
    personaje6Jugador1.setAttribute("data-player","player1");
    personaje6Jugador1.addEventListener("click",()=> {
        if (!personaje6Jugador1.classList.contains("disabled")) {
            jugador1PersonajeElegido = 6;
            modifyButton(personaje6Jugador1,"player1");
        };
    });
    let imagenpersonaje6Jugador1 = document.createElement("img");
    imagenpersonaje6Jugador1.src = `./assets/graphics/CharacterIcons/MedievalWarriorIcon.png`;
    // Agregamos todo al contenedor correspondiente
    personaje6Jugador1.appendChild(imagenpersonaje6Jugador1);
    personajesJugador1.appendChild(personaje1Jugador1);
    personajesJugador1.appendChild(personaje2Jugador1);
    personajesJugador1.appendChild(personaje3Jugador1);
    personajesJugador1.appendChild(personaje4Jugador1);
    personajesJugador1.appendChild(personaje5Jugador1);
    personajesJugador1.appendChild(personaje6Jugador1);
    jugador1.appendChild(nombreJugador1);
    jugador1.appendChild(personajesJugador1);
    // Creamos los elementos para que elija el personaje el Jugador 2 y los eventListeners correspondientes.
    let jugador2 = document.createElement("div");
    jugador2.setAttribute("class","jugadorContainer");
    let nombreJugador2 = document.createElement("h2");
    nombreJugador2.setAttribute("class","nombreJugador");
    nombreJugador2.innerHTML = `Jugador 2`;
    let personajesJugador2 = document.createElement("div");
    personajesJugador2.setAttribute("class","personajesContainer");
    let personaje1Jugador2 = document.createElement("div");
    personaje1Jugador2.setAttribute("class","personaje");
    personaje1Jugador2.setAttribute("data-value","1");
    personaje1Jugador2.setAttribute("data-player","player2");
    personaje1Jugador2.addEventListener("click",()=> {
        if (!personaje1Jugador2.classList.contains("disabled")) {
            jugador2PersonajeElegido = 1;
            modifyButton(personaje1Jugador2,"player2");
        };
    });
    let imagenpersonaje1Jugador2 = document.createElement("img");
    imagenpersonaje1Jugador2.src = `./assets/graphics/CharacterIcons/EvilWizardIcon.png`;
    personaje1Jugador2.appendChild(imagenpersonaje1Jugador2);
    let personaje2Jugador2 = document.createElement("div");
    personaje2Jugador2.setAttribute("class","personaje");
    personaje2Jugador2.setAttribute("data-value","2");
    personaje2Jugador2.setAttribute("data-player","player2");
    personaje2Jugador2.addEventListener("click",()=> {
        if (!personaje2Jugador2.classList.contains("disabled")) {
            jugador2PersonajeElegido = 2;
            modifyButton(personaje2Jugador2,"player2");
        };
    });
    let imagenpersonaje2Jugador2 = document.createElement("img");
    imagenpersonaje2Jugador2.src = `./assets/graphics/CharacterIcons/FantasyWarriorIcon.png`;
    personaje2Jugador2.appendChild(imagenpersonaje2Jugador2);
    let personaje3Jugador2 = document.createElement("div");
    personaje3Jugador2.setAttribute("class","personaje");
    personaje3Jugador2.setAttribute("data-value","3");
    personaje3Jugador2.setAttribute("data-player","player2");
    personaje3Jugador2.addEventListener("click",()=> {
        if (!personaje3Jugador2.classList.contains("disabled")) {
            jugador2PersonajeElegido = 3;
            modifyButton(personaje3Jugador2,"player2");
        };
    });
    let imagenpersonaje3Jugador2 = document.createElement("img");
    imagenpersonaje3Jugador2.src = `./assets/graphics/CharacterIcons/HuntressIcon.png`;
    personaje3Jugador2.appendChild(imagenpersonaje3Jugador2);
    let personaje4Jugador2 = document.createElement("div");
    personaje4Jugador2.setAttribute("class","personaje");
    personaje4Jugador2.setAttribute("data-value","4");
    personaje4Jugador2.setAttribute("data-player","player2");
    personaje4Jugador2.addEventListener("click",()=> {
        if (!personaje4Jugador2.classList.contains("disabled")) {
            jugador2PersonajeElegido = 4;
            modifyButton(personaje4Jugador2,"player2");
        };
    });
    let imagenpersonaje4Jugador2 = document.createElement("img");
    imagenpersonaje4Jugador2.src = `./assets/graphics/CharacterIcons/MedievalKingIcon.png`;
    personaje4Jugador2.appendChild(imagenpersonaje4Jugador2);
    let personaje5Jugador2 = document.createElement("div");
    personaje5Jugador2.setAttribute("class","personaje");
    personaje5Jugador2.setAttribute("data-value","5");
    personaje5Jugador2.setAttribute("data-player","player2");
    personaje5Jugador2.addEventListener("click",()=> {
        if (!personaje5Jugador2.classList.contains("disabled")) {
            jugador2PersonajeElegido = 5;
            modifyButton(personaje5Jugador2,"player2");
        };
    });
    let imagenpersonaje5Jugador2 = document.createElement("img");
    imagenpersonaje5Jugador2.src = `./assets/graphics/CharacterIcons/MedievalKing2Icon.png`;
    personaje5Jugador2.appendChild(imagenpersonaje5Jugador2);
    let personaje6Jugador2 = document.createElement("div");
    personaje6Jugador2.setAttribute("class","personaje");
    personaje6Jugador2.setAttribute("data-value","6");
    personaje6Jugador2.setAttribute("data-player","player2");
    personaje6Jugador2.addEventListener("click",()=> {
        if (!personaje6Jugador2.classList.contains("disabled")) {
            jugador2PersonajeElegido = 6;
            modifyButton(personaje6Jugador2,"player2");
        };
    });
    let imagenpersonaje6Jugador2 = document.createElement("img");
    imagenpersonaje6Jugador2.src = `./assets/graphics/CharacterIcons/MedievalWarriorIcon.png`;
    personaje6Jugador2.appendChild(imagenpersonaje6Jugador2);
    // Agregamos todo al contenedor correspondiente
    personajesJugador2.appendChild(personaje1Jugador2);
    personajesJugador2.appendChild(personaje2Jugador2);
    personajesJugador2.appendChild(personaje3Jugador2);
    personajesJugador2.appendChild(personaje4Jugador2);
    personajesJugador2.appendChild(personaje5Jugador2);
    personajesJugador2.appendChild(personaje6Jugador2);
    jugador2.appendChild(nombreJugador2);
    jugador2.appendChild(personajesJugador2);
    // Agregamos ambos jugadores al contenedorJugadores
    contenedorJugadores.appendChild(jugador1);
    contenedorJugadores.appendChild(jugador2);
    // Creamos los elementos para que elijan el escenario y los eventListeners correspondientes.
    let elijanEscenario = document.createElement("h1");
    elijanEscenario.setAttribute("class","tituloJuego");
    elijanEscenario.innerHTML = `Elijan el Campo de Batalla`;
    let escenarioContainer = document.createElement("div");
    escenarioContainer.setAttribute("class","escenarioContainer");
    let escenarioSelect = document.createElement("select");
    escenarioSelect.setAttribute("class","escenarioSelect");
    let escenario1 = document.createElement("option");
    escenario1.setAttribute("class","escenarioOpcion");
    escenario1.setAttribute("value",1);
    escenario1.innerHTML = `Bosque 1`;
    let escenario2 = document.createElement("option");
    escenario2.setAttribute("class","escenarioOpcion");
    escenario2.setAttribute("value",2);
    escenario2.innerHTML = `StringStar Fields`;
    let escenario3 = document.createElement("option");
    escenario3.setAttribute("class","escenarioOpcion");
    escenario3.setAttribute("value",3);
    escenario3.innerHTML = `Hills`;
    let escenario4 = document.createElement("option");
    escenario4.setAttribute("class","escenarioOpcion");
    escenario4.setAttribute("value",4);
    escenario4.innerHTML = `Magic Cliffs`;
    let escenario5 = document.createElement("option");
    escenario5.setAttribute("class","escenarioOpcion");
    escenario5.setAttribute("value",5);
    escenario5.innerHTML = `Fantasy Caves`;
    escenarioSelect.appendChild(escenario1);
    escenarioSelect.appendChild(escenario2);
    escenarioSelect.appendChild(escenario3);
    escenarioSelect.appendChild(escenario4);
    escenarioSelect.appendChild(escenario5);
    escenarioContainer.appendChild(escenarioSelect);
    // Creamos el botón de submit y le damos la función de limpiar el modal, colocarle la interfaz de juego e inicializar el juego
    let submit = document.createElement ("button");
    submit.setAttribute("class","submit");
    let span = document.createElement("span");
    span.innerHTML = "Comenzar Partida"
    submit.appendChild(span);
    submit.addEventListener("click",()=> {
        escenarioElegido = parseInt(escenarioSelect.options[escenarioSelect.selectedIndex].value);
        if (jugador1PersonajeElegido == jugador2PersonajeElegido) {
            alert(`Por favor, elijan un personaje diferente cada uno.`);
        } else {
            modal.innerHTML = ``;
            modal.appendChild(interfazJuego());
            canvas = document.querySelector(`.canvas`);
            c = canvas.getContext(`2d`);
            timer = document.querySelector(`.timer`);
            initializeGame(jugador1PersonajeElegido,jugador2PersonajeElegido,escenarioElegido);
        }
    })
    // Agregamos todo al contenedor y lo retornamos
    container.appendChild(elijanPersonajes);
    container.appendChild(contenedorJugadores);
    container.appendChild(elijanEscenario);
    container.appendChild(escenarioContainer);
    container.appendChild(submit);
    return container;
};

// Con la función interfazJuego, lo que hacemos es crear todos los elementos visibles del juego.
let interfazJuego = ()=> {
    let container = document.createElement("div"); //Esta variable crea el contenedor que tendrá adentro todos los demás elementos creados y que la función devolverá.
    container.setAttribute("class","gameContainer");
    let display = document.createElement("div"); //Esta variable crea el contenedor que tendrá adentro la vida de ambos jugadores y el timer.
    display.setAttribute("class","displayVida");
    let player1 = document.createElement("div"); //Esta variable crea el contenedor de la barra de vida actual y la barra de vida total para el Jugador 1.
    player1.setAttribute("class","player1");
    let player1Total = document.createElement("div");
    player1Total.setAttribute("class","player1Total");
    let player1Parcial = document.createElement("div");
    player1Parcial.setAttribute("class","player1Partial");
    player1.appendChild(player1Total);
    player1.appendChild(player1Parcial);
    let timer = document.createElement("div"); //Esta variable crea el contenedor del timer.
    timer.setAttribute("class","timer");
    let player2 = document.createElement("div");
    player2.setAttribute("class","player2"); //Esta variable crea el contenedor de la barra de vida actual y la barra de vida total para el Jugador 2.
    let player2Total = document.createElement("div");
    player2Total.setAttribute("class","player2Total");
    let player2Parcial = document.createElement("div");
    player2Parcial.setAttribute("class","player2Partial");
    player2.appendChild(player2Total);
    player2.appendChild(player2Parcial);
    display.appendChild(player1);
    display.appendChild(timer);
    display.appendChild(player2);
    let displayResultado = document.createElement("div"); //Esta variable crea el cartel que declarará el resultado.
    displayResultado.setAttribute("class","displayResultado");
    let canvas = document.createElement("canvas");
    canvas.setAttribute("class","canvas");
    canvas.setAttribute("width","1024px");
    canvas.setAttribute("height","576px");
    container.appendChild(display);
    container.appendChild(displayResultado);
    container.appendChild(canvas);
    return container;
};

modal.appendChild(elegirPersonajes());

