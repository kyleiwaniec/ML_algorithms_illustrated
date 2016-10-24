function getMyData() {
    var margin = { top: 20, right: 30, bottom: 50, left: 100 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var y = d3.scaleLinear()
    .range([height, 0])

    var x = d3.scaleBand()
    .domain(d3.range(0, 16))
    .range([0, width])

    var xAxis = d3.axisBottom()
    .scale(x);

    var yAxis = d3.axisLeft()
    .scale(y);

    var svg = d3.select("#myData").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("Content/raw_data.csv", function (error, data) {
        x.domain(data.map(function (d) { return d.number_of_upvotes_of_request_at_retrieval; }));
        y.domain([0, d3.max(data, function (d) { return d.requester_number_of_comments_at_retrieval; })]);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("x", width / 2)
          .attr("y", 30)
          .attr("dx", ".71em")
          .style("text-anchor", "end")
          .text("number_of_upvotes_of_request_at_retrieval");


        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("requester_number_of_comments_at_retrieval");


        svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function (d) { return x(d.number_of_upvotes_of_request_at_retrieval); })
          .attr("width", 50)
          .attr("y", function (d) { return y(d.requester_number_of_comments_at_retrieval); })
          .attr("height", function (d) { return height - y(d.requester_number_of_comments_at_retrieval); })
          .attr("fill", "CadetBlue")
          .attr("opacity", function (d, i) { return (i + 5) * 1.0 / 21.0; })
          .attr("id", function(d, i) {
            return i;
          })
          ;

        var xTextPadding = 23;
        var yTextPadding = 20;
        svg.selectAll(".bartext")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bartext")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("x", function (d, i) {
            return x(d.number_of_upvotes_of_request_at_retrieval) + xTextPadding;
        })
        .attr("y", function (d, i) {
            return y(d.requester_number_of_comments_at_retrieval) + yTextPadding;
        });
    });
}