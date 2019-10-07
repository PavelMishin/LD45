const Matter = Phaser.Physics.Matter.Matter

export default class Utils {
    constructor() {
    }

    static rotateTileBodies(layer) {
        layer.layer.data.forEach((row) => {
            row.filter((tile) => tile && tile.physics.matterBody) //&& tile.physics.matterBody.body.label === 'Body') // Tiles with editing collision
                .filter((tile) => tile.rotation > 0 || tile.flipX || tile.flipY)
                .forEach((tile) => {
                    const matterBody = tile.physics.matterBody.body
                    const rotationPoint = {
                        x: tile.pixelX + tile.width / 2,
                        y: tile.pixelY + tile.height / 2,
                    }

                    if (tile.rotation > 0) {
                        const angle = tile.rotation
                        Matter.Body.rotate(matterBody, angle, rotationPoint)
                    }

                    if (tile.flipX || tile.flipY) {
                        let scaleX = tile.flipX ? -1 : 1
                        let scaleY = tile.flipY ? -1 : 1
                        Matter.Body.scale(matterBody, scaleX, scaleY, rotationPoint);
                    }
                })
        })
    }

    static toggleFullscreen() {
        this.scale.toggleFullscreen()
    }

    static rotatePoint(origin = {x: 0, y: 0}, point, angle = 0) {
        if (!point)
            return null

        if (!angle) {
            return point
        }

        const radians = Phaser.Math.DegToRad(angle)
        const cos = Math.cos(radians)
        const sin = Math.sin(radians)

        const newX = (cos * (point.x - origin.x)) + (sin * (point.y - origin.y)) + origin.x
        const newY = (cos * (point.y - origin.y)) - (sin * (point.x - origin.x)) + origin.y
        const newPoint = {
            x: Math.round(newX),
            y: Math.round(newY)
        }
        return newPoint
    }

    static tiledRectanglePosition(rect) {
        const tiledOrigin = {
            x: rect.x,
            y: rect.y
        }
        const phaserOrigin = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
        }
        const centerAfterRotation = this.rotatePoint(tiledOrigin, phaserOrigin, -rect.rotation)

        return centerAfterRotation
    }

    static appear(target, time = 500, delay = 0) {
        if (typeof target !== 'object' || !target.scene)
            return

        const tweenConfig = {
            targets: target,
            alpha: 1,
            ease: 'Linear',
            duration: time,
            delay: delay
        }
        target.scene.tweens.add(tweenConfig)
    }

    static disappear(target, time = 500, delay = 0) {
        if (typeof target !== 'object' || !target.scene)
            return

        const tweenConfig = {
            targets: target,
            alpha: 0,
            ease: 'Linear',
            duration: time,
            delay: delay
        }
        target.scene.tweens.add(tweenConfig)
    }

    static copyDeepObject(source) {
        if (typeof source !== 'object' || source === null) {
            return source
        }

        if (Array.isArray(source)) {
            return Utils.copyArray(source)
        }
        return Utils.copyObject(source)
    }

    static copyObject(source) {
        const result = {}
        Object.keys(source).forEach((key) => {
            const value = source[key]
            result[key] = Utils.copyDeepObject(value)
        }, {})
        return result
    }

    static copyArray(source) {
        return source.map((value) => {
            return Utils.copyDeepObject(value)
        })
    }


    static applyDisableStyle(object) {
        if (typeof object.setTint !== 'function')
            return

        object.setTint(0x666666)
    }

    static getNearest(object, objectsArray) {
        let nearest
        let minDistance = 0
        objectsArray.forEach((item) => {
            const distance = Phaser.Math.Distance.Between(object.x, object.y, item.x, item.y)
            if (minDistance === 0 || distance < minDistance) {
                minDistance = distance
                nearest = item
            }
        })
        return nearest
    }

    static checkCirclesContain(circles, x, y) {
        const result = circles.find((zone) => {
            return Phaser.Geom.Circle.Contains(zone, x, y)
        })
        return !!result
    }
}
