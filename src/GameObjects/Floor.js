export default class Background extends Phaser.GameObjects.Image {
    constructor(scene) {
        const camera = scene.cameras.main
        const center = camera.midPoint

        super(scene, center.x, center.y, 'floor')

        this.setDepth(-1)

        const size = new Phaser.Structs.Size(this.width, this.height, Phaser.Structs.Size.ENVELOP)
        size.envelop(camera.width, camera.height)
        this.setDisplaySize(size.width, size.height)
        this.setPipeline('Light2D')
        scene.add.existing(this)
    }
}
