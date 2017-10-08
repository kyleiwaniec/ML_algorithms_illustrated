var lrMatrixModule = (function () {

		// PRIVTE VARIABLES

		var width  = 200,
	    	height = 160,
        	svg;



	    var x = d3.scaleLinear()
	    	.domain([0, 4.1])
	    	.range([0, 1]);

	    var opacity = function(d,i){
	    	var op =  Math.abs(x(d[1]))
			return 'rgba(29,1,119,'+op+')'
		}
		var weightValue = function(d,i){
			return d[1].toFixed(10)
		}

		// init data array
		var w_data = []


		// PRIVATE FUNCTIONS
		function drawNNMatrix(elem){

			
			// SETUP
        	svg = d3.select('body').select("#"+elem).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class","weight-graph");
    
            // Draw the matrix layer labels. Use math font. 
            // Also, this allow us to  create line breaks, which are a PIA with SVG text.
            d3.select('.weight-graph')
                    .append("foreignObject")
                    .attr("width",100)
                    .attr("height",20) 
                    .html("<div class='matrix-label'>Output<br>Layer<br>Weights</div>")
                    .attr("x", 80)
                    .attr("y", 25)   
            
            d3.select('.weight-graph')
                    .append("foreignObject")
                    .attr("width",100)
                    .attr("height",20) 
                    .html("<div class='matrix-label'><br><br>Inputs</div>")
                    .attr("x", 20)
                    .attr("y", 25)

            // Draw the two input boxes        
            for(var i = 0; i < 2; i++){
                d3.select('.weight-graph').append('rect')
                    .attr('class','input-box')
                    .attr('fill','#fff')
                    .attr('x',20)
                    .attr('y',function(){return i*30+80})
            }
            
            // DATA
            d3.json(URL+"/data/LRweights.txt", function(error, res) {
		        if (error){return console.warn("error",error);}
		        else{
		        	w_data = res;
		        	lr_weights_render(w_data[0])
		        }
        	})
        }
	            
        function lr_weights_render(data){

	        	// Draw weights boxes
                var output_layer = svg.selectAll(".output-boxes")
                        .data(data, function(d) { return d; });
                        

                output_layer.enter()
                        .append('g')
                        .attr('class','output-boxes')
                                .append('rect')
                                .attr('class','output-box')
                                .attr('x',90)
                                .attr('y',function(d,i){
                                    return 30*i + 80
                                })
                                .attr('width',20)
                                .attr('height',20)
                                .attr('fill',opacity)

                output_layer.enter()
                        .append('g')
                        .attr('class','output-boxes')
                                .append('text')
                                .attr('x',120)
                                .attr('y',function(d,i){return 30*i + 95})
                                .attr('class','box-value')
                                .text(weightValue)       

                output_layer.exit().remove()

		} // *lr_weights_render

		function update(){
            // animate the color of the boxes.
        	var j = 0
            var k = 1


        	var start = new Date()
			function animateColors() {
				j+=100;

                k += parseInt(Math.log(j)) // slow down the accelaration of weights so the change is perceptable.
    			
                if (j < w_data.length){

					lr_weights_render(w_data[k])
    				requestAnimationFrame(animateColors);
				    
				}else{
					var end = new Date()
					console.debug("time", end-start)
				}
			}
			animateColors()
        } // *update
		
    // API
    return {
        start: drawNNMatrix,
        update: update,
    };

})();

