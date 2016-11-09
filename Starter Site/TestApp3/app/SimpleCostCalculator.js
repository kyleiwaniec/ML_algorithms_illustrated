var SimpleCostCalculator = {
  getCost: function(theta0, theta1, Dataset) {
    var cost = 0;
    for(var i = 0 ; i < Dataset.length ;i++) {
      cost += Math.pow((Dataset[i].x * theta1 + theta0 - Dataset[i].y), 2);
    }

    return cost / 2 / Dataset.length;
  },

  hypothesisFunctionLabel: 'Hypothesis Function: Ho(x)=theta0 + theta1 * x',

  costFunctionLabel: 'Cost Function: J(theta0, theta1)',
};

module.exports = SimpleCostCalculator;
