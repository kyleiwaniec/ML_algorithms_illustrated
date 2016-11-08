/** @jsx React.DOM */

var React = require('react');

require('./Chart.less')

var Chart = React.createClass({
  getInitialState: function() {
    return {
      Dataset: [],
      Points: [],
    };
  },

  getDefaultProps: function() {
    return {
      gradientDescent: require('./d3GradientDescent.js'),
    };
  },

  componentDidMount: function() {
    this._initGradient();
  },

  componentDidUpdate: function() {
    this.props.gradientDescent.destroy();
    this._initGradient();
  },

  componentWillUnmount: function() {
    this.props.gradientDescent.destroy();
  },

  _initGradient: function() {
    var el = this.getDOMNode();
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
  },

  render: function() {
    return (
      <div className="svg" />
    );
  },

  appendPoint(pointElem, datasetElem) {
    var Dataset = this.state.Dataset;
    var Points = this.state.Points;
    Dataset.push(datasetElem);
    Points.push(pointElem);
    this.setState({Dataset: Dataset, Points: Points});
  }
});

module.exports = Chart;
