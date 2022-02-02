
const url = "https://edipasq.github.io/test/Movies.json";
//url = "http://localhost:8000/samp.json";

var jsondata = {};

d3.json(url).then(function(data) {
  
  jsondata=data;
  console.log(jsondata[0])
  
  doSomethingWithData()
 });
 
 function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
 function doSomethingWithData() {
    var menu = d3.select("#selDataset1");

    //var uniqueState = states.filter(onlyUnique);
    var states = []
    for (let i = 0; i < 3000; i++) {
        s = jsondata.year[i]
        states.push(s);
    }
    
    //states.filter(onlyUnique)
    var uniqueState = states.filter(onlyUnique)
    uniqueState.forEach((state) => {
        menu.append("option").text(state).property("value", state);
    });
    console.log(uniqueState)
    };

 function optionChanged(valor) {

        stateoption = valor;
        var rated = []
        var rating = []
        console.log(stateoption)
        for (var i = 0; i < 1700; i++) {
            // Setting the marker radius for the state by passing population into the markerSize function
            if (jsondata.year[i] === valor) {

             rated.push(jsondata.rated[i]);
             rating.push(jsondata.imdbrating[i])}
        }
        console.log(rated);
        console.log(rating);
    
        let trace3 = {
            x: rated,
            y: rating,
            text: rated,
            name: "Movies",
            type: "bar",
    
        };
    
        let traceData3 = [trace3];
        console.log(traceData3);
        let layout3 = {
            title: rated,
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
    
    
        };
        // var menubar = d3.select("#bar"); 
        //menubar.append('div').attr("id","plot"); 
        Plotly.newPlot("bar", traceData3, layout3);
    }
    