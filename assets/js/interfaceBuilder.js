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
    nombreJugador1.innerHTML = `Jugador 1: ${jugador1Score}`;
    let personajesJugador1 = createCharacterSelect("player1",1);
    jugador1.appendChild(nombreJugador1);
    jugador1.appendChild(personajesJugador1);
    // Creamos los elementos para que elija el personaje el Jugador 2 y los eventListeners correspondientes.
    let jugador2 = document.createElement("div");
    jugador2.setAttribute("class","jugadorContainer");
    let nombreJugador2 = document.createElement("h2");
    nombreJugador2.setAttribute("class","nombreJugador");
    nombreJugador2.innerHTML = `Jugador 2: ${jugador2Score}`;
    let personajesJugador2 = createCharacterSelect("player2",2);
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
    let escenarioSelect = createBackgroundSelect();
    escenarioContainer.appendChild(escenarioSelect);
    // Creamos el botón de submit y le damos la función de limpiar el modal, colocarle la interfaz de juego e inicializar el juego
    let submit = document.createElement ("button");
    submit.setAttribute("class","submit");
    let span = document.createElement("span"); //Esto lo puse para adecuarme al diseño del botón que elegí.
    span.innerHTML = "Comenzar Partida"
    submit.appendChild(span);
    submit.addEventListener("click",()=> {
        escenarioElegido = parseInt(escenarioSelect.options[escenarioSelect.selectedIndex].value);
        if (jugador1PersonajeElegido == jugador2PersonajeElegido || jugador1PersonajeElegido == undefined || jugador2PersonajeElegido == undefined) {
            Swal.fire({
                position: 'top',
                icon: "warning",
                width: '50rem',
                html: '<p style="font-family: \'Press Start 2P\', cursive; font-size: 2rem; color: #fff"><b>Por favor, elijan un personaje diferente cada uno.</b></p>',
                background: '#3b3d40'
            });
        } else {
            modal.innerHTML = ``;
            modal.appendChild(interfazJuego());
            canvas = document.querySelector(`.canvas`);
            c = canvas.getContext(`2d`);
            timer = document.querySelector(`.timer`);
            let timerInterval
            Swal.fire({
                width: '70rem',
                html: '<p style="font-family: \'Press Start 2P\', cursive; font-size: 2rem; color: #fff"><strong>¡La partida está por comenzar en: <b></b>!</strong></p>',
                background: '#3b3d40',
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    loader: 'custom-loader',
                },
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    let contenido = 3;
                    timerInterval = setInterval(() => {
                    b.textContent = contenido;
                    contenido --;
                    }, 1000);
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                }
            })
            initializeGame(jugador1PersonajeElegido,jugador2PersonajeElegido,escenarioElegido);
        };
    });
    let reset = document.createElement("button");
    reset.setAttribute("class","submit reset");
    let span2 = document.createElement("span");
    span2.innerHTML = "Reset Score"
    reset.appendChild(span2);
    reset.addEventListener("click",()=> {
        localStorage.clear();
        jugador1Score = 0;
        jugador2Score = 0;
        nombreJugador1.innerHTML = `Jugador 1: 0`;
        nombreJugador2.innerHTML = `Jugador 2: 0`;
    });
    let muteButton = document.createElement('img');
    muteButton.setAttribute('class', 'muteButton');
    muteButton.setAttribute('src','./assets/images/muteButton.png');
    muteButton.addEventListener('click', ()=> {
        playMusic();
    });
    let info = document.createElement("button");
    info.setAttribute("class","submit info");
    let span3 = document.createElement("span");
    span3.innerHTML = "Controles"
    info.appendChild(span3);
    info.addEventListener('click',()=> {
        Swal.fire({
            position: 'top',
            icon: "info",
            width: '70rem',
            html: '<p style="font-family: \'Press Start 2P\', cursive; font-size: 2rem; color: #fff;"><b>Jugador 1</b></p><br><p style="font-family: \'Press Start 2P\', cursive; font-size: 1.5rem; color: #fff;">Teclas de Movimiento: <b>\'w\', \'a\', \'s\', \'d\'</b></p><br><p style="font-family: \'Press Start 2P\', cursive; font-size: 1.5rem; color: #fff;">Teclas para atacar: <b>\'n\'</b></p><br><br><p style="font-family: \'Press Start 2P\', cursive; font-size: 2rem; color: #fff;"><b>Jugador 2</b></p><br><p style="font-family: \'Press Start 2P\', cursive; font-size: 1.5rem; color: #fff;">Teclas de Movimiento: <b>\'↑\', \'←\', \'↓\', \'→\'</b></p><br><p style="font-family: \'Press Start 2P\', cursive; font-size: 1.5rem; color: #fff;">Teclas para atacar: <b>\'-\'</b></p>',
            background: '#3b3d40'
        });
    })
    // Agregamos todo al contenedor y lo retornamos
    container.appendChild(elijanPersonajes);
    container.appendChild(contenedorJugadores);
    container.appendChild(elijanEscenario);
    container.appendChild(escenarioContainer);
    container.appendChild(submit);
    container.appendChild(reset);
    container.appendChild(muteButton);
    container.appendChild(info);
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

