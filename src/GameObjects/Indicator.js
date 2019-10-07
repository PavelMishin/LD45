import Utils from "../Utils"

export default class Indicator extends Phaser.GameObjects.Image {
    constructor(scene, time) {
        const x = scene.cameras.main.width - 100
        const y = 50
        super(scene, x, y, 'battery')
        this.setOrigin(1, 0)
        this.setScale(5)

        Utils.disappear(this, time - 100, 100)
        scene.add.existing(this)
    }
}
