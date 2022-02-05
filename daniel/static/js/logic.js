let selectedRatings, selectedGenres, selectedDirectors, selectedWriters, selectedActors, selectedLanguages, selectedCountries, selectedStars;
let directorNames, writerNames, actorNames, languageNames, countryNames, starNames, ratingNames, genreNames;

d3.json("/actors").then((data) => {
    //printinb data
    console.log(data);

    actorNames = data.map(row => row.Actor);

    // adding ids in the dropdown menu
    d3.select("#actor").selectAll('option')
        .data(actorNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

d3.json("/country").then((data) => {
    //printinb data
    console.log(data);

    countryNames = data.map(row => row.Country);

    // adding countries in the dropdown menu
    d3.select("#country").selectAll('option')
        .data(countryNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

d3.json("/language").then((data) => {
    //printinb data
    console.log(data);

    languageNames = data.map(row => row.Language);

    // adding languages in the dropdown menu
    d3.select("#language").selectAll('option')
        .data(languageNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

d3.json("/writer").then((data) => {
    //printinb data
    console.log(data);

    writerNames = data.map(row => row.Writer);

    // adding writers in the dropdown menu
    d3.select("#writer").selectAll('option')
        .data(writerNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

// Rated selection
d3.json("/rated").then((data) => {
    //printinb data
    console.log(data);

    ratingNames = data.map(row => row.Ratings);

    // adding rates in the dropdown menu
    d3.select("#rated").selectAll('option')
        .data(ratingNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

// genres selection
d3.json("/genre").then((data) => {
    //printinb data
    console.log(data);

    genreNames = data.map(row => row.genres);

    // adding genres in the dropdown menu
    d3.select("#genre").selectAll('option')
        .data(genreNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

d3.json("/director").then((data) => {
    //printinb data
    console.log(data);

    directorNames = data.map(row => row.director);

    // adding writers in the dropdown menu
    d3.select("#director").selectAll('option')
        .data(directorNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

d3.json("/star").then((data) => {
    //printinb data
    console.log(data);

    starNames = data.map(row => row.star);

    // adding writers in the dropdown menu
    d3.select("#star").selectAll('option')
        .data(starNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });
});

$(document).ready(function () {
    // submit for prediction
    $('#predict').click(function () {
        console.log(selectedActors);
        // console.log(selectedLanguages);
        // console.log(selectedCountries);
        // console.log(selectedGenres);
        // console.log(selectedStars);

        let model = [];

        // Runtime
        let runtime = $("#runtime").val();
        model.push(runtime ? Number(runtime) : 0);

        // Budget
        let budget = $("#budget").val();
        model.push(budget ? Number(budget) : 0);

        // Country
        // console.log(selectedCountries);
        countryNames.forEach(val => {
            if (selectedCountries && selectedCountries.includes(val)) {
                model.push(1);
            } else {
                model.push(0);
            }
        });

        // Language
        // console.log(selectedLanguages);
        languageNames.forEach(val => {
            if (selectedLanguages && selectedLanguages.includes(val)) {
                model.push(1);
            } else {
                model.push(0);
            }
        });

        // Writer
        // console.log(selectedWriters);
        writerNames.forEach(val => {
            if (selectedWriters && selectedWriters.includes(val)) {
                model.push(1);
            } else {
                model.push(0);
            }
        });

        // Actor
        // console.log(selectedActors);
        actorNames.forEach(val => {
            if (selectedActors && selectedActors.includes(val)) {
                model.push(1);
            } else {
                model.push(0);
            }
        });


        // Rating
        // console.log(selectedRatings);
        ratingNames.forEach(val => {
            if (selectedRatings && selectedRatings.includes(val)) {
                model.push(1);
            } else {
                model.push(0);
            }
        });

        // Director
        // console.log(selectedDirectors);
        directorNames.forEach(val => {
            if (selectedDirectors && selectedDirectors.includes(val)) {
                model.push(1);
            } else {
                model.push(0);
            }
        });

        // Genre
        // console.log(selectedGenres);
        genreNames.forEach(val => {
            if (selectedGenres && selectedGenres.includes(val)) {
                model.push(1);
            } else {
                model.push(0);
            }
        });

        // Star
        // console.log(selectedStars);
        starNames.forEach(val => {
            if (selectedStars && selectedStars.includes(val)) {
                model.push(1);
            } else {
                model.push(0);
            }
        });

        // Plot
        let plot = $("#plot").val();
        model.push(plot ? plot : 0);

        console.log(model);

        d3.json("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(model)
        }).then((data) => {
            console.log(data);
            $("#prediction").text(data);
        });
    });
});