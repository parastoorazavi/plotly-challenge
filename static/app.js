  // Use d3.json() to fetch data from JSON file
  d3.json("samples.json").then(function updatePlotly(data) {
    // console.log(data);
  
  // Create dropdown menu and Assign the value of its option to a variable 
  var nameData = data.names;
  // console.log(nameData);
  d3.select("#selDataset")
    .selectAll("option")
    .data(nameData)
    .enter().append("option")
    .text(function(d) { return `${d}` });
  var dropdownMenu = d3.select("#selDataset");
  var dataset = dropdownMenu.property("value");
  
  // Create Demographic Panel
  var index = nameData.indexOf(dataset);
  d3.select("#sample-metadata").html("");
  d3.select("#sample-metadata");
  var demographicPanel = d3.select("#sample-metadata");    
  var metaDataInfo = data.metadata[index];
  var metaDataInfoPanel = Object.entries(metaDataInfo).forEach(([key,value]) => {
    demographicPanel.append("p").text(`${key}: ${value}`);
  });   
  
  // Assign plot's info
  var sample_values = data.samples[index].sample_values;
  // console.log(sample_values);
  var otu_ids = data.samples[index].otu_ids;
  // console.log(otu_ids);
  var otu_id = otu_ids.slice(0,10).reverse();
  // console.log(otu_id);
  var otu_labels = data.samples[index].otu_labels;
  // console.log(otu_labels);
  var metaDataWfreq = metaDataInfo.wfreq;
  console.log(metaDataWfreq);

  function init() {

  // Create Horizontal Bar Chart Trace  
  var trace1 = [{
    x: sample_values.slice(0,10).reverse(),
    y: otu_id.map(function(item){return "OTU " + item}),
    text:otu_labels.slice(0,10).reverse(),
    type: "bar",
    orientation: 'h',
    marker:{
      color:'#3a7e41'
    }
  }];
  
  var layout = {
    title:" Top 10 OTUs(operational taxonomic units) ",
    xaxis: {
    title: "values of samples"},
  };

  Plotly.newPlot("bar", trace1, layout);
  
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
    title:" Top 10 OTUs(operational taxonomic units) ",
    xaxis: {
    title: "OTU ID"},
  };
  
  Plotly.newPlot("bubble", trace2, layout);

//   // Create Gauge Chart Trace
//   var trace3 = [{
//     type: 'pie',
//     showlegend: false,
//     hole: 0.4,
//     rotation: 90,
//     values: [9,9,9,9,9,9,9,9,9,81],
//     text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//     direction: 'clockwise',
//     textinfo: 'text',
//     textposition: 'inside',
//     marker: {
//       colors: ["rgb(247,242,236)",
//       "#f8f3ec",
//       "#f4f1e5",
//       "#e9e6ca",
//       "#e5e7b3",
//       "#d5e49d",
//       "#b7cc92",
//       "#8cbf88",
//       "#8abb8f",
//       "rgba(255, 300, 255, 0)"],
//       labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//       hoverinfo: 'label'
//     }
//   }]

//   // needle
//   var degrees = 50, radius = .9
//   var radians = degrees * Math.PI / 180
//   var x = -1 * radius * Math.cos(radians) * metaDataWfreq
//   var y = radius * Math.sin(radians)

//   var layout = {
//     'shapes': [
//       {
//           'type': 'path',
//           'path': 'M 2.235 0.5 L 2.24 0.65 L 0.245 0.5 Z',
//           'fillcolor': '#830308',
//           'line': {
//               'width': 5.5
//           },
//           'x': 'paper',
//           'y': 'paper'
//       }
//   ],
//   'annotations': [
//     {
//         'xref': 'paper',
//         'yref': 'paper',
//         'x': 0.23,
//         'y': 0.45,
//         'text': '50',
//         'showarrow': False
//     }
// ],
//     title: 'Belly Botton Washing Frequency',
//     xaxis: {visible: false, range: [-1, 1]},
//     yaxis: {visible: false, range: [-1, 1]}
//   };

//   Plotly.plot('gauge', trace3, layout)

  }
  init();
  
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", optionChanged);

  // This function is called when a dropdown menu item is selected
  function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");
    updatePlotly(data);
  }
  });
  
  
  