(function() {
    'use strict';

    var margin = {top: 0, right: 10, bottom: 40, left: 64},
        wot_width = document.getElementById("wot").offsetWidth - margin.left - margin.right,
        wot_height = document.getElementById("wot").offsetHeight - margin.top - margin.bottom,
        BASE_DATA = {
            chicken_weight: 4,
            banana_weight: 2.4,
            burger_weight: 0.333,
        };

    var data = [
        {
            'time': 'week',
            'weight': 4
        },
        {
            'time': 'month',
            'weight': 16
        },
        {
            'time': 'year',
            'weight': 208
        }
    ]

    function set_text () {

    }

    function add_icons () {
        // Prevent a ton of icons being displayed
        var max;

        max = Math.min((data[data.length - 1].weight / BASE_DATA.chicken_weight), 100);
        for (var i = 0; i < max; i++) {
            $("#chicken_icons").append("<img class='icon chicken' src='chicken.png'/>");
        }

        max = Math.min((data[data.length - 1].weight / BASE_DATA.banana_weight), 100);
        for (var i = 0; i < max; i++) {
            $("#banana_icons").append("<img class='icon banana' src='banana.png'/>");
        }

        max = Math.min((data[data.length - 1].weight / BASE_DATA.burger_weight), 100);
        for (var i = 0; i < max; i++) {
            $("#burger_icons").append("<img class='icon burger' src='burger.png'/>");
        }
    }
    add_icons();

    function fadein_icons (mDiv) {
        $(mDiv).each(function (idx, el) {
            $(el).animate({
                opacity: 1,
            }, Math.log(idx + 1) * 250);
        });
    }

    $("#chicken_icons").waypoint(function () {
        fadein_icons(".icon.chicken");
    }, {
        offset: '70%'
    });

    $("#banana_icons").waypoint(function () {
        fadein_icons(".icon.banana");
    }, {
        offset: '70%'
    });

    $("#burger_icons").waypoint(function () {
        fadein_icons(".icon.burger");
    }, {
        offset: '70%'
    });

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
            .tickSizeOuter(0)
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
            .domain([0, d3.max(data, function(d) { return d.weight }) * 1.1])
            .range([0, wot_width]);
        wotXAxis = d3.axisBottom()
            .scale(wotX)
            .tickSizeOuter(0)
            .ticks(4)
        wot.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + wot_height + ")")
            .call(wotXAxis);
        // Draw x gridlines
        var gridlines = d3.axisBottom()
            .tickFormat("")
            .tickSize(-wot_height)
            .tickSizeOuter(0)
            .ticks(4)
            .scale(wotX);
        wotGrid = wot.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + wot_height + ")")
            .call(gridlines);

        wotY = d3.scaleBand()
            .rangeRound([0, wot_height])
            .domain(data.map(function(d) { return d.time.toUpperCase(); }))
            .padding(0.5);
        wotYAxis = d3.axisLeft()
            .scale(wotY)
        wot.append("g")
            .attr("class", "y axis")
            .call(wotYAxis);

        var divs = wot.selectAll('.bar')
            .data(data)
            .enter();

        // Add rectangles
        divs.append('rect')
            .attr("class", "bar")
            .attr("x", 1)
            .attr("width", 0)
            .attr("y", function(d) { return wotY(d.time.toUpperCase()); })
            .attr("height", wotY.bandwidth())
            .transition()
                .delay(function(d, i) { return i * 300; })
                .duration(700)
                .attr("width", function(d) { return wotX(d.weight); })

        // Add text
        divs.append('text')
            .attr("class", "num")
            .attr("x", 0)
            .attr("y", function(d) { return wotY(d.time.toUpperCase()) + 7 + wotY.bandwidth() / 2; })
            .attr("opacity", 0)
            .text(function(d) { return d.weight + " lbs"; })
            .transition()
                .delay(function(d, i) { return i * 300; })
                .duration(700)
                .attr("opacity", 1)
                .attr("x", function(d) { return wotX(d.weight) + 15; })
    }
    build_wot();
})();