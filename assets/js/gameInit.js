// Creamos las constantes correspondientes a la posición inicial de los jugadores y las teclas que utilizarán.
const positionPlayer1 = {x:200, y:20};
const positionPlayer2 = {x:824, y:20};
const keysPlayer1 = {left : 'a', right : 'd', jump : 'w', down : 's', melee : 'n'};
const keysPlayer2 = {left : 'ArrowLeft', right : 'ArrowRight', jump : 'ArrowUp', down : 'ArrowDown', melee : '-'};

// Creamos las constantes que corresponderan a los bloques de colisión del piso, los bloques de colisión de las plataformas, al escenario y a los jugadores
const floorCollisions = [];
const floorCollisionBlocks = [];
const platformCollisions = [];
const platformCollisionBlocks = [];
let player1;
let player2;
let background;

// Creamos una función que modifique los bloques de colisión del escenario dependiendo del escenario elegido y pase los valores donde hay un bloque de colisión al array correspondiente.
const fetchCollisionBlocks = (objetivo,arrayCompleto,arrayObjetos)=> {
    for (let i = 0; i < objetivo.length; i += 64) {
        arrayCompleto.push(objetivo.slice(i, i + 64))
    };
    arrayCompleto.forEach((row, y)=> {
        row.forEach((symbol, x) =>{
            if (symbol != '0') {
                arrayObjetos.push(
                    new CollisionBlock({
                        position: {
                            x:x*16,
                            y:y*16
                        }
                    })
                );
            };
        });
    });
};

// Creamos constructores para cada escenario
const Forest1 = ()=> {
    return new Sprite({position: {
        x: 0,
        y: 0
        },
        imageSrc : './assets/graphics/Backgrounds/Forest1.png'
    });
};

const StringStar = ()=> {
    return new Sprite ({position: {
        x: 0,
        y: 0
        },
        imageSrc : './assets/graphics/Backgrounds/SpringStarFields.png'
    });
};

const Hills = ()=> {
    return new Sprite ({position: {
        x: 0,
        y: 0
        },
        imageSrc : './assets/graphics/Backgrounds/Hills.png'
    });
}

const MagicCliffs = ()=> {
    return new Sprite ({position: {
        x: 0,
        y: 0
        },
        imageSrc : './assets/graphics/Backgrounds/MagicCliffs.png'
    });
}

const FantasyCaves = ()=> {
    return new Sprite ({position: {
        x: 0,
        y: 0
        },
        imageSrc : './assets/graphics/Backgrounds/FantasyCaves.png'
    });
}

// Creamos una función que elija el escenario ingresado
const backgroundSelect = (num)=>{
    switch (num) {
        case 1:
            fetchCollisionBlocks(floorCollisionsForest1,floorCollisions,floorCollisionBlocks);
            fetchCollisionBlocks(platformCollisionsForest1,platformCollisions,platformCollisionBlocks);
            return Forest1();
            break;
        case 2:
            fetchCollisionBlocks(floorCollisionsStringStar,floorCollisions,floorCollisionBlocks);
            fetchCollisionBlocks(platformCollisionsStringStar,platformCollisions,platformCollisionBlocks);
            return StringStar();
            break;
        case 3:
            fetchCollisionBlocks(floorCollisionsHills,floorCollisions,floorCollisionBlocks);
            fetchCollisionBlocks(platformCollisionsHills,platformCollisions,platformCollisionBlocks);
            return Hills();
            break;
        case 4:
            fetchCollisionBlocks(floorCollisionsMagicCliffs,floorCollisions,floorCollisionBlocks);
            fetchCollisionBlocks(platformCollisionsMagicCliffs,platformCollisions,platformCollisionBlocks);
            return MagicCliffs();
            break;
        case 5:
        fetchCollisionBlocks(floorCollisionsFantasyCaves,floorCollisions,floorCollisionBlocks);
        fetchCollisionBlocks(platformCollisionsFantasyCaves,platformCollisions,platformCollisionBlocks);
        return FantasyCaves();
        break;
    };
};

