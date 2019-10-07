import PhaserNavMeshPlugin from "phaser-navmesh"

const gameHeight = 1080
let gameWidth = 1920

const head = document.getElementsByTagName('head')[0]
const js = document.createElement("script")
js.src = '//cdn1.kongregate.com/javascripts/kongregate_api.js'
head.appendChild(js)

const timer = setInterval(() => {
    if (window.kongregateAPI !== undefined) {
        clearInterval(timer)
        kongregateAPI.loadAPI(() => {
            window.kongregate = kongregateAPI.getAPI()
        })
    }
}, 50)

export default {
    type: Phaser.WEBGL,
    parent: 'game',
    backgroundColor: '#000000',
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
    render: {
        antialias: false,
        maxLights: 50
    },
    plugins: {
        scene: [
            {
                key: "PhaserNavMeshPlugin", // Key to store the plugin class under in cache
                plugin: PhaserNavMeshPlugin, // Class that constructs plugins
                mapping: "navMeshPlugin", // Property mapping to use for the scene, e.g. this.navMeshPlugin
                start: true
            }
        ]
    }
}

