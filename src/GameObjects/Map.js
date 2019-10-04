import Utils from "../Utils"

export default class Map {
    constructor(scene, level, scale = 1) {
        const map = scene.make.tilemap({key: 'level'})
        const tilesetMain = map.addTilesetImage('main')
        const main = map.createStaticLayer('main', tilesetMain, 0, 0).setCullPadding(0, 0)
        main.setCollisionByExclusion([-1, 1])
        // scene.matter.world.convertTilemapLayer(main)
        Utils.rotateTileBodies(main)

        return map
    }

}