// Creamos constructores para cada personaje
const EvilWizard = (name,position,keys)=>{
    return new Player({
        name : name,
        position: position,
        width : 70,
        height: 150,
        gravity : 0.4,
        health: 80,
        meleedmg : 15,
        movementspd: 4.5,
        jumpspd: -12,
        keys: keys,
        offsetAtk : -200,
        attackBox: {
            widthAB: 200,
            heightAB: 50,
            offsetAB: {
                x: 75,
                y: 25
            }
        },
        scale: 2.25,
        offset: {
            x: 250,
            y: 225
        },
        offsetMirror: {
            x:-70 ,
            y: -225
        },
        imageSrc: `./assets/graphics/Characters/EvilWizard/Idle.png`,
        framesMax : 8,
        sprites: {
            idle : {
                imageSrc: `./assets/graphics/Characters/EvilWizard/Idle.png`,
                framesMax : 8,
            },
            run: {
                imageSrc: `./assets/graphics/Characters/EvilWizard/Run.png`,
                framesMax : 8,
            },
            jump: {
                imageSrc: `./assets/graphics/Characters/EvilWizard/Jump.png`,
                framesMax : 2,
            },
            fall: {
                imageSrc: `./assets/graphics/Characters/EvilWizard/Fall.png`,
                framesMax : 2,
            },
            attack: {
                imageSrc: `./assets/graphics/Characters/EvilWizard/Attack1.png`,
                framesMax : 8,
                frameAtk: 5
            },
            takeHit: {
                imageSrc: `./assets/graphics/Characters/EvilWizard/TakeHit.png`,
                framesMax : 3,
            },
            death: {
                imageSrc: `./assets/graphics/Characters/EvilWizard/Death.png`,
                framesMax : 7,
            }
        },
        collisionBlocks: floorCollisionBlocks,
        platformCollisionBlocks : platformCollisionBlocks
    });
};

const FantasyWarrior = (name,position,keys)=> {
    return new Player({
        name : name,
        position: position,
        width : 70,
        height: 115,
        gravity : 0.5,
        health: 100,
        meleedmg : 20,
        movementspd: 5,
        jumpspd: -15,
        keys: keys,
        offsetAtk : -110,
        attackBox: {
            widthAB: 85,
            heightAB: 50,
            offsetAB: {
                x: 75,
                y: 25
            }
        },
        scale: 2.5,
        offset: {
            x: 165,
            y: 140
        },
        offsetMirror: {
            x:-75,
            y:-140
        },
        imageSrc: `./assets/graphics/Characters/FantasyWarrior/Idle.png`,
        framesMax : 10,
        sprites: {
            idle : {
                imageSrc: `./assets/graphics/Characters/FantasyWarrior/Idle.png`,
                framesMax : 10,
            },
            run: {
                imageSrc: `./assets/graphics/Characters/FantasyWarrior/Run.png`,
                framesMax : 8,
            },
            jump: {
                imageSrc: `./assets/graphics/Characters/FantasyWarrior/Jump.png`,
                framesMax : 3,
            },
            fall: {
                imageSrc: `./assets/graphics/Characters/FantasyWarrior/Fall.png`,
                framesMax : 3,
            },
            attack: {
                imageSrc: `./assets/graphics/Characters/FantasyWarrior/Attack1.png`,
                framesMax : 7,
                frameAtk: 5
            },
            takeHit: {
                imageSrc: `./assets/graphics/Characters/FantasyWarrior/TakeHit.png`,
                framesMax : 3,
            },
            death: {
                imageSrc: `./assets/graphics/Characters/FantasyWarrior/Death.png`,
                framesMax : 7,
            }
        },
        collisionBlocks: floorCollisionBlocks,
        platformCollisionBlocks : platformCollisionBlocks
    });
};

