// Con esta función creamos el contenedor que contendrá los personajes disponibles y le agregamos un botón por cada uno de manera dinámica.
const createCharacterSelect = (player,selection)=> {
    let i = 1;
    let div = document.createElement("div");
    div.setAttribute("class","personajesContainer");
    characterIcons.forEach(icon => {
        let button = createCharacterButton(i,player,selection,icon);
        i ++;
        div.appendChild(button);
    });
    return div;
};

// Con esta función creamos los botones correspondientes a los personajes disponibles.
const createCharacterButton = (value,player,selection,source)=> {
    let div = document.createElement("div");
    div.setAttribute("class","personaje");
    div.setAttribute("data-value",`${value}`);
    div.setAttribute("data-player",player);
    div.addEventListener("click",()=> {
        if (!div.classList.contains("disabled")) {
            if (selection === 1) {
                jugador1PersonajeElegido = value;
            } else if (selection === 2) {
                jugador2PersonajeElegido = value;
            };
            modifyButton(div,player);
        };
    });
    let img = document.createElement("img");
    img.src = source;
    div.appendChild(img);
    return div
};

// Con esta función modificamos la clase del botón del personaje elegido y su equivalente del otro jugador, para que mostrar qué personaje ha sido seleccionado y para deshabilitar el otro.
const modifyButton = (obj,player)=> {
    let value = obj.getAttribute('data-value');
    let buttons = document.querySelectorAll (".personaje");
    buttons.forEach(button => {
        if (button.getAttribute('data-player') == player && !button.classList.contains("disabled")) {
            button.setAttribute("class","personaje");
        };
        if (button.getAttribute('data-player') != player && !button.classList.contains("active")) {
            button.setAttribute("class","personaje");
        }
        if (button.getAttribute('data-player') != player && button.getAttribute('data-value') === value) {
            button.setAttribute("class","personaje disabled");
        };
    });
    obj.setAttribute("class","personaje active animate__animated animate__headShake");
    playSound(lockSound);
};

// Con esta función creamos el select para el escenario y le agregamos las opciones de manera dinámica.
const createBackgroundSelect = ()=> {
    let select = document.createElement("select");
    select.setAttribute("class","escenarioSelect");
    let i = 1;
    backgroundList.forEach(background => {
        let option = createBackgroundOption(i,background);
        select.appendChild(option);
        i ++;
    });
    return select;
};

// Con esta función creamos las opciones de escenario
const createBackgroundOption = (value,name)=> {
    let div = document.createElement("option");
    div.setAttribute("class","escenarioOpcion");
    div.setAttribute("value",value);
    div.innerHTML = name;
    return div
};

// Con esta función vamos disminuyendo los segundos y mostrándolo en pantalla. Al finalizar, se dispara la verificación del resultado.
const timerDecrease = ()=> {
    if (matchTime > 0) {
        timerId = setTimeout(timerDecrease, 1000);
        matchTime --;
        timer.innerHTML = `<p>${matchTime}</p>`;
    };
    if (matchTime === 0) {
        determineWinner(timerId);
    };
};

// Con esta función verificamos el resultado al finalizar el tiempo
const determineWinner = (timerId)=> {
    clearTimeout(timerId);
    if ((player1.healthPartial / player1.healthTotal) == (player2.healthPartial / player2.healthTotal)) {
        document.querySelector(`.displayResultado`).innerHTML = "Draw";
        resetFlag = true;
    }else if ((player1.healthPartial / player1.healthTotal) > (player2.healthPartial / player2.healthTotal)) {
        player2.switchSprite(`death`);
        document.querySelector(`.displayResultado`).innerHTML = "Player 1 Wins";
    } else {
        player1.switchSprite(`death`);
        document.querySelector(`.displayResultado`).innerHTML = "Player 2 Wins";
    };
};

// Con esta función verificamos que estén haciendo colisión la attackBox de jugador1 y el cuerpo de jugador2.
const attackCollision = (player1,player2)=> {
    if (player1.attackBox.position.x + player1.attackBox.width >= player2.position.x && 
        player1.attackBox.position.x <= player2.position.x + player2.width && 
        player1.attackBox.position.y + player1.attackBox.height >= player2.position.y && 
        player1.attackBox.position.y <= player2.position.y + player2.height) {
        return true
    };
};

// Con esta función verificamos si el ataque de uno de los jugadores está afectando al otro
const verifyAttack = (player1,player2)=> {
    if (attackCollision(player1,player2) && player1.isAttacking && player1.framesCurrent == player1.sprites.attack.frameAtk -1) {
        player2.healthPartial -= player1.meleedmg;
        if (player2.healthPartial > 0) {
            playSound(player2.takeHitSound);
            document.querySelector(`.${player2.name}Partial`).style.width = 100 - (100 - Math.round(player2.healthPartial * 100 / player2.healthTotal))+`%`;
        } else {document.querySelector(`.${player2.name}Partial`).style.width = "0%"}
        player2.switchSprite(`takeHit`);
        player1.isAttacking = false;
    };
    if (player2.healthPartial <= 0) {
        player2.switchSprite(`death`);
        determineWinner(timerId);
    };
    // if (player1.isAttacking && player1.framesCurrent == player1.sprites.attack.framesMax -1) {player1.isAttacking = false}; Esta es la línea original para hacer que el personaje deje de estar atacando. La reemplacé en switchSprite() para resolver bug.
};

