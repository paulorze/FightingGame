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
    if (attackCollision(player1,player2) && player1.isAttacking && player1.framesCurrent == player1.sprites.attack.frameAtk) {
        player2.healthPartial -= player1.meleedmg;
        document.querySelector(`.${player2.name}Partial`).style.width = 100 - (100 - Math.round(player2.healthPartial * 100 / player2.healthTotal))+`%`;
        player2.switchSprite(`takeHit`);
        player1.isAttacking = false;
    };
    if (player1.healthPartial == 0) {
        player1.death();
        determineWinner(timerId);
    } else if (player2.healthPartial == 0) {
        player2.death();
        determineWinner(timerId);
    };
    if (player1.isAttacking && player1.framesCurrent == player1.sprites.attack.frameAtk) {player1.isAttacking = false};
};

// Con esta función verificamos que jugador1 está a la izquierda o derecha de jugador2
const sideChange = (player1,player2)=> {
    if (player1.rightSide == false && player1.position.x > player2.position.x + player2.width) {
        player1.rightSide = true;
        player1.attackBox.offset.x = player1.offsetAtk;
    } else if (player1.rightSide == true && player1.position.x < player2.position.x) {
        player1.rightSide = false;
        player1.attackBox.offset.x = player1.offsetAtkOriginal.x;
    };
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
    if (player1.healthPartial == player2.healthPartial) {
        document.querySelector(`.displayResultado`).innerHTML = "Draw";
    }else if (player1.healthPartial > player2.healthPartial) {
        document.querySelector(`.displayResultado`).innerHTML = "Player 1 Wins";
    } else {
        document.querySelector(`.displayResultado`).innerHTML = "Player 2 Wins";
    };
};

// Verificamos colisión entre dos objetos
const collision = ({object1, object2})=> {
    return(object1.position.y + object1.height >= object2.position.y 
        && object1.position.y <= object2.position.y + object2.height 
        && object1.position.x <= object2.position.x + object2.width 
        && object1.position.x + object1.width >= object2.position.x);
};

const platformCollision = ({object1, object2})=> {
    return(object1.position.y + object1.height >= object2.position.y 
        && object1.position.y + object1.height <= object2.position.y + object2.height 
        && object1.position.x <= object2.position.x + object2.width 
        && object1.position.x + object1.width >= object2.position.x);
};

// Creamos la función que anima la interfaz de juego
const animate = ()=> {
    window.requestAnimationFrame(animate);
    //Esto fue utilizado al principio para poder ver bien el lugar ocupado por el canvas.
    // c.fillStyle = `black`;
    // c.fillRect(0, 0, canvas.width,canvas.height);
    background.update();
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
};