const Huntress = (name,position,keys)=> {
    return new Player({
        name : name,
        position: position,
        width : 70,
        height: 120,
        gravity : 0.4,
        health: 90,
        meleedmg : 20,
        movementspd: 7,
        jumpspd: -15,
        keys: keys,
        offsetAtk : -125,
        attackBox: {
            widthAB: 115,
            heightAB: 50,
            offsetAB: {
                x: 75,
                y: 0
            }
        },
        scale: 3,
        offset: {
            x: 190,
            y: 170
        },
        offsetMirror: {
            x:-110,
            y:-170
        },
        imageSrc: `./assets/graphics/Characters/Huntress/Idle.png`,
        framesMax : 8,
        sprites: {
            idle : {
                imageSrc: `./assets/graphics/Characters/Huntress/Idle.png`,
                framesMax : 8,
            },
            run: {
                imageSrc: `./assets/graphics/Characters/Huntress/Run.png`,
                framesMax : 8,
            },
            jump: {
                imageSrc: `./assets/graphics/Characters/Huntress/Jump.png`,
                framesMax : 2,
            },
            fall: {
                imageSrc: `./assets/graphics/Characters/Huntress/Fall.png`,
                framesMax : 2,
            },
            attack: {
                imageSrc: `./assets/graphics/Characters/Huntress/Attack2.png`,
                framesMax : 5,
                frameAtk: 4
            },
            takeHit: {
                imageSrc: `./assets/graphics/Characters/Huntress/TakeHit.png`,
                framesMax : 3,
            },
            death: {
                imageSrc: `./assets/graphics/Characters/Huntress/Death.png`,
                framesMax : 8,
            }
        },
        collisionBlocks: floorCollisionBlocks,
        platformCollisionBlocks : platformCollisionBlocks
    });
};

const MedievalKing = (name,position,keys)=> {
    return new Player({
        name : name,
        position: position,
        width: 70,
        height: 150,
        gravity : 0.7,
        health: 100,
        meleedmg : 25,
        movementspd: 4,
        jumpspd: -15,
        keys: keys,
        offsetAtk : -105,
        attackBox: {
            widthAB: 100,
            heightAB: 50,
            offsetAB: {
                x: 75,
                y: 50
            }
        },
        scale: 1.55,
        offset: {
            x: 70,
            y: 30
        },
        offsetMirror: {
            x: 15,
            y: -30
        },
        imageSrc : './assets/graphics/Characters/MedievalKing/Idle.png',
        framesMax : 6,
        sprites: {
            idle: {
                imageSrc : './assets/graphics/Characters/MedievalKing/Idle.png',
                framesMax : 6,
            },
            run: {
                imageSrc : './assets/graphics/Characters/MedievalKing/Run.png',
                framesMax : 8,
            },
            jump: {
                imageSrc : './assets/graphics/Characters/MedievalKing/Jump.png',
                framesMax : 2,
            },
            fall: {
                imageSrc : './assets/graphics/Characters/MedievalKing/Fall.png',
                framesMax : 2,
            },
            attack: {
                imageSrc : './assets/graphics/Characters/MedievalKing/Attack1.png',
                framesMax : 6,
                frameAtk : 4
            },
            takeHit: {
                imageSrc : './assets/graphics/Characters/MedievalKing/TakeHit.png',
                framesMax : 4,
            },
            death: {
                imageSrc : './assets/graphics/Characters/MedievalKing/Death.png',
                framesMax : 11,
            }
        },
        collisionBlocks: floorCollisionBlocks,
        platformCollisionBlocks : platformCollisionBlocks
    });
};

