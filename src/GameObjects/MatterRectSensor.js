import Utils from "../Utils"

export default class MatterRectSensor extends Phaser.Physics.Matter.Matter.Bodies.rectangle {
    constructor(scene, rect, name = 'sensor') {
        const position = Utils.tiledRectanglePosition(rect)
        const options = {
            angle: Phaser.Math.DegToRad(rect.rotation),
            isSensor: true,
            isStatic: true,
            objectName: name
        }

        super(position.x, position.y, rect.width, rect.height, options)

        scene.matter.world.add(this)
    }
}
