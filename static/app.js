// Use d3.json() to fetch data from JSON file
d3.json("samples.json").then(function updatePlotly(data) {
// console.log(data);
var sampleNames = data.names;
// console.log(sampleNames);

// Create dropdown menu and Assign the value of its option to a variable 
d3.select("#selDataset").selectAll("option")
                    .data(sampleNames) 
                    .enter()
                    .append("option")
                    .text(function (d) { return `${d}`});
                                       
var dropDown = d3.select("#selDataset")
var dataset = dropDown.property("value");

// Create Panel
var index = sampleNames.indexOf(dataset);
d3.select("#sample-metadata").html("");
d3.select("#sample-metadata").selectAll("p")
                    .data(Object.entries(data.metadata[index])) 
                    .enter()
                    .append("p")
                    .text(function (d) { return `${d[0]}: ${d[1]}`})
var dropDown = d3.select("#selDataset")
var dataset = dropDown.property("value");
// Assign plot's info
var sample_values = data.samples[index].sample_values;
// console.log(sample_values);
var otu_ids = data.samples[index].otu_ids;
// console.log(otu_ids);
var otu_labels = data.samples[index].otu_labels;
// console.log(otu_labels);
var otu_id = data.samples[index].otu_ids.slice(0,10).reverse();
// console.log(otu_ids);

// Create Horizontal Bar Chart Trace
var trace1 = [{
  x: sample_values.slice(0,10).reverse(),
  y: otu_id.forEach(element => `OTU  + ${element}` ),
  text:otu_labels.slice(0,10).reverse(),
  type: "bar",
  orientation: 'h'
}];
  
  Plotly.newPlot("bar", trace1);

// Create Bubble Chart Trace
var trace2 = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
    color: otu_ids,
    colorscale: "Earth",
    size: sample_values 
}
}];
var layout = {
    xaxis: {
    title: "OTU ID"},
};
  
  Plotly.newPlot("bubble", trace2, layout);
  
  // Create Gauge Chart Trace
  //   var trace3 = [{
  //     angle: 0,
  //     lineWidth: 0.4,
  //     radiusScale: 0.8,
  //     pointer: {
  //       length: 0.37, 
  //       strokeWidth: 0.026, 
  //       color: '#961709' 
  //     },
  //     var target = document.getElementById('foo'); // your canvas element
  //     var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  //     gauge.maxValue = 10; // set max gauge value
  //     gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
  //     gauge.animationSpeed = 71; // set animation speed (32 is default value)
  //     gauge.set(2); // set actual value
      
  //     Plotly.newPlot('gauge', data, layout);


  //     domain: { x: [0, 1], y: [0, 1] },
  //     value: 270,
  //     title: { text: "Speed" },
  //     type: "indicator",
  //     mode: "gauge+number"
  // }];


  // Object.entries(data.metadata[index])


  d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {
      var dropDown = d3.select("#selDataset");
      var dataset = dropDown.property("value");
      updatePlotly(data);
    }
  });
