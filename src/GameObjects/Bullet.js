export default class Image extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, targetX, targetY, type) {
        super(scene, x, y, 'bullet')
        this.damage = type === 'gun' ? 2 : 1
        scene.physics.world.enable(this)
        this.setScale(0.1)
        scene.physics.moveTo(this, targetX, targetY, 500)
        const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY)
        this.setAngle(Phaser.Math.RadToDeg(angle + 90))

        scene.add.existing(this)
    }
}
