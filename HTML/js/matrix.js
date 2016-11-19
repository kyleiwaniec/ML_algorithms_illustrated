

var width  = 50,
    height = 2500,
    colors = d3.scale.category10();

if (window.location.host.indexOf('127.0.0.1') != -1
   || window.location.host.indexOf('localhost') != -1) {
    url = window.location.href.toString().split('/', 3).join('/');
}
else if (window.location.host.indexOf('.net') != -1) {
    url = 'http://machinelearningalgorithmsillustratedapi.azurewebsites.net';
}
else {
    url = 'http://www.candpgeneration.com/209HTML'
}

function drawMatrix(elem){
	console.log("hello")

	d3.json(url+"/data/_weights_.txt", function(error, res) {
			console.log(res)
	        if (error){return console.warn("error",error);}
	        else{
	        	console.debug("res",res)
	        	drawGraph(res);
	        }
	})
	// .row(function(d) { return {key: d.key, value: +d.value}; })
 //    .get(function(error, rows) { console.log(rows); 
 //    });

	function drawGraph(data){

		


	}
}








