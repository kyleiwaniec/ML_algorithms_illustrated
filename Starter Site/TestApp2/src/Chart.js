/** @jsx React.DOM */

var React = require('react');

var GradientDescent = require('./d3GradientDescent');

require('./Chart.less')

var Chart = React.createClass({
  componentDidMount: function() {
    var el = this.getDOMNode();
    GradientDescent.init(el);
    GradientDescent.run();
  },

  render: function() {
    return (
      <div className="svg" />
    );
  }
});

module.exports = Chart;
