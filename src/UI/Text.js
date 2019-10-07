const FONT = {
    fontFamily: 'Orbitron',
    fontSize: '32px',
    color: '#9a9ea0'
}

export default class Text extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text) {
        super(scene, x, y, text, FONT)

        this.setOrigin(0.5)
        scene.add.existing(this)
    }
}
