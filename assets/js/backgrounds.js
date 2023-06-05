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
        imageSrc : './assets/graphics/Backgrounds/Forest1.png',
        music: './assets/music/BGMusic/Forest.mp3'
    });
};

const StringStar = ()=> {
    return new Sprite ({position: {
        x: 0,
        y: 0
        },
        imageSrc : './assets/graphics/Backgrounds/SpringStarFields.png',
        music: './assets/music/BGMusic/SpringStar.mp3'
    });
};

const Hills = ()=> {
    return new Sprite ({position: {
        x: 0,
        y: 0
        },
        imageSrc : './assets/graphics/Backgrounds/Hills.png',
        music: './assets/music/BGMusic/Hills.mp3'
    });
}

const MagicCliffs = ()=> {
    return new Sprite ({position: {
        x: 0,
        y: 0
        },
        imageSrc : './assets/graphics/Backgrounds/MagicCliffs.png',
        music: './assets/music/BGMusic/MagicCliffs.wav'
    });
}

const FantasyCaves = ()=> {
    return new Sprite ({position: {
        x: 0,
        y: 0
        },
        imageSrc : './assets/graphics/Backgrounds/FantasyCaves.png',
        music: './assets/music/BGMusic/Caves.mp3'
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

