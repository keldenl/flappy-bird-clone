import Matter from "matter-js";

import { Constants } from "../utils/constants";
import { Pipe } from './Pipe';

const createPipe = (world, entities, x) => {
    const availArea = 0.8; // percent of available playing area
    const maxLength = Constants.MAX_HEIGHT - Constants.BIRD_HEIGHT - 50;
    const maxHeight = maxLength / 2;
    const [minY, maxY] = [1 - availArea, availArea].map(playArea => maxHeight * playArea);
    const randY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    const getPipe = (y, isTop = true) =>
        Matter.Bodies.rectangle(
            x + Constants.PIPE_WIDTH,
            isTop ? y : y * 3,
            Constants.PIPE_WIDTH,
            isTop ? y * 2 : y,
            { isStatic: true }
        );
    const topPipe = getPipe(randY);
    const botPipe = getPipe(randY, false);

    Matter.World.add(world, [topPipe, botPipe]);
    entities["topPipe"] = {
        body: topPipe, renderer: Pipe
    }
    entities["botPipe"] = {
        body: botPipe, renderer: Pipe
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
    if (!entities.topPipe || !entities.botPipe) {
        createPipe(physics.world, entities, Constants.MAX_WIDTH);
    } else {
        const { topPipe, botPipe } = entities;
        Matter.Body.translate(topPipe.body, { x: -4, y: 0 });
        Matter.Body.translate(botPipe.body, { x: -4, y: 0 });
        if (topPipe.body.position.x < 0 - Constants.PIPE_WIDTH / 2) {
            Matter.World.remove(physics.world, [topPipe]);
            Matter.World.remove(physics.world, [botPipe]);
            delete entities.topPipe;
            delete entities.botPipe;
        }
    }

    Matter.Engine.update(engine, time.delta);
    return entities;
};