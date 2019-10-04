const gameHeight = 600
let gameWidth = 900

export default {
    type: Phaser.WEBGL,
    parent: 'batty-bat',
    backgroundColor: '#9a9ea0',
    transparent: true,
    scale: {
        parent: 'game',
        fullscreenTarget: 'gameFullscreen',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameWidth,
        height: gameHeight,
        autoRound: true,
    },
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: {y: 300},
            // debug: true
        },
    },
    // physics: {
    //     default: 'matter',
    //     matter: {
    //         positionIterations: 1,
    //         velocityIterations: 1,
    //         constraintIterations: 1,
    //         // debug: true,
    //     }
    // },
    render: {
        antialias: false,
    },
    plugins: {

    }
}

