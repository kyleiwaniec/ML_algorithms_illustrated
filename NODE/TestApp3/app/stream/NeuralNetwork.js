/* @flow */

export class NeuralNetwork {
  weights: Array<Array<Array<number>>>;

  constructor(nn: Object) {
    this.weights = nn.layers.filter((x, i) => i > 0).map(layer => {
      const nodes = Object.keys(layer).length;
      const weightMatrix = new Array(nodes);
      let prevNodes = null;
      for (let i = 0; i < nodes; i++) {
        const prevLayer = layer[i].weights;
        const weigths = new Array(prevNodes || 0);
        if (prevLayer) {
          prevNodes = prevNodes || Object.keys(prevLayer).length;
          for (let j = 0; j < prevNodes; j++) {
            weigths[j] = Number(prevLayer[j]);
          }
        }
        weightMatrix[i] = weigths;
      }
      return weightMatrix;
    });

  }

  getWeigthsForLayer(idx: number): Array<Array<number>> {
    return this.weights[idx];
  }
}
