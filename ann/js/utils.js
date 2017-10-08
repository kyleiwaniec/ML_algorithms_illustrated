
URL = window.location.href.toString().split('/', 3).join('/');
console.log('url',URL)
if(URL == "http://people.ischool.berkeley.edu"){

	URL = "http://people.ischool.berkeley.edu/~kylehamilton/209/machinelearningalgorithmsillustrated"
	console.log("urrrl",URL)
}else if(URL == "http://www.candpgeneration.com"){
	URL += "/ann"
}

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }else{
    	return "test passed";
    }
}




function getParam(paramName, data) {
	switch (paramName) {
		case 'x1_min':
			return d3.min(data, function (d) { return d["x1"]; });
		case 'x1_max':
			return d3.max(data, function (d) { return d["x1"]; });
		case 'x1_span':
			return d3.max(data, function (d) { return d["x1"]; }) - d3.min(data, function (d) { return d["x1"]; });
		case 'x2_min':
			return d3.min(data, function (d) { return d["x2"]; });
		case 'x2_max':
			return d3.max(data, function (d) { return d["x2"]; });
		case 'x2_span':
			return d3.max(data, function (d) { return d["x2"]; }) - d3.min(data, function (d) { return d["x2"]; });
	}
}


function normalizeData(data) {

	var x1_min = getParam('x1_min', data)
	var x1_span = getParam('x1_span', data)
	var x2_min = getParam('x2_min', data)
	var x2_span = getParam('x2_span', data)

	var normalized = [];
	var i = 0;
	data.forEach(function (element) {
		var e = {};
		e.x1 = (element.x1 - x1_min) / x1_span;
		e.x2 = (element.x2 - x2_min) / x2_span;
		e.y = element.y;
		normalized[i] = e;
		i++;
	}, this);
	return normalized;
}

var scatterLR = [
    { x1: 98, x2: 5.5, y: 0 },
    { x1: 120, x2: 5.8, y: 0 },
    { x1: 168, x2: 6.2, y: 0 },
    { x1: 200, x2: 5.5, y: 1 },
    { x1: 210, x2: 5, y: 1 },
    { x1: 168, x2: 5, y: 1 }
  ]
  var scatterNN = [
    { x1: 98, x2: 5.5, y: 0 },
    { x1: 155, x2: 5.2, y: 0 },
    { x1: 120, x2: 5.7, y: 0 },
    { x1: 168, x2: 6.2, y: 0 },
    { x1: 200, x2: 5.5, y: 1 },
    { x1: 210, x2: 5, y: 1 },
    { x1: 168, x2: 5, y: 1 },
    { x1: 110, x2: 6.0, y: 1 },
    { x1: 125, x2: 5.8, y: 1 }
  ]
  var LRNorm = normalizeData(scatterLR)
  var NNNorm = normalizeData(scatterNN)