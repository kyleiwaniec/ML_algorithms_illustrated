function drawDecisionBoundary(elem) {
    
    var filePath;
    switch (elem) {
        case "LR":
            filePath = URL + "/data/linearly-separable-case/LinearlySeparableCase-LRcontour.txt";
            var normData = LRNorm
            break;
        case "NN":
            filePath = URL + "/data/non-linearly-separable-case/LinearlyNonSeparableCase-NNcontour.txt";
            var normData = NNNorm
            break;
    }


    var layout = {
        width: 290,
        height: 290,
	    showlegend: false,
        margin: {
            l: 50,
            r: 10,
            b: 50,
            t: 10,
            pad: 0
        },
        xaxis:{
            nticks:10,
            tickvals:[0,0.2,0.4,0.6,0.8,1.0],
            ticktext:["100","120","140","160","180","200","220"],
            title: "Weight in lbs",
            linecolor: '#444444',
            zerolinewidth: 0,
            zerolinecolor:'#eeeeee'
        },
        yaxis:{
            nticks:10,
            tickvals:[0,0.2,0.4,0.6,0.8,1.0],
            ticktext:["5.0","5.2","5.4","5.6","5.8","6.0","6.2"],
            title: "Height in ft",
            linecolor: '#444444',
            zerolinewidth: 0,
            zerolinecolor:'#eeeeee'
        },
        font: {
            family: 'MJX_Math',

          }

    };

    var options = {
        displaylogo: false,
        displayModeBar: false,
        scrollZoom: false
    }

    var graphDiv = elem + 'contour';

    d3.json(filePath, function (error, res) {
        if (error) { return console.warn("error", error); }
        else {
            data = res[0][0];
           
            var ones=0,zeros=0,x1=[],x2=[];

            data.map(function(v,i){

                x1.push(v[0])
                x2.push(v[1])
                if (v[2] == 1) ones += 1
                if (v[2] == 0) zeros += 1
            })

            var plotData = {
                z: data.map(function (value, index) { return value[2]; }),
                x: data.map(function (value, index) { return value[0]; }),
                y: data.map(function (value, index) { return value[1]; }),
                type: 'contour',
                showscale: false,
                colorscale: [[0, 'rgba(255,0,85,.0)'], 
                                        [0.25, 'rgba(255,0,85,.25)'], 
                                        [0.45, 'rgba(255,0,85,.45)'], 
                                        [0.65, 'rgba(255,0,85,.65)'], 
                                        [0.85, 'rgba(255,0,85,.85)'], 
                                        [1, 'rgba(255,0,85,1)']],
                contours:{
                    coloring: 'lines'
                }
            };

            // STATIC ITEMS
            var scatterDataPos = {
              x: normData.map(function (value,index){ if(value["y"] == 1){return value["x1"];}}),
              y: normData.map(function (value,index){ if(value["y"] == 1){return value["x2"];}}),
              mode: 'markers',
              type: 'scatter',
              marker: { size: 10, color:'black' }
            };
            var scatterDataNeg = {
              x: normData.map(function (value,index){ if(value["y"] == 0){return value["x1"];}}),
              y: normData.map(function (value,index){ if(value["y"] == 0){return value["x2"];}}),
              mode: 'markers',
              type: 'scatter',
              marker: { size: 10, color:'#444444',symbol:"circle-open"}
            };


            if (document.getElementById(elem + 'contour') != null) {
                Plotly.newPlot(graphDiv, [plotData,scatterDataPos,scatterDataNeg], layout, options);
            }

            // animate the color of the boxes.
            $(document.body).on('click', '#play' + elem, function (e) {
                var j = 0
                 
                var start = new Date()
                function update() {
                    j += 1;
                    l = res.length;

                    iterationControl = (elem === "LR" ? true : (j / 40 * 40 == j)); //reduce animation iteration for NN

                    if ((j < l) && iterationControl) {
                        var plotData = {
                            z: res[j][0].map(function (value, index) { return value[2]; }),
                            x: res[j][0].map(function (value, index) { return value[0]; }),
                            y: res[j][0].map(function (value, index) { return value[1]; }),
                            type: 'contour',
                            showscale: false,
                            colorscale: [[0, 'rgba(255,0,85,.0)'], 
                                        [0.25, 'rgba(255,0,85,.25)'], 
                                        [0.45, 'rgba(255,0,85,.45)'], 
                                        [0.65, 'rgba(255,0,85,.65)'], 
                                        [0.85, 'rgba(255,0,85,.85)'], 
                                        [1, 'rgba(255,0,85,1)']],
                            contours:{
                                coloring: 'lines'
                            }
                        };

                      
                        // using Plotly.restyle does not offer any performance improvemnt.
                        Plotly.newPlot(graphDiv, [plotData,scatterDataPos,scatterDataNeg], layout, options);
                        requestAnimationFrame(update);
                       
                    }else{
                        var end = new Date()
                        console.debug("Finished Decision Boundary for "+elem)
                    }
                }
                update()



            })
        }
    })



}