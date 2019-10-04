const FONT = {
    fontFamily: 'Comfortaa',
    fontSize: '20px',
    color: '#010312'
}

export default class Text extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text) {
        super(scene, x, y, text, FONT)

        this.setOrigin(0.5)
        scene.add.existing(this)
    }
}
