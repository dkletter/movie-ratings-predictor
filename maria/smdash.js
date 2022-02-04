
const url = "https://edipasq.github.io/test/sampleM.json";
//url = "http://localhost:8000/samp.json";

var jsondata = {};


// funcion

d3.json(url).then(function(data) {
  
  jsondata=data;
  console.log('hi')
  doSomethingWithData()
 });
 
 function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


/// Otra funcion

function doSomethingWithData() {
    var menu = d3.select("#selDataset1");

    //var uniqueState = states.filter(onlyUnique);
    var states = []
    for (let i = 0; i < 1800; i++) {
        s = jsondata.year[i]

        states.push(s);
    }
    
    //states.filter(onlyUnique)
    var uniqueState = states.filter(onlyUnique)
    uniqueState.forEach((state) => {
        menu.append("option").text(state).property("value", state);
    });
    
 }

//// Fucncion #3

function optionChanged(valor) {
        
    stateoption = valor;
    var titles = []
    var rateds = []
    var ratingr = []
    var ratingpg = []
    var ratingpg13 = []
    var movies = []
    var colors = []
    var rating1r = []
    var rating2r = []
    var rating3r = []
    var rating1pg = []
    var rating2pg = []
    var rating3pg = []
    var rating1pg13 = []
    var rating2pg13 = []
    var rating3pg13 = []
    var genres = []
    var budgets = []
    var stars = []

    for (var i = 0; i < 1700; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function
        var yearst = jsondata.released[i]
        
        
        if (yearst.substring(0,4) === valor) {
             genres.push(jsondata.genre[i])
             budgets.push(jsondata.budget[i])
             titles.push(jsondata.title[i])
             rateds.push(jsondata.rated[i])
             movies.push(jsondata.imdbrating[i])
             stars.push(jsondata.star[i])
             if(jsondata.rated[i] === "R") {
                ratingr.push(jsondata.imdbrating[i])
                rating1r.push(jsondata.rotten_tomato_rating[i]) 
                rating2r.push(jsondata.internet_movie_database_rating[i])  
                rating3r.push(jsondata.metacritic_rating[i])
                }
            else if (jsondata.rated[i] === "PG-13") {
                ratingpg13.push(jsondata.imdbrating[i])
                rating1pg13.push(jsondata.rotten_tomato_rating[i]) 
                rating2pg13.push(jsondata.internet_movie_database_rating[i])  
                rating3pg13.push(jsondata.metacritic_rating[i])
                
                }
            else if (jsondata.rated[i] === "PG") {
            ratingpg.push(jsondata.imdbrating[i])
                rating1pg.push(jsondata.rotten_tomato_rating[i]) 
                rating2pg.push(jsondata.internet_movie_database_rating[i])  
                rating3pg.push(jsondata.metacritic_rating[i])    
                }
       
        }
    }
CreateBarChart(movies,titles,rateds)  
create3dscatter(rating1r,rating2r,rating3r,rating1pg13,rating2pg13,rating3pg13,rating1pg,rating2pg,rating3pg)
CreateBudgetvsGenre(budgets,genres) 
CreateStartvsrating(stars,movies)
}   



/// Function separation
function CreateBarChart(movies,titles,rateds){
    console.log(rateds)
    var trace1 = {
        x: titles,
        y: movies,
        type: 'bar',           
        textposition: 'auto',
        hoverinfo: rateds,
        text: rateds,
        marker: {
          color: 'red',
          opacity: 0.6,
          line: {
            
            width: 2
          }
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Movie IMDB Ratings by Rated Category'
        
      };
      
      Plotly.newPlot('bar', data, layout);
      
}


//// Another function

function create3dscatter(rating1r,rating2r,rating3r,rating1pg13,rating2pg13,rating3pg13,rating1pg,rating2pg,rating3pg) {
    var trace1 = {
        x:rating1r, y: rating2r, z: rating3r,
        name: "R",
        mode: 'markers',
        marker: {
            size: 12,
            line: {
            color: 'rgba(217, 217, 217, 0.14)',
            width: 0.5},
            opacity: 0.8},
        type: 'scatter3d'
    };
    
    var trace2 = {
        x:rating1pg13, y: rating2pg13, z: rating3pg13,
        name: "PG-13",
        mode: 'markers',
        marker: {
            color: 'rgb(127, 127, 127)',
            size: 12,
            symbol: 'circle',
            line: {
            color: 'rgb(204, 204, 204)',
            width: 1},
            opacity: 0.8},
        type: 'scatter3d'};
    
        var trace3 = {
            x:rating1pg, y: rating2pg, z: rating3pg,
            mode: 'markers',
            name: "PG",
            marker: {
                color: 'red',
                size: 12,
                symbol: 'circle',
                line: {
                color: 'red',
                
                width: 1},
                opacity: 0.8},
            type: 'scatter3d'};
    
    var data = [trace1, trace2,trace3];
    var layout = {margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0
      },
      scene: {
		xaxis:{title: 'X Rotten Tomato Ratings'},
		yaxis:{title: 'Y Internet Ratings'},
		zaxis:{title: 'Z Metacritic Ratings'},
		}
    };
    Plotly.newPlot('rat3d', data, layout);
    };

    ///Another function
    function CreateBudgetvsGenre(budgets,genres){
        var subject = genres
        var score = budgets
        
        var data = [{
          type: 'scatter',
          x: subject,
          y: score,
          mode: 'markers',
          transforms: [{
            type: 'groupby',
            groups: subject
                     }]
        }]
        
        Plotly.newPlot('scatt', data)
    }

    ///// Another Function
    function CreateStartvsrating(stars,movies){
        var subject = stars
        var score = movies
        
        var data = [{
          type: 'scatter',
          x: subject,
          y: score,
          mode: 'markers',
          transforms: [{
            type: 'groupby',
            groups: subject
                     }]
        }]
        
        Plotly.newPlot('scatt2', data)
    }
