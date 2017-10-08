

function drawLossChart(elem) {

    
    // d3.json(url + "/data/"+elem+"losses.txt", function (data) {
    var filePath;
    switch(elem){
        case "LR":
            //filePath = url + "/data/LRlosses.txt";
            filePath= URL + "/data/linearly-separable-case/LinearlySeparableCase-LRlosses.txt";
            break;
        case "NN":
            //filePath = url + "/data/NNlosses.txt";
            filePath= URL + "/data/non-linearly-separable-case/LinearlyNonSeparableCase-NNlosses.txt";
            break;
    } 

    d3.json(filePath, function (data) {
        data = data.map(function (d, i) {
            return [i, d];
        });

        var w = 310,
            h = 240,
            p = 25,
            y_off = 40;


        //Hack to make NN plot a bit wider so that x label is not cutoff
        if (elem == "NN")
            w = 285;

        var x = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, w]);

        var y = d3.scaleLinear()
            .domain([0, 1.5])
            .range([h, 0]);

        //var xAxis =    d3.select(".axis")
        //    .call(d3.axisBottom(x));

        //var yAxis = d3.svg.axis()
        //    .scale(y)
        //    .orient("left");

        var line = d3.line()
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); });


        d3.select('body')
            .select("#" + elem + "Loss")
            .select('svg')
            .remove()

        var svg = d3.select('body')
            .select("#" + elem + "Loss")
            .append('svg')
            .attr('width', w)
            .attr('height', h);

        // add element and transition in



        var path = svg.append('path')
            .attr('class', 'line')
            .attr("transform", "translate(" + (p+1) + "," + (-y_off) +")")
            .attr('d', line(parseFloat(data[0])))
        
        var wait = elem == "LR" ? 10000 : 20000;

        $(document.body).on('click', "#play" + elem, function (e) {
            var that = $(this).find('i')
            that.text('hourglass_empty')
            path
                .transition().on(
                'end', function () {
                    that.text('play_circle_outline')
                    $("#NNSpinner").hide();
                    $("#LRSpinner").hide();
                    if(elem=="NN"){
                        $("#congratulations").show();
                    }
                }
                )
                .duration(wait)
                .attrTween('d', pathTween)

                ;
        })

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + p + ", " + (h-y_off) + ")")
            .call(d3.axisBottom().scale(x))
            .selectAll("text")
            .attr("y", 10)
            .attr("x", 4)
            .attr("dy", ".35em")
            //.attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        svg.append("text")
            .attr("class", "mathy graph-label")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate(" + (w / 2) + "," + h  + ")")  // centre below axis
            .text("Iterations"); 

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + p + ", " + (-y_off) + ")")
            .call(d3.axisLeft().scale(y));

        function pathTween() {
            var interpolate = d3.scaleQuantile()
                .domain([0, 1])
                .range(d3.range(1, data.length + 1));
            return function (t) {
                return line(data.slice(0, interpolate(t)));
            };
        }

    });
}
