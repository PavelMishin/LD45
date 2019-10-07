import Utils from "../Utils"

const RELOAD_TIME = 500

export default class Hero extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, data) {
        super(scene, data.x, data.y, 'hero')
        scene.physics.world.enable(this)
        this.weapon = null
        this.reloadTime = 0
        this.fighting = false
        this.sleep = true
        this.idle = 0

        const bodyRadius = this.displayHeight / 2
        this.body.setCircle(bodyRadius, bodyRadius / 2)
        this.body.setFriction(0, 0)
        this.createFieldOfView()
        this.setPipeline('Light2D')
        scene.add.existing(this)

        scene.events.on('update', this.update, this)
    }

    update(time, delta) {
        if (this.sleep || !this.active)
            return

        const moving = !!this.moveTween && this.moveTween.isPlaying()

        // const moving = this.body.speed > 0
        if (moving) {
            this.idle = 0
        } else {
            this.idle += delta
            if (this.idle > 1200) {
                this.idle = 0
                this.walk()
                return
            }
        }

        if (this.fieldOfView)
            this.fieldOfView.setPosition(this.x, this.y)

        if (this.pointChecker)
            this.pointChecker.setPosition(this.x, this.y)


        if (!this.destination && this.path && this.path.length > 0) {
            this.destination = this.path.shift()
        } else if (this.destination && Phaser.Geom.Circle.Contains(this.pointChecker, this.destination.x, this.destination.y)) {
            if (this.path && this.path.length > 0)
                this.destination = this.path.shift()
            else
                this.destination = null
            if (this.path && this.path.length > 0)
            this.searchWeapon()
        }

        if ((this.destination && this.canGo(this.destination.x, this.destination.y)) && !moving) {
            // this.scene.tweens.killTweensOf(this)
            this.move(this.destination.x, this.destination.y)
        }
    }

    createFieldOfView() {
        this.fieldOfView = this.scene.add.ellipse(0, 0, 400, 400)
        this.scene.physics.world.enable(this.fieldOfView)
        this.fieldOfView.body.setCircle(200)
        this.fieldOfView.host = this
    }

    createPointChecker() {
        this.pointChecker = new Phaser.Geom.Circle(this.x, this.y, 25)
        // const graphics = this.scene.add.graphics({lineStyle: {width: 2, color: 0x00ff00}, fillStyle: {color: 0xff0000}})
        // graphics.strokeCircleShape(this.pointChecker)
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
        this.searchWeapon()
        this.sleep = false
    }

    searchWeapon(light = null) {
        const guns = this.scene.guns.getChildren().filter((gun) => gun.visible)
        if (guns.length === 0 || !!this.weapon) {
            if (!!light) {
                let path = this.scene.navMesh.findPath({x: this.x, y: this.y}, {x: light.x, y: light.y})
                this.scene.navMesh.debugDrawClear()
                this.scene.navMesh.debugDrawPath(path, 0xffd900)
                // const x = path[0].x
                // const y = path[0].y
                // const canGo = Utils.checkCirclesContain(this.scene.lightZones, x, y) && this.scene.checkNavmesh(x, y)
                // if (canGo) {
                //     this.setPath(path)
                // }
                this.setPath(path)
            }
            return
        }

        const weapon = Utils.getNearest(this, guns)
        let path = this.scene.navMesh.findPath({x: this.x, y: this.y}, {x: weapon.x, y: weapon.y})
        this.scene.navMesh.debugDrawClear()
        this.scene.navMesh.debugDrawPath(path, 0xffd900)
        path.shift()
        this.setPath(path)
    }

    canGo(x, y) {
        return Utils.checkCirclesContain(this.scene.lightZones, x, y) && this.scene.checkNavmesh(x, y)
    }

    getGun(type) {
        this.weapon = type
        this.setTexture('heroArmed')
    }

    reloadWeapon() {
        this.scene.tweens.add({
            targets: this,
            reloadTime: {from: RELOAD_TIME, to: 0},
            duration: RELOAD_TIME
        })

        if (!this.fighting) {
            this.fighting = true
            this.scene.time.delayedCall(1000, () => {
                this.fighting = false
            }, [], this)
        }
    }

    move(x, y, onComplete = null) {
        const speed = 0.06
        const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y)
        const duration = distance / speed

        this.moveTween = this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            ease: 'Linear',
            duration: duration,
            onComplete: onComplete,
            onCompleteScope: this,
            // completeDelay: 200
        })
        this.rotateToPoint(x, y)
    }

    walk() {
        if (!this.active)
            return

        // if (this.moveTween && this.moveTween.isPlaying())
        //     return

        const distance = this.weapon ? 50 : 25
        const moveVector = new Phaser.Math.Vector2(Math.random() - 0.5, Math.random() - 0.5)
        moveVector.scale(distance / moveVector.length())

        const x = this.x + moveVector.x
        const y = this.y + moveVector.y

        if (this.canGo(x, y)) {
            this.move(x, y)
        }
    }

    rotateToPoint(x, y) {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y)
        this.setAngle(Phaser.Math.RadToDeg(angle) + 90)
    }
}
