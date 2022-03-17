/* eslint-disable prettier/prettier */
import React from 'react';
import {Finger} from './renderers';

const MoveFinger = (entities, {touches}) => {
  touches
    .filter(t => t.type === 'move')
    .forEach(t => {
      let finger = entities[t.id];
      if (finger && finger.position) {
        finger.position = [
          finger.position[0] + t.delta.pageX,
          finger.position[1] + t.delta.pageY,
        ];
      }
    });

  return entities;
};

let id = 0;
const CreateFinger = (entities, {touches}) => {
  touches.filter(t => t.type === 'press').forEach(t => {
    console.log(t.event.target);
    entities[id++] = { position: [t.event.locationX, t.event.locationY], renderer: <Finger />};
  });

  return entities;
};

const DeleteFinger = (entities, {touches}) => {
  touches.filter(t => t.type === 'long-press').forEach(t => {
    delete entities[--id];
  });

  return entities;
};

export {MoveFinger, CreateFinger, DeleteFinger};