// Con esta función verificamos que jugador1 está a la izquierda o derecha de jugador2 para modificar la attackBox y el sprite
const sideChange = (player1,player2)=> {
    if (!player1.dead) {
        if (player1.rightSide == false && player1.position.x > player2.position.x + player2.width) {
            player1.rightSide = true;
            player1.attackBox.offset.x = player1.offsetAtk;
        } else if (player1.rightSide == true && player1.position.x < player2.position.x) {
            player1.rightSide = false;
            player1.attackBox.offset.x = player1.offsetAtkOriginal.x;
        };
    };
};

// Verificamos colisión entre dos objetos
const collision = ({object1, object2})=> {
    return(object1.position.y + object1.height >= object2.position.y 
        && object1.position.y <= object2.position.y + object2.height 
        && object1.position.x <= object2.position.x + object2.width 
        && object1.position.x + object1.width >= object2.position.x);
};

// Verificamos colisión con plataforma
const platformCollision = ({object1, object2})=> {
    return(object1.position.y + object1.height >= object2.position.y 
        && object1.position.y + object1.height <= object2.position.y + object2.height 
        && object1.position.x <= object2.position.x + object2.width 
        && object1.position.x + object1.width >= object2.position.x);
};

// Creamos una función que reinicie el juego automáticamente.
const restartGame = ()=> {
    let display = document.querySelector(`.displayResultado`);
    restartTime ++;
    if (restartTime >= 250){
        if (resetCount == 0) {
            display.innerHTML = `<p>1</p>`;
            location.reload();
            resetCount ++
        }
    }else if (restartTime >= 200) {
        display.innerHTML = `<p>1</p>`;
    }else if (restartTime >= 140) {
        display.innerHTML = `<p>2</p>`;
    }else if (restartTime >= 80) {
        display.innerHTML = `<p>3</p>`;
    };
};

// Esto lo estaba pensando para resetear las variables sin tener que actualizar la página.
// const resetVariables = ()=> {
//     jugador1PersonajeElegido = null;
//     jugador2PersonajeElegido = null;
//     player1 = undefined;
//     player2 = undefined;
//     background = undefined;
//     matchTime = 10;
//     restartTime = 0;
// }

// Creamos una funcion que permita ejecutar la musica de fondo del videojuego
const playMusic = ()=> {
    if (sound) {
        bgMusic.pause();
        sound = false;
    } else {
        bgMusic.play();
        sound = true;
    };
};

const playSound = (audio)=> {
    audio.volume = 0.5;
    sound && audio.play();
};

const stopSound = (audio)=> {
    if (sound) {
        audio.pause();
        audio.currentTime = 0;
    };
};

// Creamos la función que anima la interfaz de juego
const animate = ()=> {
    window.requestAnimationFrame(animate);
    // //Esto fue utilizado al principio para poder ver bien el lugar ocupado por el canvas.
    // c.fillStyle = `black`;
    // c.fillRect(0, 0, canvas.width,canvas.height);
    background.update();
    // Esto es para apagar un poco los colores del fondo
    c.fillStyle = `rgba(255, 255, 255, 0.1)`
    c.fillRect(0, 0, canvas.width,canvas.height);
    player1.update();
    player2.update();
    // // Esto es para verificar la ubicación de los bloques de posición
    // c.fillStyle = `rgba(255,0,0,0.5)`;
    // floorCollisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.update();
    // });
    // platformCollisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.update();
    // });
    verifyAttack(player1,player2);
    verifyAttack(player2,player1);
    sideChange(player1,player2);
    sideChange(player2,player1);
    player1.death(jugador2Score,"jugador2Score");
    player2.death(jugador1Score,"jugador1Score");
    if (resetFlag) {
        restartGame();
    };
};

// Creamos la función que dispara cuando se apreta el botón submit y que comienza el juego con 2 jugadores
const initializeGame = (jugador1,jugador2,escenario)=> {
    background = backgroundSelect(escenario);
    player1 = characterSelect(jugador1,`player1`,positionPlayer1,keysPlayer1);
    player2 = characterSelect(jugador2,`player2`,positionPlayer2,keysPlayer2);
    if (sound) {
        playMusic();
        sound = true;
        background.music.load();
        background.backgroundMusic();
        player1.meleeAtkSound.load();
        player1.deathSound.load();
        player1.takeHitSound.load();
        player2.meleeAtkSound.load();
        player2.deathSound.load();
        player2.takeHitSound.load();
        background.music.onerror = ()=> console.log('Error al cargar audio');
        player1.meleeAtkSound.onerror = ()=> console.log('Error al cargar audio');
        player1.deathSound.onerror = ()=> console.log('Error al cargar audio');
        player1.takeHitSound.onerror = ()=> console.log('Error al cargar audio');
        player2.meleeAtkSound.onerror = ()=> console.log('Error al cargar audio');
        player2.deathSound.onerror = ()=> console.log('Error al cargar audio');
        player2.takeHitSound.onerror = ()=> console.log('Error al cargar audio');
    };
    setTimeout(() => {
        timerDecrease();
        player1.movementInput();
        player2.movementInput();
        animate();
    }, 1000);
};