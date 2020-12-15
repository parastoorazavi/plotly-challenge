// Use d3.json() to fetch data from JSON file
d3.json("samples.json").then((data) => {
  // console.log(data);
var sampleNames = data.names;
  // console.log(sampleNames);

 // Create dropdown menu and Assign the value of its option to a variable 
d3.select("#selDataset").selectAll("option")
                    .data(sampleNames) 
                    .enter()
                    .append("option")
                    .text(function (d) { return `${d}`})
                    .on('change',function() { optionChanged(this.value) });
                    
var dropDown = d3.select("#selDataset")
var dataset = dropDown.property("value");

// Create Panel
var index = sampleNames.indexOf(dataset);
d3.select("#sample-metadata").selectAll("p")
                    .data(Object.entries(data.metadata[index])) 
                    .enter()
                    .append("p")
                    .text(function (d) { return `${d[0]}: ${d[1]}`})

// Assign plot's info
var sample_values = data.samples[index].sample_values;
// console.log(sample_values);
var otu_ids = data.samples[index].otu_ids;
// console.log(otu_ids);
var otu_labels = data.samples[index].otu_labels;
// console.log(otu_labels);

// Create Horizontal Bar Trace
var trace1 = [{
  x: sample_values.slice(0,10).reverse(),
  y: otu_ids.slice(0,10).reverse(),
  text:otu_labels,
  type: "bar",
  orientation: 'h'
}];
  
  Plotly.newPlot("bar", trace1);

  // Create Bubble Trace
  var trace2 = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
    color: otu_ids,
    size: sample_values 
}
}];
    var layout = {
    xaxis: {
    title: "OTU ID"},
};
  
    Plotly.newPlot("bubble", trace2, layout);
    
    function optionChanged() {
      var dropDown = d3.select("#selDataset");
      var dataset = dropDown.property("value");
      updatePlotly(data);
    }
    function updatePlotly(newdata) {
      Plotly.restyle("bar", "x", [x]);
      Plotly.restyle("bar", "y", [y]);
      Plotly.restyle("bubble", "x", [x]);
      Plotly.restyle("bubble", "y", [y]);
    } 
  });
