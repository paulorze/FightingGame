const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 128) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 128))
};

const collisionBlocks = [];
floorCollisions2D.forEach((row, y)=> {
    row.forEach((symbol, x) =>{
        if (symbol != '0') {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x:x*8,
                        y:y*8
                    }
                })
            );
        };
    });
});
