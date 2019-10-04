import Text from "../UI/Text"
import Utils from "../Utils"
import ButtonImage from "../UI/ButtonImage"
import ButtonText from "../UI/ButtonText"
import ResultsScreen from "../UI/ResultsScreen"


export default class HUD extends Phaser.Scene {
    constructor() {
        super('HUD')
    }

    preload() {
    }

    create() {
        this.gameScene = this.scene.get('Game')

        this.gameScene.data.events.on('changedata-status', this._handleGameStatusChange, this)

    }

    _handleGameStatusChange(parent, value, previousValue) {
        switch (value) {
            case 'started':

                break
        }
    }

    showGameInterface() {

    }

    hideGameInterface() {

    }

    _onRestartPress() {
        this.scene.resume('Game')
        this.gameScene.restartLaunch()
    }

    _end() {
        new ResultsScreen(this)
    }
}
