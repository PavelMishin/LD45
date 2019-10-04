export default class Game extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    init(data) {

    }

    preload() {

    }

    create() {
        this.data.set('status', 'init')
        this._createLevel()
        this._createGameObjects()
        this._cameraSetup()
        this._initInput()
        this._createHUD()
        this._handleCollisions()
        this.fadeIn()
    }

    update(time, delta) {

    }

    /*
        LEVELS
     */
    _createLevel() {

    }

    /*
        GAME OBJECTS
     */
    _createGameObjects() {

    }


    /*
        PHYSICS
     */
    _handleCollisions() {

    }

    /*
        INTERFACE
     */
    _createHUD() {
        this.scene.launch('HUD')
        this.HUD = this.scene.get('HUD')
    }


    /*
        CAMERA
     */
    _cameraSetup() {

    }

    fadeIn() {
        this.cameras.main.fadeIn(300)
    }

    fadeOut() {
        this.cameras.main.fadeOut(300)
    }


    /*
        INPUT
     */
    _initInput() {
        this.input.on('pointerdown', this._handlePointerDown, this)
    }

    _handlePointerDown(pointer) {
        const gameStatus = this.data.get('status')
        switch (gameStatus) {
            case 'init':
                this.data.set('status', 'started')
                break
            case 'started':

                break
        }
    }

    /*
        SOUND
     */



    /*
        STATES
     */
    restartLaunch() {
        this.data.set('status', 'restarted')
        this.cameras.main.fadeOut(250)
        this.cameras.main.once("camerafadeoutcomplete", this._restart, this)
    }

    lose() {
        this.data.set('status', 'lose')
    }

    win() {
        this.data.set('status', 'win')
    }

    _restart() {
        this.scene.stop('HUD')
        const restartData = {

        }
        this.scene.restart(restartData)
        // this.scene.restart('HUD')
    }
}
