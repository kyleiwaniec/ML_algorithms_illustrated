/** @jsx React.DOM */

var Chart = require('./Chart.js');
var React = require('react');

require('./App.less');

var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <Chart
          costCalculator={require('./SimpleCostCalculator.js')}
          width={600}
          height={600}
          margin={50}
        />
      </div>
    );
  }
});

module.exports = App;
