import Utils from "../Utils"

export default class Sprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, data) {
        super(scene, data.x, data.y, 'enemy')
        scene.physics.world.enable(this)
        this.hp = 8
        const bodyRadius = Math.min(this.displayWidth, this.displayHeight) / 2
        this.body.setCircle(bodyRadius)
        this.body.setFriction(0, 0)

        // this.setScale(0.5)
        this.setPipeline('Light2D')

        scene.add.existing(this)

        scene.events.on('update', this.update, this)
    }

    update() {
        if (!!this.eyes) {
            this.eyes.setPosition(this.x, this.y)
            this.eyes.setAngle(this.angle)
        }

        if (!!this.pointChecker)
            this.pointChecker.setPosition(this.x, this.y)

        if (!this.path || !this.active)
            return

        if (!this.destination) {
            this.destination = this.path.shift()
        }

        if (Phaser.Geom.Circle.Contains(this.pointChecker, this.destination.x, this.destination.y)) {
            if (this.path.length === 0) {
                this.followVictim()
                return
            }
            this.destination = this.path.shift()
            // if (this.path.length > 1) {
            this.scene.time.delayedCall(50, () => {
                this.move(this.destination.x, this.destination.y)
                this.rotateToPoint(this.destination.x, this.destination.y)
            }, [], this)
            // } else {
            //     this.destination = this.path.shift()
            //     this.scene.physics.moveTo(this, this.destination.x, this.destination.y, 70)
            // }
        }
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

    setPath(path) {
        this.path = path
    }

    activate() {
        this.createPointChecker()
        if (!this.eyes) {
            this.eyes = this.scene.add.image(this.x, this.y, 'eyes').setAlpha(0.5)
        }

        this.followVictim()
    }

    followVictim() {
        const victim = Utils.getNearest(this, this.scene.personnel.getChildren())
        if (!victim)
            return

        const path = this.scene.navMesh.findPath({x: this.x, y: this.y}, {x: victim.x, y: victim.y})
        // this.scene.navMesh.debugDrawClear()
        // this.scene.navMesh.debugDrawPath(path, 0xff0000)
        this.setPath(path)
    }

    move(x, y, onComplete = null) {
        const speed = 0.05
        const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y)
        const duration = distance / speed

        this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            ease: 'Linear',
            duration: duration,
            onComplete: onComplete,
            onCompleteScope: this
        })
        this.rotateToPoint(x, y)
    }

    getHit(damage) {
        this.hp -= damage
        if (this.hp <= 0) {
            this.destroy(true)
            this.eyes.destroy(true)
        }
    }

    createPointChecker() {
        this.pointChecker = new Phaser.Geom.Circle(this.x, this.y, 25)
        // const graphics = this.scene.add.graphics({lineStyle: {width: 2, color: 0x00ff00}, fillStyle: {color: 0xff0000}})
        // graphics.strokeCircleShape(this.pointChecker)
    }

    rotateToPoint(x, y) {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y)
        this.setAngle(Phaser.Math.RadToDeg(angle) + 90)
    }
}
