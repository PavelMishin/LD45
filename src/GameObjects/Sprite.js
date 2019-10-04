export default class Sprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'spriteSheet', '')

        scene.add.existing(this)
    }

    update() {
    }

    _createAnimations() {
        const frames = this.scene.anims.generateFrameNames('', {
            start: 1,
            end: 3,
        })

        const animationConfig = {
            key: '',
            frames: frames,
            repeat: 0,
            frameRate: 13
        }
        this.scene.anims.create(animationConfig)
    }

}
