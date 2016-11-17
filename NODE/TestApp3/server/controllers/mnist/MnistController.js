/* @flow */

import {StreamController} from '../lib/StreamController';
import brain from '../../brain/lib/neuralnetwork';
import fs from 'fs';
import mnist from 'mnist';

export class MnistController extends StreamController {
  run(): void {
    const nodes = this.req.query.nodes.split(' ');
    console.log('Using ' + nodes.join(' ') + ' nodes');
    const net = new brain.NeuralNetwork({
      hiddenLayers: nodes,
    });
    const set = mnist.set(2000, 0);
    const trainingSet = set.training;
    //const testSet = set.test;

    net.train(trainingSet,
      {
        errorThresh: 0.05,  // error threshold to reach
        iterations: 200,   // maximum training iterations
        log: true,           // console.log() progress periodically
        logPeriod: 1,       // number of iterations between logging
        learningRate: 0.3,    // learning rate
        callback: data =>  {
          this._see.send(data);
        },
        callbackPeriod: 1
      }
    );
    this._see.send('done');
  }
}
