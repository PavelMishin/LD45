import Background from "./Background"

export default class Preloader{
    constructor(scene) {
        this.backgroundTexutre = 'preloadBg'
        this.containerTexutre = 'loadBarBg'
        this.barTexutre = 'loadBar'
        this.scene = scene
        const center = scene.cameras.main.midPoint

        new Background(scene, this.backgroundTexutre)

        scene.add.image(center.x, center.y, this.containerTexutre)

        this.loadBar = scene.add.image(center.x, center.y, this.barTexutre)
        this.loadBar.setCrop(0, 0, 0, this.loadBar.height)
    }

    setProgress(value) {
        this.loadBar.setCrop(0, 0, this.loadBar.width * value, this.loadBar.height)
    }

    removeTextures() {
        this.scene.textures.remove(this.backgroundTexutre)
        this.scene.textures.remove(this.containerTexutre)
        this.scene.textures.remove(this.barTexutre)
    }
}
