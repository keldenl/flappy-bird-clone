import Matter from "matter-js";

import { Constants } from "../utils/constants";
import { Pipe } from './Pipe';

const createPipe = (world, entities, x) => {
    const availArea = 0.8; // percent of available playing area
    const maxLength = Constants.MAX_HEIGHT - Constants.BIRD_HEIGHT - 50;
    const [minY, maxY] = [1 - availArea, availArea].map(playArea => maxLength * playArea);
    const length = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    const pipe = Matter.Bodies.rectangle(
        x + Constants.PIPE_WIDTH,
        length / 2,
        Constants.PIPE_WIDTH,
        length,
        { isStatic: true }
    );

    Matter.World.add(world, [pipe]);
    entities["pipe"] = {
        body: pipe, renderer: Pipe
    }
}

export const TapHandler = (entities, { touches, time }) => {
    const { physics, bird } = entities;
    let engine = physics.engine;
    let birdBody = bird.body;

    const touchStart = touches.filter(t => t.type === "start");
    if (touchStart.length) {
        Matter.Body.setVelocity(birdBody, { x: 0, y: -10 });
    }
    if (!entities.pipe) {
        createPipe(physics.world, entities, Constants.MAX_WIDTH);
    } else {
        const pipe = entities.pipe.body;
        Matter.Body.translate(pipe, { x: -4, y: 0 });
        if (pipe.position.x < 0 - Constants.PIPE_WIDTH / 2) {
            Matter.World.remove(physics.world, [pipe]);
            delete entities.pipe;
        }
    }

    Matter.Engine.update(engine, time.delta);
    return entities;
};