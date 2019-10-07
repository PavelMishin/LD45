import Utils from "../Utils"

export default class Wall extends Phaser.Physics.Arcade.Image {
    constructor(scene, data) {
        // const position = Utils.tiledRectanglePosition(data)
        const texture = data.width > data.height ? 'wall_h' : 'wall_v'
        super(scene, data.x, data.y, texture)
        this.setOrigin(0)
        // scene.physics.world.enable(this)
        this.setPipeline('Light2D')
        // this.body.immovable = true

        this.setDisplaySize(data.width, data.height)

        scene.add.existing(this)
    }
}
