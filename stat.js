(function() {
    'use strict';

    var margin = {top: 0, right: 10, bottom: 40, left: 50},
        wot_width = document.getElementById("wot").offsetWidth - margin.left - margin.right,
        wot_height = document.getElementById("wot").offsetHeight - margin.top - margin.bottom,
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

    function resize_graphs () {
        // Resize WOT graph
        wot_width = document.getElementById("wot").offsetWidth - margin.left - margin.right;
        wot_svg.attr("width", wot_width + margin.left + margin.right);
        wotX.range([0, wot_width]);
        wot.select(".x.axis")
            .call(wotXAxis);

        var gridlines = d3.axisBottom()
            .tickFormat("")
            .tickSize(-wot_height)
            .scale(wotX);
        wotGrid.call(gridlines);
    }
    d3.select(window).on('resize.updatesvg', resize_graphs);

    // WASTE OVER TIME GRAPH
    var wot, wot_svg, wotY, wotX, wotXAxis, wotYAxis, wotGrid;
    function build_wot () {
        wot_svg = d3.select("svg#wot_svg")
                .attr("width", wot_width + margin.left + margin.right)
                .attr("height", wot_height + margin.top + margin.bottom)
        wot = wot_svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        wotX = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d.weight })])
            .range([0, wot_width]);
        wotXAxis = d3.axisBottom()
            .scale(wotX)
        wot.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + wot_height + ")")
            .call(wotXAxis);
        // Draw x gridlines
        var gridlines = d3.axisBottom()
            .tickFormat("")
            .tickSize(-wot_height)
            .tickSizeOuter(0)
            .scale(wotX);
        wotGrid = wot.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + wot_height + ")")
            .call(gridlines);

        wotY = d3.scaleBand()
            .rangeRound([wot_height, 0])
            .domain(data.map(function(d) { return (d.time).toUpperCase(); }));
        wotYAxis = d3.axisLeft()
            .scale(wotY)
        wot.append("g")
            .attr("class", "y axis")
            .call(wotYAxis);

    }
    build_wot();
})();