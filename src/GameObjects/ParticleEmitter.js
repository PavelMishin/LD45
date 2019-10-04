export default class ParticleEmitter extends Phaser.GameObjects.Particles.ParticleEmitterManager {
    constructor(scene, x, y, min, max, rotation, emitZone, deathZone) {
        super(scene, 'spriteSheet')
        const config = {
            frame: ['frame1', 'frame2'],
            rotate: rotation,
            x: x,
            y: y,
            alpha: { start: 0.5, end: 1},
            speedX: { min: min.x, max: max.x * 1.5 },
            speedY: { min: min.y, max: max.y * 1.5 },
            lifespan: 1000,
            frequency: 0.5,
            quantity: 3,
            scale: { start: 1, end: 0.4 },
            emitZone: { type: 'random', source: emitZone },
            deathZone: { type: 'onLeave', source: deathZone }
        }

        this.createEmitter(config)


        scene.add.existing(this)
    }
}
