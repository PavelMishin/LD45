const STYLE = {
    regular: {
        alpha: 1,
        scale:  1,
    },
    hover: {
        alpha: 1,
        scale:  1.04,
        time: 200,
    },
    click: {
        scale: 0.95,
        time: 200
    }
}

export default class ButtonImage extends Phaser.GameObjects.Image {
    constructor(scene, x, y, callback, texture, textureToggled = false, onUp = false) {
        super(scene, x, y, 'images', texture)

        this.textureMain = texture
        this.textureToggled = textureToggled
        this.active = false
        this.callback = callback
        this.onUp = false

        this.setAlpha(STYLE.regular.alpha)
        this.setScale(STYLE.regular.scale)
        this.setOrigin(0)

        this.setInteractive()
        this.on('pointerover', this.hover)
        this.on('pointerout', this.leave)
        this.on('pointerdown', this.click)

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
            scaleX: STYLE.regular.scale,
            scaleY: STYLE.regular.scale,
            ease: 'Linear',
            duration: STYLE.hover.time,
        }
        this.scene.tweens.add(leaveTweenConfig)
    }

    click() {
        const clickTweenConfig = {
            targets: this,
            scaleX: STYLE.click.scale,
            scaleY: STYLE.click.scale,
            ease: 'Linear',
            duration: STYLE.click.time,
            yoyo: true
        }
        this.scene.tweens.add(clickTweenConfig)

        this.toggle()
        if (this.onUp) {
            this.once('pointerup', this.callback)
        } else {
            this.callback()
        }
    }

    toggle() {
        if (typeof this.textureToggled !== 'string')
            return

        this.active = !this.active
        const texture = this.active ? this.textureToggled : this.textureMain
        this.setFrame(texture)
    }
}
