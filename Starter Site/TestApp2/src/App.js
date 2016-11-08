/** @jsx React.DOM */

var Chart = require('./Chart.js');
var React = require('react');

require('./App.less');

var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <Chart />
      </div>
    );
  }
});

module.exports = App;
