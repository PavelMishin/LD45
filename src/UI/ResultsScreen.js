import Background from "./Background"
import ButtonText from "./ButtonText"

export default class ResultsScreen extends Phaser.GameObjects.Container {
    constructor(scene, results) {
        const center = scene.cameras.main.midPoint
        super(scene, center.x, center.y)

        this.setAlpha(0)

        this.background = new Background(scene, '')
        this.add(this.background)

        new ButtonText(scene, 0, 0, '', 'restart')

    }
}
