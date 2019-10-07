import {Images} from '../Config/assets'

export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot')
    }

    preload() {
        this.load.baseURL = 'assets/'
        // this.load.image('preloadBg', Images.preloadBg)
        // this.load.image('loadBarBg', Images.loadBarBg)
        // this.load.image('loadBar', Images.loadBar)
    }

    create() {
        this._initData()
        this.scene.start('Preload')
    }

    _initData() {
        this.registry.set('sound', true)
    }
}
