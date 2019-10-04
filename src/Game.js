import BootScene from './Scenes/Boot'
import PreloadScene from './Scenes/Preload'
import GameScene from './Scenes/Game'
import HUDScene from './Scenes/HUD'


export default class Game extends Phaser.Game {
    constructor(config) {
        super(config)

        this.scene.add('Boot', BootScene)
        this.scene.add('Preload', PreloadScene)
        this.scene.add('Game', GameScene)
        this.scene.add('HUD', HUDScene)

        this.scene.start('Boot')
    }


    toggleSound() {
        const soundState = this.registry.get('sound')
        this.registry.set('sound', !soundState)

        if (soundState) {
            this.sound.pauseAll()
            this.sound.setMute(true)
        } else {
            this.sound.resumeAll()
            this.sound.setMute(false)
        }
    }
}
