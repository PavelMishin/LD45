export default class Image extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'spriteSheet', 'frame')

        scene.add.existing(this)
    }
}
