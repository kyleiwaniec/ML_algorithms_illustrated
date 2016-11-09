
import React from 'react';
import ReactDOM from 'react-dom';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Dataset: [],
      Points: [],
    };
  }

  componentDidMount() {
    this._initGradient();
  }

  componentDidUpdate() {
    this.props.gradientDescent.destroy();
    this._initGradient();
  }

  componentWillUnmount() {
    this.props.gradientDescent.destroy();
  }

  _initGradient() {
    const el = ReactDOM.findDOMNode(this);
    this.props.gradientDescent.init(
      el,
      this.state.Dataset,
      this.state.Points,
      (a, b) => this.appendPoint(a, b),
      this.props.costCalculator,
      this.props.width,
      this.props.height,
      this.props.margin
    );
    this.props.gradientDescent.run();
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
