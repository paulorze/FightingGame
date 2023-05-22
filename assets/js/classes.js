class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 }
    }) {
        this.position = position;
        this.width = 50;
        this.height = 150
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
    };
    // Esta función dibuja los sprites de manera dinámica dependiendo de la cantidad de frames que tenga la imagen original.
    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    };
    // Esta función va haciendo que cambie el sprite de manera cíclica y dinámica.
    animateFrames() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
            } else {
            this.framesCurrent = 0
            }
        }
    }
    update() {
        this.draw()
        this.animateFrames()
    }
};

class Player extends Sprite {
    constructor ({name,position,width,height,gravity,health,meleedmg,movementspd,jumpspd,keys:{left,right,jump,down,melee},offsetMirror = {x: 0, y: 0},offsetAtk,attackBox:{offsetAB,widthAB,heightAB},imageSrc,scale = 1, framesMax = 1,offset = { x: 0, y: 0 },sprites,collisionBlocks,platformCollisionBlocks}) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        });
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.name = name;
        this.velocity = {
            x :0,
            y : 0
        };
        this.width = width;
        this.height = height;
        this.gravity = gravity;
        this.healthTotal = health;
        this.healthPartial = health;
        this.meleedmg = meleedmg;
        this.movementspd = movementspd;
        this.jumpspd = jumpspd;
        this.left = left;
        this.right = right;
        this.jump = jump;
        this.down = down;
        this.melee = melee;
        this.keys = {
            [left] : {
                pressed : false
            },
            [right] : {
                pressed : false
            }
        };
        this.lastKey;
        this.offsetMirror = offsetMirror;
        this.offsetAtk = offsetAtk;
        this.offsetAtkOriginal = { ...offsetAB }; //Con esta sintaxis se evita que se modifique esta instancia de la variable offsetAB al modificar la que está dentro de attackBox
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: widthAB,
            height: heightAB,
            offset: offsetAB
        };
        this.isAttacking;
        this.rightSide = false;
        this.dead = false;
        this.sprites = sprites;

        for (const sprite in sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
        this.collisionBlocks = collisionBlocks;
        this.platformCollisionBlocks = platformCollisionBlocks;
    };

    // Con la siguiente función definimos que el jugador esté atacando.
    attack() {
        this.switchSprite(`attack`);
        this.isAttacking = true;
    };
    // Con la siguiente función definimos que el jugador ha muerto.
    death(){
        this.switchSprite(`death`);
        if (this.framesCurrent == this.framesMax -1) {
            this.dead = true;
        };
    };

    // Con esta función cambiamos el sprite que se visualiza
    switchSprite (sprite) {
        // Con estos return evitamos que el sprite cambie antes de que termine la animación de ataque, recibir golpe o morir.
        if (this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax -1) return;
        if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax -1) return;
        if (this.image === this.sprites.death.image) return;
        switch (sprite) {
            case `idle`:
                if (this.image != this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                };
                break;
            case `run`:
                if (this.image != this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                };
                break;
            case `jump`:
                if (this.image != this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                };
                break;
            case `fall`:
                if (this.image != this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 0;
                };  
                break;
            case `attack`:
                if (this.image != this.sprites.attack.image) {
                    this.image = this.sprites.attack.image;
                    this.framesMax = this.sprites.attack.framesMax;
                    this.framesCurrent = 0;
                };
                break;
            case `takeHit`:
                if (this.image != this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image;
                    this.framesMax = this.sprites.takeHit.framesMax;
                    this.framesCurrent = 0;
                };
                break;
            case `death`:
                if (this.image != this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.framesCurrent = 0;
                };
                break;
        };
    };

    // Con esta función damos vuelta la imagen del personaje para que siempre esté viendo hacia el lado del oponente.

    drawMirrored(){
        // Declaramos las variables para que se pueda calcular de manera dinámica
        let spriteW = (this.image.width / this.framesMax);
        let spriteH = this.image.height;
        let spriteX = spriteW * this.framesCurrent;
        let spriteY = (this.image.height * this.scale);
        //Hacemos las transformaciones necesarias, dibujamos la imagen y devolvemos el canvas a la normalidad.
        c.translate(this.position.x + spriteW,this.position.y)
        c.scale(-1,1)
        c.drawImage(
            this.image,
            spriteX,
            0,
            spriteW,
            spriteH,
            this.offsetMirror.x,
            this.offsetMirror.y,
            spriteW*this.scale,
            spriteY
        );
        c.setTransform(1,0,0,1,0,0);
    };

    // Con esta función escuchamos que las teclas declaradas al crear el jugador son escuchadas y modifiquen variables del jugador para que se pueda mover.
    movementInput() {
        window.addEventListener("keydown", (event) => {
            if (this.dead) {
                return;
            };
            switch (event.key) {
                case this.left :
                    this.keys[this.left].pressed = true
                    this.lastKey = this.left;
                    break;
                case this.right :
                    this.keys[this.right].pressed = true;
                    this.lastKey = this.right;
                    break;
                case this.jump :
                    this.velocity.y === 0 && (this.velocity.y = this.jumpspd);
                    break;
                case this.down :
                    this.velocity.y != 0 && (this.velocity.y = 0);
                    break;
                case this.melee :
                    this.attack();
                    break;
            };
        });
        window.addEventListener("keyup", (event) => {
            if (this.dead) {
                return;
            };
            switch (event.key) {
                case this.left:
                    this.keys[this.left].pressed = false;
                    break;
                case this.right:
                    this.keys[this.right].pressed = false;
                    break;
            };
        });
    };

    movement() {
        this.velocity.x = 0; //Con esto hacemos que el personaje deje de moverse cuando se sueltan todas las teclas.
        // Con lo siguiente hacemos que el personaje se mueva siempre y cuando estén presionadas las teclas correspondientes.
        if (this.keys[this.left].pressed && this.lastKey === this.left) {
            this.velocity.x = -(this.movementspd);
            this.switchSprite(`run`);
        } else if (this.keys[this.right].pressed && this.lastKey === this.right) {
            this.velocity.x = this.movementspd;
            this.switchSprite(`run`);
        } else {
            this.switchSprite(`idle`);
        };
        if (this.velocity.y < 0) {
            this.switchSprite(`jump`);
        } else if (this.velocity.y > 0) {
            this.switchSprite(`fall`);
        };
    };

    // Con esta función le aplicamos gravedad al personaje.
    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    };
    
    // Con las siguientes funciones verificamos colisión con los bloques del suelo y de las plataformas
    checkFloorVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (collision({object1 : this,object2: collisionBlock})) {
                if(this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break;
                };
                if(this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break;
                }; 
            };
        };
    };

    checkFloorHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (collision({object1 : this,object2: collisionBlock})) {
                if(this.velocity.x > 0) {
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break;
                };
                if(this.velocity.x < 0) {
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                };
            };
        };
    };

    checkPlatformVerticalCollisions() {
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i];
            if (platformCollision({object1 : this,object2: platformCollisionBlock})) {
                if(this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = platformCollisionBlock.position.y - this.height - 0.01;
                    break;
                };
            };
        };
    };

    // Con esta función logramos ver que el personaje se vaya moviendo.
    update() {
        // Esta línea es para ver nuestro hitBox
        // c.fillRect(this.position.x,this.position.y,this.width,this.height);
        (this.rightSide == false) ? this.draw() : this.drawMirrored();
        if (!this.dead) this.animateFrames()
        this.movement();
        this.position.x += this.velocity.x;
        this.checkFloorHorizontalCollisions();
        this.applyGravity();
        this.checkFloorVerticalCollisions();
        this.checkPlatformVerticalCollisions();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        // Esta línea es para ver nuestro attackBox
        // c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height);
    };
};


// Creamos la clase para los bloques de colisión del background.
class CollisionBlock {
    constructor ({position}) {
    this.position = position;
    this.width = 16; //Pasamos el tamaño en px de nuestros cuadrados de colisión.
    this.height = 16;
    };

    // Esto es para verificar visualmente si quedaron ubicados correctamente los bloques de colisión del background.
    draw() {
        c.fillStyle = `rgba(255,0,0,0.5)`;
        c.fillRect(this.position.x, this.position.y,this.width,this.height);
    }
    update() {
        this.draw();
    }
};

