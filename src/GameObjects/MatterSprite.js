const Matter = Phaser.Physics.Matter.Matter

export default class MatterSprite extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        const shape = scene.cache.json.get('spriteShape')

        super(scene.matter.world, x, y, 'sprite', '', {shape: shape.x})

        // Matter.Body.scale(this.body, 0.5, 0.5)

        this._createAnimations()

        this.on('animationcomplete', this._handleAnimationComplete, this)
        this.on('animationstart', this._handleAnimationStart, this)
        this.on('animationrepeat', this._handleAnimationRepeat, this)

        scene.add.existing(this)
    }


    _handleAnimationComplete(animation, frame) {
        switch (animation.key) {
            case '':

                break
        }
    }

    _handleAnimationStart(animation) {
        switch (animation.key) {
            case '':

                break
        }
    }

    _handleAnimationRepeat(animation) {
        switch (animation.key) {
            case 'idle':

                break
        }
    }

    _createAnimations() {
        this._createAnimation('', 1, 12)
    }

    _createAnimation(name, framesNumber, rate, repeat = false, prefix = null) {
        const frames = this.scene.anims.generateFrameNames('', {
            start: 1,
            end: framesNumber,
            prefix: (prefix ? prefix : name) + '/',
        })
        const animationConfig = {
            key: name,
            frames: frames,
            repeat: repeat ? -1 : 0,
            frameRate: rate
        }
        this.scene.anims.create(animationConfig)
    }
}
