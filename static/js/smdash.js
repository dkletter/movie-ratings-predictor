const url = "https://edipasq.github.io/test/Movies.json";

var jsondata = {};


// funcion #1

d3.json(url).then(function(data) {
  
  jsondata=data;
  
  Init()
 });
 
 function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


/// funcion #2

function Init() {
    var menu = d3.select("#selDataset1");
    
    //var uniqueState = states.filter(onlyUnique);
    
    var yearss = []
    for (let i = 0; i < 1774; i++) {
        var yr = jsondata.released[i]
        
        s=yr.substring(0,4)
        yearss.push(s);
    }
    
    //yearss.filter(onlyUnique)
    var uniqueY = yearss.filter(onlyUnique)
    var sorty = uniqueY.sort(function(a, b){return a - b});
    sorty.forEach((yeart) => {
        menu.append("option").text(yeart).property("value", yeart);
    });
 optionChanged(sorty[0])   
 }

//// Fucntion #3

function optionChanged(valor) {
        
    stateoption = valor;
    var titles = []
    var rateds = []
    var ratingr = []
    var ratingpg = []
    var ratingpg13 = []
    var ratingna = []
    var ratingg = []
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

    for (var i = 0; i < 1774; i++) {
        
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
            else if (jsondata.rated[i] === "NA") {
              ratingna.push(jsondata.imdbrating[i])                    
                  
                  }
            else if (jsondata.rated[i] === "G") {
              ratingg.push(jsondata.imdbrating[i])
                    
                  }
       
        }
    }
   
   
CreateBarChart(movies,titles,rateds)  
create3dscatter(rating1r,rating2r,rating3r,rating1pg13,rating2pg13,rating3pg13,rating1pg,rating2pg,rating3pg)
CreateBudgetvsGenre(budgets,genres) 
CreateStartvsrating(stars,movies)
Createpie(ratingr,ratingpg13,ratingpg,ratingg,ratingna)
}   



/// Function #4
function CreateBarChart(movies,titles,rateds){
    
    var trace1 = {
        x: titles,
        y: movies,
        type: 'bar',           
       
        hoverinfo: rateds,
        text: rateds,
        marker: {
          color: 'blue',
          opacity: 0.6,
        }
      };
      
      var data = [trace1];
      
      var layout = {

         title: 'Movie IMDB Ratings by Rated Category'
        
      };
      
      Plotly.newPlot('bar', data, layout);
      
}


//// Function #5

function create3dscatter(rating1r,rating2r,rating3r,rating1pg13,rating2pg13,rating3pg13,rating1pg,rating2pg,rating3pg) {
    var trace1 = {
        x:rating1r, y: rating2r, z: rating3r,
        name: "R",
        mode: 'markers',
        marker: {
          color: 'red',
          size: 12,
          symbol: 'circle',
          line: {
          color: 'red',
          width: 1},
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
                color: 'blue',
                size: 12,
                symbol: 'circle',
                line: {
                color: 'blue',
                
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

    ///Function #6
    function CreateBudgetvsGenre(budgets,genres){
       
      
        var data = [{
            type: 'scatter',
            mode: 'markers',
            x: budgets,
            y: genres,
            text: '',
            marker: {
              size: 14,
              
          },
            transforms: [
                {
                    type: 'aggregate',
                    groups: genres,
                    aggregations: [
                      {target: 'x', func: 'avg'},
                      
                    ]
                 }
                                    
                ]
             }]
          
      
      var layout = {
        title: 'Budget mean by Genre',
        yaxis: {
          type: 'log'
        }
      }
      Plotly.newPlot('scatt', data) 
    }

    ///// Function #7
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

///////
    class Avg {
      constructor() {}
  
      static average(array) {
          var total = 0;
          var count = 0;
  
          jQuery.each(array, function(index, value) {
              total += value;
              count++;
          });
  
          return total / count;
      }
  }




    ///// Function pie
  function Createpie(ratingr,ratingpg13,ratingpg,ratingg,ratingna){
    avgr = Avg.average(ratingr)
    avgpg13 = Avg.average(ratingpg13)
    avgpg = Avg.average(ratingpg)
    avgg = Avg.average(ratingg)
    avgna = Avg.average(ratingna)
   
    var data = [{
      values: [avgr,avgpg,avgpg13,avgg,avgna],
      labels: ['R','PG','PG-13','G','NA'],
      type: "pie"
  }];

  var layout = {
      title: 'Most high rated movies per year',
      height: 350,
      width: 350
  };

  Plotly.newPlot("pie", data, layout);}