const MedievalKing2 = (name,position,keys)=> {
    return new Player({
        name : name,
        position: position,
        width : 70,
        height: 125,
        gravity : 0.5,
        health: 100,
        meleedmg : 20,
        movementspd: 6,
        jumpspd: -15,
        keys: keys,
        offsetAtk : -110,
        attackBox: {
            widthAB: 100,
            heightAB: 50,
            offsetAB: {
                x: 75,
                y: 25
            }
        },
        scale: 2.2,
        offset: {
            x: 150,
            y: 105
        },
        offsetMirror: {
            x:-55,
            y:-105
        },
        imageSrc: `./assets/graphics/Characters/MedievalKing2/Idle.png`,
        framesMax : 8,
        sprites: {
            idle : {
                imageSrc: `./assets/graphics/Characters/MedievalKing2/Idle.png`,
                framesMax : 8,
            },
            run: {
                imageSrc: `./assets/graphics/Characters/MedievalKing2/Run.png`,
                framesMax : 8,
            },
            jump: {
                imageSrc: `./assets/graphics/Characters/MedievalKing2/Jump.png`,
                framesMax : 2,
            },
            fall: {
                imageSrc: `./assets/graphics/Characters/MedievalKing2/Fall.png`,
                framesMax : 2,
            },
            attack: {
                imageSrc: `./assets/graphics/Characters/MedievalKing2/Attack1.png`,
                framesMax : 4,
                frameAtk: 3
            },
            takeHit: {
                imageSrc: `./assets/graphics/Characters/MedievalKing2/TakeHit.png`,
                framesMax : 4,
            },
            death: {
                imageSrc: `./assets/graphics/Characters/MedievalKing2/Death.png`,
                framesMax : 6,
            }
        },
        collisionBlocks: floorCollisionBlocks,
        platformCollisionBlocks : platformCollisionBlocks
    });
};

const MedievalWarrior = (name,position,keys)=> {
    return new Player({
        name : name,
        position: position,
        width : 70,
        height: 100,
        gravity : 0.6,
        health: 120,
        meleedmg : 20,
        movementspd: 5,
        jumpspd: -16,
        keys: keys,
        offsetAtk : -110,
        attackBox: {
            widthAB: 100,
            heightAB: 50,
            offsetAB: {
                x: 75,
                y: 0
            }
        },
        scale: 2.5,
        offset: {
            x: 135,
            y: 115
        },
        offsetMirror: {
            x:-70,
            y:-115
        },
        imageSrc: `./assets/graphics/Characters/MedievalWarrior/Idle.png`,
        framesMax : 10,
        sprites: {
            idle : {
                imageSrc: `./assets/graphics/Characters/MedievalWarrior/Idle.png`,
                framesMax : 10,
            },
            run: {
                imageSrc: `./assets/graphics/Characters/MedievalWarrior/Run.png`,
                framesMax : 6,
            },
            jump: {
                imageSrc: `./assets/graphics/Characters/MedievalWarrior/Jump.png`,
                framesMax : 2,
            },
            fall: {
                imageSrc: `./assets/graphics/Characters/MedievalWarrior/Fall.png`,
                framesMax : 2,
            },
            attack: {
                imageSrc: `./assets/graphics/Characters/MedievalWarrior/Attack1.png`,
                framesMax : 4,
                frameAtk: 3
            },
            takeHit: {
                imageSrc: `./assets/graphics/Characters/MedievalWarrior/GetHit.png`,
                framesMax : 3,
            },
            death: {
                imageSrc: `./assets/graphics/Characters/MedievalWarrior/Death.png`,
                framesMax : 9,
            }
        },
        collisionBlocks: floorCollisionBlocks,
        platformCollisionBlocks : platformCollisionBlocks
    });
};

// Creamos una función que permita crear a los jugadores con su personaje seleccionado, nombre correspondiente (para luego relacionarlo a la barra de vida), posición de inicio y teclas a utilizar.
const characterSelect = (num,name,position,keys)=> {
    switch (num) {
        case 1:
            return EvilWizard(name,position,keys);
            break;
        case 2:
            return FantasyWarrior(name,position,keys);
            break;
        case 3:
            return Huntress(name,position,keys);
            break;
        case 4:
            return MedievalKing(name,position,keys);
            break;
        case 5:
            return MedievalKing2(name,position,keys);
            break;
        case 6:
            return MedievalWarrior(name,position,keys);
            break;
    };
};

// Creamos la función que dispara cuando se apreta el botón submit y que comienza el juego con 2 jugadores
const initializeGame = (jugador1,jugador2,escenario)=> {
    player1 = characterSelect(jugador1,`player1`,positionPlayer1,keysPlayer1);
    player2 = characterSelect(jugador2,`player2`,positionPlayer2,keysPlayer2);
    background = backgroundSelect(escenario);

    timerDecrease(player1,player2);
    player1.movementInput();
    player2.movementInput();
    animate();
};