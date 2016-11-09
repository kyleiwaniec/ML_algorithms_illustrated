
import React from 'react';
import ReactDOM from 'react-dom';
import {GradientDescent} from './d3/GradientDescent.js';

export default class Chart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Dataset: [],
      Points: [],
      gradientDescent: new GradientDescent(),
    };
  }

  componentDidMount() {
    this._initGradient();
  }

  componentDidUpdate() {
    this.state.gradientDescent.destroy();
    this._initGradient();
  }

  componentWillUnmount() {
    this.state.gradientDescent.destroy();
  }

  _initGradient() {
    const el = ReactDOM.findDOMNode(this);
    this.state.gradientDescent.init(
      el,
      this.state.Dataset,
      this.state.Points,
      (a, b) => this.appendPoint(a, b),
      this.props.costCalculator,
      this.props.width,
      this.props.height,
      this.props.margin
    );
    this.state.gradientDescent.run();
  }

  render() {
    return (
      <div className="svg" />
    );
  }

  appendPoint(pointElem, datasetElem) {
    const Dataset = this.state.Dataset;
    const Points = this.state.Points;
    Dataset.push(datasetElem);
    Points.push(pointElem);
    this.setState({Dataset: Dataset, Points: Points});
  }
}
