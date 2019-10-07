import Text from './Text'
import Utils from "../Utils"

const STYLE = {
    regular: {
        alpha: 1,
        scale:  0.25,
    },
    hover: {
        alpha: 1,
        scale:  1.04,
        time: 200,
    }
}

export default class ButtonText extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, text = false, enabled = true) {
        super(scene, x, y)

        this.background = new Phaser.GameObjects.Image(scene, 0, 0, texture)
        this.background.setAlpha(STYLE.regular.alpha)
        this.background.setScale(STYLE.regular.scale)
        this.add(this.background)

        this.setSize(this.background.displayWidth, this.background.displayHeight)

        if (text) {
            const label = new Text(scene, 0, 0, text).setOrigin(0.5)
            this.add(label)
        }

        if (enabled) {
            this.setInteractive()
            this.on('pointerover', this.hover)
            this.on('pointerout', this.leave)
        } else {
            Utils.applyDisableStyle(this.background)
        }
        scene.add.existing(this)
    }

    hover() {
        const hoverTweenConfig = {
            targets: this,
            alpha: STYLE.hover.alpha,
            scaleX: STYLE.hover.scale,
            scaleY: STYLE.hover.scale,
            ease: 'Linear',
            duration: STYLE.hover.time,
        }
        this.scene.tweens.add(hoverTweenConfig)
    }


    leave() {
        const leaveTweenConfig = {
            targets: this,
            alpha: STYLE.regular.alpha,
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: STYLE.hover.time,
        }
        this.scene.tweens.add(leaveTweenConfig)
    }

    getBackgroundSize() {
        return {
            width: this.background.displayWidth,
            height: this.background.displayHeight
        }
    }
}
