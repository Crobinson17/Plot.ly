function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otd_ids;
            console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)


        // get only top 10 otu ids for  
            var OTU_top = ( sampledata.samples[0].otd_ids.slice(0, 10)).reverse();

        // otu id's 
            var otd_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${otd_id}`)

         // labels for the plot
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: otd_id,
                text: labels,
                marker: {
                color: 'red'},
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var data = [trace];
    
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // create the bar plot
        Plotly.newPlot("bar", data, layout);



            // bubble chart
            var trace1 = {
                x: sampledata.samples[0].otd_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otd_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // set the layout for the bubble plot
            var layout2 = {
                xaxis:{title: "OTU IDs"},
                height: 500,
                width: 4000
            };
    
            // creating data variable 
            var data2 = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data2, layout2); 
        
        });
    }  
    // create the function to get the necessary data
    function getDemoInfo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {

    // metadata 
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var Demographic_Info = d3.select("#sample-metadata");
            
         
           Demographic_Info.html("");
    
         // grab the necessary demographic data
         // append the info to the panel
            Object.entries(result).forEach((key) => {   
                Demographic_Info.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // function for initial data rendering
    function init() {

        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // functions to display the data & plots to the page
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();