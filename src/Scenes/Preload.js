import {Data, Images, Fonts, Tilesets, Sprites, Audio} from '../Config/assets'
import Preloader from "../UI/Preloader"
import Text from "../UI/Text"

export default class Preload extends Phaser.Scene {
    constructor() {
        super('Preload')
    }

    init() {
        this.readyCount = 0
    }

    preload() {
        this.load.baseURL = 'assets/'

        // this.time.delayedCall(0, this._ready, [], this)
        // this._preloadUi()


        // this.load.spritesheet('magmaBall', Sprites.sprite, {frameWidth: 100, frameHeight: 100})
        // this.load.json('magmaBallShape', Data.spriteShape) // Only for matter
        //
        // this.load.multiatlas('bat', Data.spriteAtlas, 'sprites')
        // this.load.json('batShape', Data.atlasShape) // Only for Matter
        //
        // this.load.tilemapTiledJSON('level', 'tilemaps/level.json')
        // this.load.image('layerSpriteSheet', Tilesets.tiles)
        //
        // this.load.bitmapFont('bmfont', Fonts.image.bmfont, Fonts.data.bmfont)
        //
        // this.load.image('img', Images.img)

        // this.load.audio('sound', Audio.sound)

    }

    create() {
        // this.game.toggleSound()
        this.scene.start('Game')
    }

    _ready() {
        this.readyCount++

        switch (this.readyCount) {
            case 2:
                this.scene.start('Game')
                break
        }
    }


    _preloadUi() {
        const preloader = new Preloader(this)

        this.load.on('progress', (value) => {
            preloader.setProgress(value)
        })

        this.load.once('complete', () => {
            // preloader.removeTextures()
            this._ready()
        })
    }
}


