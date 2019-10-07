export default class Light {
    constructor(scene, x, y) {
        const radius = 200
        scene.lights.addLight(x, y, radius).setIntensity(15).setColor(0x401111)
        this.lightZone = new Phaser.Geom.Circle(x, y, radius - 30)
        // const graphics = scene.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }})
        // graphics.strokeCircleShape(this.lightZone)

        return this
    }

    update() {

    }
}
