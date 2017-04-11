(function() {
    'use strict';

    var margin = {top: 20, right: 0, bottom: 30, left: 40},
        wot_width = 1000,
        wot_height = 400,

        BASE_DATA = {
            chicken_weight: 4,

        };

    var data = [
        {
            'time': 'week',
            'weight': 4
        },
        {
            'time': 'month',
            'weight': 37
        },
        {
            'time': 'year',
            'weight': 432
        }
    ]

    // WASTE OVER TIME GRAPH
    var wot = d3.select("div#wot")
        .append("div")
            .classed("svg-container", true) //container class to make it responsive
        .append("svg")
            //responsive SVG needs these 2 attributes and no width and height attr
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", margin.left + " " + margin.top + " " + (wot_width) + " " + (wot_height))
            .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
            //class to make it responsive
            .classed("svg-content-responsive", true)

    var y = d3.scaleOrdinal()
        .range([wot_height, 0]);

    //.domain(data.map(function(d) { return d.time; }))
    var x = d3.scaleLinear()
        .range([0, wot_width]);

    var xAxis = d3.axisBottom()
        .scale(x)

    var yAxis = d3.axisLeft()
        .scale(y)

    wot.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + wot_height + ")")
        .call(xAxis);

    wot.append("g")
        .attr("class", "y axis")
        .call(yAxis);
})();