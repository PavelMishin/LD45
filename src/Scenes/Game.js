import Light from "../GameObjects/Light"
import Floor from "../GameObjects/Floor"
import Indicator from "../GameObjects/Indicator"
import Hero from "../GameObjects/Hero"
import Enemy from "../GameObjects/Enemy"
import Wall from "../GameObjects/Wall"
import Gun from "../GameObjects/Gun"
import Utils from "../Utils"
import Bullet from "../GameObjects/Bullet"
import Text from "../UI/Text"
import ButtonText from "../UI/ButtonText"

const BATTERY_TIME = 2000

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    init(data) {

    }

    preload() {

    }

    create() {
        this.data.set('status', 'init')
        this.inputAvailable = true
        this._createLevel()
        this._createLight()
        this._createGameObjects()
        // this._cameraSetup()
        this._initInput()
        this._handleCollisions()
        this._createIntro()
    }

    update(time, delta) {
    }

    /*
        INTRO
     */
    _createIntro() {
        const camera = this.cameras.main
        this.introText = this.add.group()
        this.introText.add(new Text(this, camera.centerX, camera.height / 16 * 6, 'you are in charge of the lighting system of this space station').setAlpha(0))
        this.introText.add(new Text(this, camera.centerX, camera.height / 16 * 7, 'find the crew and bring them to weapon').setAlpha(0))
        this.introText.add(new Text(this, camera.centerX, camera.height / 16 * 8, 'left click to turn on the light').setAlpha(0))
        this.introText.add(new Text(this, camera.centerX, camera.height / 16 * 9, 'arrows points to crew members').setAlpha(0))
        this.introText.add(new Text(this, 40, camera.height / 16 * 15, 'p.s.: the crew is just wake up after cryosleep, so they can be dumb sometimes').setOrigin(0).setAlpha(0))
        this.introText.getChildren().forEach((text) => {Utils.appear(text)})
    }

    _createFullscreen() {
        const camera = this.cameras.main
        this.fullscreen = this.add.group()
        this.fullscreen.add(new Text(this, camera.centerX, camera.height / 16 * 6, 'enable fullscreen?').setAlpha(0))
        this.fullscreen.add(new ButtonText(this, camera.centerX - 200, camera.centerY, 'win_bg', 'yes').on('pointerdown', () => {this.scale.startFullscreen()}, this))
        this.fullscreen.add(new ButtonText(this, camera.centerX + 200, camera.centerY, 'lose_bg', 'no'))
        this.fullscreen.getChildren().forEach((item) => {Utils.appear(item)})
    }

    /*
        LEVELS
     */
    _createLevel() {
        this.map = this.make.tilemap({key: 'level'})
        this.floor = new Floor(this)

        this.walls = this.add.group()
        const wallObjects = this.map.filterObjects('objects', (object) => object.type === 'wall')
        wallObjects.forEach((wallObject) => {
            this.walls.add(new Wall(this, wallObject))
        })

        const objectLayer = this.map.getObjectLayer("navmesh");
        this.navMesh = this.navMeshPlugin.buildMeshFromTiled("mesh", objectLayer, 12.5)
        // this.navMesh.enableDebug()
    }

    /*
        Light
     */
    _createLight() {
        this.lightZones = []
        this.lights.enable().setAmbientColor(0x030303)
        this.lights.addLight(0, 0, 1).setIntensity(15).setColor(0x111111)

        this.add.image(400, 460, 'fl').setPipeline('Light2D')
    }

    /*
        GAME OBJECTS
     */
    _createGameObjects() {
        this.enemies = this.add.group()
        const alienObjects = this.map.filterObjects('objects', (object) => object.name === 'alien')
        alienObjects.forEach((alienObject) => {
            this.enemies.add(new Enemy(this, alienObject))
        })

        this.personnel = this.add.group()
        const personnelObjects = this.map.filterObjects('objects', (object) => object.name === 'personnel')
        personnelObjects.forEach((personnelObject) => {
            this.personnel.add(new Hero(this, personnelObject))
        })

        this.guns = this.add.group()
        const gunObjects = this.map.filterObjects('objects', (object) => object.name === 'gun' || object.name === 'miniGun')
        gunObjects.forEach((gunObject) => {
            this.guns.add(new Gun(this, gunObject))
        })

        this.bullets = this.add.group()

        this.navmeshes = []
        const meshObjects = this.map.filterObjects('navmesh', (object) => true)
        meshObjects.forEach((mesh) => {
            this.navmeshes.push(new Phaser.Geom.Rectangle(mesh.x, mesh.y, mesh.width, mesh.height))
        })
    }

    checkNavmesh(x, y) {
        const result = this.navmeshes.find((zone) => {
            return Phaser.Geom.Rectangle.Contains(zone, x, y)
        })
        return !!result
    }


    /*
        PHYSICS
     */
    _handleCollisions() {
        // this.physics.add.collider(this.walls, this.personnel)
        // this.physics.add.collider(this.walls, this.enemies)
        this.physics.add.collider(this.enemies, this.personnel, this._enemyCatchPersonnel, null, this)
        this.physics.add.overlap(this.bullets, this.enemies, this._enemyAtacked, null, this)
        this.physics.add.overlap(this.personnel, this.guns, this._personnelGetGun,null, this)
    }

    _enemyCatchPersonnel(enemy, man) {
        this.tweens.killTweensOf(man)
        this.personnel.remove(man, true, true)

        if (this.personnel.countActive() <= 0) {
            this.lose()
        }
    }

    _personnelGetGun(man, gun) {
        // man.body.stop()
        man.getGun(gun.type)
        this.guns.remove(gun, true, true)
        this.physics.add.overlap(man.fieldOfView, this.enemies, this._personnelAtack, null, this)

        const activeEnemies = this.enemies.getChildren().filter((enemy) => !!enemy.eyes)
        if (activeEnemies.length === 0) {
            this.enemies.getChildren()[0].activate()
        }
    }

    _personnelAtack(fieldOfView, enemy) {
        if (fieldOfView.host.reloadTime > 0)
            return

        this.tweens.killTweensOf(fieldOfView.host)
        const bullet = new Bullet(this, fieldOfView.x, fieldOfView.y, enemy.x, enemy.y, fieldOfView.host.weapon)
        this.bullets.add(bullet)
        fieldOfView.host.reloadWeapon()
        fieldOfView.host.rotateToPoint(enemy.x, enemy.y)
    }

    _enemyAtacked(bullet, enemy) {
        this.bullets.remove(bullet, true, true)
        enemy.getHit(bullet.damage)

        if (this.enemies.countActive() <= 0) {
            this.win()
        }
    }

    /*
        INTERFACE
     */
    _createHUD() {
        this.scene.launch('HUD')
        this.HUD = this.scene.get('HUD')
    }


    /*
        CAMERA
     */
    _cameraSetup() {

    }

    fadeIn() {
        this.cameras.main.fadeIn(300)
    }

    fadeOut() {
        this.cameras.main.fadeOut(300)
    }


    /*
        INPUT
     */
    _initInput() {
        this.input.on('pointerdown', this._handlePointerDown, this)

        const spaceButton = this.input.keyboard.addKey('R')
        spaceButton.on('down', () => {
            this.restartLaunch()
        }, this)
    }

    _handlePointerDown(pointer) {
        if (!this.inputAvailable)
            return

        const gameStatus = this.data.get('status')
        switch (gameStatus) {
            case 'init':
                this.data.set('status', 'fullscreen')
                this.introText.getChildren().forEach((text) => {Utils.disappear(text)})
                this.time.delayedCall(400, this._createFullscreen, [], this)
                break
            case 'fullscreen':
                this.data.set('status', 'started')
                this.fullscreen.getChildren().forEach((text) => {Utils.disappear(text)})
                this.time.delayedCall(500, () => {this.fullscreen.clear(true, true)}, [], this)
                break
            case 'started':
                if (Utils.checkCirclesContain(this.lightZones, pointer.x, pointer.y))
                    return

                const light = new Light(this, pointer.x, pointer.y)
                this.personnel.getChildren().forEach((man) => {
                    if (Phaser.Geom.Circle.Contains(light.lightZone, man.x , man.y)) {
                        man.activate()
                    }
                    if (man.sleep) {
                        const angle = Phaser.Math.Angle.Between(pointer.x, pointer.y, man.x, man.y)
                        const arrow = this.add.image(pointer.x, pointer.y, 'arrow')
                            .setAlpha(0)
                            .setOrigin(0, 0.5)
                            .setAngle(Phaser.Math.RadToDeg(angle))
                        Utils.appear(arrow)
                        Utils.disappear(arrow, 500, 1500)
                    }
                })

                this.enemies.getChildren().forEach((enemy) => {
                    if (Phaser.Geom.Circle.Contains(light.lightZone, enemy.x , enemy.y)) {
                        enemy.activate()
                    }
                })

                this.guns.getChildren().forEach((gun) => {
                    if (Phaser.Geom.Circle.Contains(light.lightZone, gun.x , gun.y)) {
                        gun.activate()
                    }
                })

                this.personnel.getChildren().forEach((man) => {
                    if (!man.sleep)
                        man.searchWeapon(light.lightZone)
                })

                new Indicator(this, BATTERY_TIME)
                this.toogleInput()
                this.lightZones.push(light.lightZone)
                this.time.delayedCall(BATTERY_TIME, this.toogleInput, [], this)
                break
        }
    }

    /*
        SOUND
     */


    /*
        STATES
     */
    toogleInput() {
        this.inputAvailable = !this.inputAvailable
    }

    lose() {
        const camera = this.cameras.main
        this.data.set('status', 'lose')

        const button = new ButtonText(this, camera.centerX, camera.centerY, 'lose_bg', 'all crew members are dead!')
        button.background.setScale(0.7)
    }

    win() {
        const camera = this.cameras.main
        this.data.set('status', 'win')

        const button = new ButtonText(this, camera.centerX, camera.centerY, 'win_bg', 'all aliens is dead!')
        button.background.setScale(0.7)
    }

    restartLaunch() {
        this.data.set('status', 'restarted')
        this.cameras.main.fadeOut(250)
        this.cameras.main.once("camerafadeoutcomplete", this._restart, this)
    }

    _restart() {
        // this.scene.stop('HUD')
        const restartData = {}
        this.scene.restart(restartData)
        // this.scene.restart('HUD')
    }
}
