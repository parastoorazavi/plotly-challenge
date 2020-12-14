d3.json("samples.json").then((data) => {
        // console.log(data);
        var sampleNames = data.names;
        // console.log(sampleNames);
        
function fillPanel() {
        var panel = d3.select("#sample-metadata");
        
            data.metaData[sampleNames]
        

function buildPlot() {
  d3.json("samples.json").then((data) => {      
for (var i = 0 ; i<sampleNames.length;i++){
    let sample_values = data.samples[i].sample_values;
    // console.log(sample_values);
    let otu_ids = data.samples[i].otu_ids;
    // console.log(otu_ids);
    let otu_labels = data.samples[i].otu_labels;
    // console.log(otu_labels);
}
  
      getIdData();
  
      // Horizontal Bar Trace
      var trace1 = [{
         x: sample_values.slice(0,10),
         y: otu_ids.slice(0,10),
         text:otu_labels,
         type: "bar",
         orientation: 'h'
      }];
      Plotly.newPlot("bar", trace1);
  
      // Bubble Trace
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
    });
  }
  function getData() {
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");
    var data = sampleNames;
    if (dataset == 'us') {
        data = us;
    }
  
  buildPlot();
  
  
});

