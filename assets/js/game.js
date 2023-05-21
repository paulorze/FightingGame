const background = new Sprite({position: {
    x: 0,
    y: 0
    },
    imageSrc : '../../assets/graphics/Backgrounds/Background.png'
});

// const animate = ()=> {
//     window.requestAnimationFrame(animate);
//     //Esto fue utilizado al principio para poder ver bien el lugar ocupado por el canvas.
//     // c.fillStyle = `black`;
//     // c.fillRect(0, 0, canvas.width,canvas.height);
//     background.update();
//     c.fillStyle = `rgba(255, 255, 255, 0.1)`
//     c.fillRect(0, 0, canvas.width,canvas.height);
//     player1.update();
//     player2.update();
//     collisionBlocks.forEach(collisionBlock => {
//         collisionBlock.update();
//     });
//     verifyAttack(player1,player2);
//     verifyAttack(player2,player1);
//     sideChange(player1,player2);
//     sideChange(player2,player1);
// };

// timerDecrease(player1,player2);
// player1.movementInput();
// player2.movementInput();
// animate();