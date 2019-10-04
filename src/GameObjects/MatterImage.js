export default class MatterImage extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        const options = {
            isSensor: true,
            isStatic: true,
            objectName: ''
        }
        super(scene.matter.world, x, y, 'sprite', 'frame', options)

        scene.add.existing(this)
    }
}
