export default class Gun extends Phaser.Physics.Arcade.Image {
    constructor(scene, data) {
        super(scene, data.x, data.y, data.name)
        scene.physics.world.enable(this)
        this.setScale(0.2)
        this.type = data.name
        this.visible = false
        this.setPipeline('Light2D')
        scene.add.existing(this)
    }

    activate() {
        this.visible = true
    }
}
