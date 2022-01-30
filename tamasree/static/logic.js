d3.json("/actors").then((data) => {
    //printinb data
    // console.log(data);

    actorNames = data.map(row => row.Actor);

    // adding ids in the dropdown menu
    d3.select("#actor").selectAll('option')
        .data(actorNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#actor').multiselect();
});


d3.json("/country").then((data) => {
    //printinb data
    // console.log(data);

    countryNames = data.map(row => row.Country);

    // adding countries in the dropdown menu
    d3.select("#country").selectAll('option')
        .data(countryNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#country').multiselect();
});

d3.json("/language").then((data) => {
    //printinb data
    // console.log(data);

    languageNames = data.map(row => row.Language);

    // adding languages in the dropdown menu
    d3.select("#language").selectAll('option')
        .data(languageNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#language').multiselect();
});


d3.json("/writer").then((data) => {
    //printinb data
    //console.log(data);

    writerNames = data.map(row => row.Writer);

    // adding writers in the dropdown menu
    d3.select("#writer").selectAll('option')
        .data(writerNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#writer').multiselect();
});

ratedNames = ['R', 'PG-13', 'PG', 'G', 'NA']

d3.select("#rated").selectAll('option')
    .data(ratedNames)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });

genre = ['Action', 'Comedy', 'Drama', 'Biography', 'Animation', 'Crime', 'Adventure',
    'Horror', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Musical', 'Sport', 'Sci-Fi', 'Family']

d3.select("#genre").selectAll('option')
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
    d3.select("#director").selectAll('option')
        .data(directorNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#director').multiselect();
});

d3.json("/star").then((data) => {
    //printinb data
    //console.log(data);

    starNames = data.map(row => row.star);

    // adding writers in the dropdown menu
    d3.select("#star").selectAll('option')
        .data(starNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#star').multiselect();
});

$(document).ready(function () {
    // enable multi-select for static values defined here
    $('#rated').multiselect();
    $('#genre').multiselect();
});