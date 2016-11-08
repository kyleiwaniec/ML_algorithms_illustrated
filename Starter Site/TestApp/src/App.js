/** @jsx React.DOM */

var Chart = require('./Chart.js');
var React = require('react');

require('./App.less');

var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  {id: 'asdfasdf', x: 11, y: 49, z: 9},
];

var App = React.createClass({
  getInitialState: function() {
    return {
      data: sampleData,
      domain: {x: [0, 30], y: [0, 100]}
    };
  },

  render: function() {
    return (
      <div className="App">
      <Chart
      data={this.state.data}
      domain={this.state.domain}
      />
      </div>
    );
  }
});

module.exports = App;
