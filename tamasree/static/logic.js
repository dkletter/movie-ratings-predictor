d3.json("/actors").then((data) => {
    //printinb data
    // console.log(data);

    actorNames = data.map(row => row.Actor);

    // adding ids in the dropdown menu
    d3.select("#Actors").selectAll('option')
        .data(actorNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});


d3.json("/country").then((data) => {
    //printinb data
    // console.log(data);

    countryNames = data.map(row => row.Country);

    // adding countries in the dropdown menu
    d3.select("#Country").selectAll('option')
        .data(countryNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

d3.json("/language").then((data) => {
    //printinb data
    // console.log(data);

    languageNames = data.map(row => row.Language);

    // adding languages in the dropdown menu
    d3.select("#Language").selectAll('option')
        .data(languageNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});


d3.json("/writer").then((data) => {
    //printinb data
    //console.log(data);

    writerNames = data.map(row => row.Writer);

    // adding writers in the dropdown menu
    d3.select("#Writer").selectAll('option')
        .data(writerNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

ratedNames = ['R', 'PG-13', 'PG', 'G', 'NA']

d3.select("#Rated").selectAll('option')
    .data(ratedNames)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });

genre = ['Action', 'Comedy', 'Drama', 'Biography', 'Animation', 'Crime', 'Adventure',
    'Horror', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Musical', 'Sport', 'Sci-Fi', 'Family']

d3.select("#Genre").selectAll('option')
    .data(genre)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });

d3.json("/director").then((data) => {
    //printinb data
    //console.log(data);

    directorNames = data.map(row => row.director);

    // adding writers in the dropdown menu
    d3.select("#Director").selectAll('option')
        .data(directorNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

d3.json("/star").then((data) => {
    //printinb data
    //console.log(data);

    starNames = data.map(row => row.star);

    // adding writers in the dropdown menu
    d3.select("#Star").selectAll('option')
        .data(starNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});