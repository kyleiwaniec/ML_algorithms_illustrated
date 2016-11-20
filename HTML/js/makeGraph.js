/*

layers is a list of dimentions: [2,3,1] 
in this example we have an input layer dimention 2, a hidden layer dimention 3, and output layer dimention 1

*/



function Graph(layers){

	var labels = "ijklmnopqrstuvwxyzabcdefgh".split("")
	var nodes = [];

	for(var l = 0; l < layers.length; l++){
		for(var n = 0; n < layers[l]; n++){

			var node = {
				"layer":l,
				"node":n,
				"values": {"layer":labels[l], "node": "x_{"+labels[l]+""+(n+1)+"}"},
				"edges":[
						
					]
				}

			// add outgoing edges if there is another layer:
			if(l < layers.length - 1){
				for(var n2 = 0; n2 < layers[l+1]; n2++){
					var edge = {
						"layer":l+1, // destination layer
						"dest":n2, // destination node
						"source":n // source node
					}
					node['edges'].push(edge);
				}
			}	
			nodes.push(node);
		}
	}

	return nodes;
}

