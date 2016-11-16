/* @flow */

import {StreamController} from '../lib/StreamController';
import brain from 'brain';
import fs from 'fs';
import mnist from 'mnist';

export class MnistController extends StreamController {
  run(): void {
    const nodes = this.req.query.nodes;
    console.log('Using ' + nodes + ' nodes');
    const net = new brain.NeuralNetwork({
      hiddenLayers: [nodes],
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
          this._see.send(JSON.stringify(data));
        },
        callbackPeriod: 1
      }
    );
    this._see.send('done');
//    const wstream = fs.createWriteStream('./data/mnistTrain.json');
//    wstream.write(JSON.stringify(net.toJSON(),null,2));
//    wstream.end();
//    console.log('MNIST dataset with Brain.js train done.')
  }
}
