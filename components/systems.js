import Matter from "matter-js";


export const TapHandler = (entities, { touches, time }) => {
    const { physics, bird } = entities;
    let engine = physics.engine;
    let birdBody = bird.body;

    const touchStart = touches.filter(t => t.type === "start");
    if (touchStart.length) {
        Matter.Body.setVelocity(birdBody, { x: 0, y: -10 });
    }
    Matter.Engine.update(engine, time.delta);

    return entities;
};