import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";

import { Constants } from './utils/constants';
import { TapHandler } from './components/systems';
import { Bird } from './components/Bird';
import { Floor } from './components/Floor';


function Game() {
  const setupWorld = () => {
    let engine = Matter.Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 2 }
    });
    let world = engine.world;
    let bird = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      Constants.BIRD_WIDTH,
      Constants.BIRD_HEIGHT
    );

    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    let ceiling = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );


    Matter.World.add(world, [bird, floor]);
    return {
      physics: { engine: engine, world: world },
      floor: { body: floor, renderer: Floor },
      ceiling: { body: ceiling, renderer: Floor },
      bird: { body: bird, renderer: Bird },
    }
  }

  return (
    <GameEngine
      style={styles.container}
      systems={[TapHandler]}
      entities={setupWorld()}>
      {/* {
        1: { position: [40, 200], renderer: <Finger /> },
        2: { position: [100, 200], renderer: <Finger /> },
        3: { position: [160, 200], renderer: <Finger /> },
        4: { position: [220, 200], renderer: <Finger /> },
        5: { position: [280, 200], renderer: <Finger /> }
      } */}
      <StatusBar hidden={true} />
    </GameEngine>
  );
}

const styles = StyleSheet.create({
});

export default Game;
