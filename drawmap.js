
function getBBCData(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'bbc_data.json', true); // Replace 'appDataServices' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
    return xobj.responseText;  
 }

async function getCountyLines(){
    var data = await d3.json("California_Counties.geojson");

    d3.select("#bbc_ca").append("g")
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                    .attr("d", d3.geoPath()
                        .projection(projection))
                    .attr("countyID", data.features.id)
    return true;
}

function colorScale (min, max, colorScheme)
    { var domain = [];
      var step = (max - min) /10;
      for(i=0; i<= 9; i++){
          domain[i] = min + step*i;
      }

        return d3.scaleThreshold()
            .domain(domain)
            .range(d3.schemeBlues[value]);
    }
//Removed the asynchronous read for the topo and license file