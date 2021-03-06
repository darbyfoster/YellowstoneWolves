// set the dimensions and margins of the graph
function population() {
  var margin = { top: 20, right: 40, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // parse the date
  var parseTime = d3.timeParse("%d-%b-%y");

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y0 = d3.scaleLinear().range([height, 0]);
  var y1 = d3.scaleLinear().range([height, 0]);

  // define the 1st line - elk
  var valueline = d3
    .line()
    .x(function (d) {
      return x(parseTime(d.date));
    })
    .y(function (d) {
      return y0(+d["elk"]);
    });

  // define the 2nd line - wolf
  var valueline2 = d3
    .line()
    .x(function (d) {
      return x(parseTime(d.date));
    })
    .y(function (d) {
      return y1(+d["wolf"]);
    });

  // define the 3rd line - bison
  var valueline3 = d3
    .line()
    .x(function (d) {
      return x(parseTime(d.date));
    })
    .y(function (d) {
      return y0(+d["bison"]);
    });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .append("text")
    .attr("class", "title")
    .attr("transform", "translate(" + width / 3 + "," + -7 + ")")
    .style("font-family", "sans-serif")
    .text("Population of Elk, Bison, and Wolves Over Time");

  // create the legend
  svg
    .append("rect")
    .attr("class", "legend")
    .attr("x", 665)
    .attr("y", 20)
    .attr("width", 95)
    .attr("height", 93)
    .attr("fill", "none")
    .attr("stroke", "black");

  svg
    .append("text")
    .attr("class", "legend")
    .attr("transform", "translate(680, 40)")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .style("fill", "black")
    .style("text-decoration", "underline")
    .text("Key:");

  svg
    .append("rect")
    .attr("class", "legend")
    .attr("x", 680)
    .attr("y", 50)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "steelblue");

  svg
    .append("text")
    .attr("class", "legend")
    .attr("transform", "translate(700, 60)")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .style("fill", "steelblue")
    .text("Elk");

  svg
    .append("rect")
    .attr("class", "legend")
    .attr("x", 680)
    .attr("y", 70)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "green");

  svg
    .append("text")
    .attr("class", "legend")
    .attr("transform", "translate(700, 80)")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .style("fill", "green")
    .text("Bison");

  svg
    .append("rect")
    .attr("class", "legend")
    .attr("x", 680)
    .attr("y", 90)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "red");

  svg
    .append("text")
    .attr("class", "legend")
    .attr("transform", "translate(700, 100)")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .style("fill", "red")
    .text("Wolves");

  // Get the data
  d3.csv("data.csv").then(function (data) {
    // Scale the range of the data
    x.domain(
      d3.extent(data, function (d) {
        return parseTime(d.date);
      })
    );
    y0.domain([
      0,
      d3.max(data, function (d) {
        return Math.max(+d["elk"]);
      }),
    ]);
    y1.domain([
      0,
      d3.max(data, function (d) {
        return Math.max(+d["wolf"]);
      }),
    ]);

    // Add the elk path.
    svg.append("path").datum(data).attr("class", "line").attr("d", valueline);

    // Add the wolf path.
    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .style("stroke", "red")
      .style("stroke-dasharray", 2)
      .attr("d", valueline2);

    // Add the bison path
    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .style("stroke", "green")
      .style("stroke-dasharray", 5)
      .attr("d", valueline3);

    // Add the X Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(24));

    // Add the Y0 Axis
    svg.append("g").attr("class", "axisSteelBlue").call(d3.axisLeft(y0));

    // Add the Y1 Axis
    svg
      .append("g")
      .attr("class", "axisRed")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(d3.axisRight(y1));

    // Add X axis label
    svg
      .append("text")
      .attr("class", "axisLabel")
      .attr("transform", "translate(" + width / 2 + "," + (height + 25) + ")")
      .style("font-family", "sans-serif")
      .style("font-size", "10px")
      .text("Year");

    // Add Y0 axis label
    svg
      .append("text")
      .attr("class", "axisSteelBlue")
      .attr(
        "transform",
        "translate(" + -37 + "," + (height - 140) + ")rotate(270)"
      )
      .style("font-family", "sans-serif")
      .style("font-size", "10px")
      .style("fill", "#23815a")
      .text("Number of Elk and Bison");

    // Add Y1 axis label
    svg
      .append("text")
      .attr("class", "axisRed")
      .attr(
        "transform",
        "translate(" + (width + 35) + "," + (height - 165) + ")rotate(270)"
      )
      .style("font-family", "sans-serif")
      .style("font-size", "10px")
      .style("fill", "red")
      .text("Number of Wolves");
  });
}
