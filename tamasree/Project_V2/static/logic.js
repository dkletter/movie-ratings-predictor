let selectedRatings, selectedGenres, selectedDirectors, selectedWriters, selectedActors, selectedLanguages, selectedCountries, selectedStars;
let directorNames, writerNames, actorNames, languageNames, countryNames, starNames;

d3.json("/actors").then((data) => {
    //printinb data
    // console.log(data);

    this.actorNames = data.map(row => row.Actor);

    // adding ids in the dropdown menu
    d3.select("#actor").selectAll('option')
        .data(this.actorNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#actor').multiselect({
        onChange: (element, checked) => {
            this.selectedActors = [];
            $('#actor option:selected').each((index, selVal) => {
                this.selectedActors.push($(selVal).val());
            });
        }
    });
});


d3.json("/country").then((data) => {
    //printinb data
    // console.log(data);

    this.countryNames = data.map(row => row.Country);

    // adding countries in the dropdown menu
    d3.select("#country").selectAll('option')
        .data(this.countryNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#country').multiselect({
        onChange: (element, checked) => {
            this.selectedCountries = [];
            $('#country option:selected').each((index, selVal) => {
                this.selectedCountries.push($(selVal).val());
            });
        }
    });
});

d3.json("/language").then((data) => {
    //printinb data
    // console.log(data);

    this.languageNames = data.map(row => row.Language);

    // adding languages in the dropdown menu
    d3.select("#language").selectAll('option')
        .data(this.languageNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#language').multiselect({
        onChange: (element, checked) => {
            this.selectedLanguages = [];
            $('#language option:selected').each((index, selVal) => {
                this.selectedLanguages.push($(selVal).val());
            });
        }
    });
});


d3.json("/writer").then((data) => {
    //printinb data
    //console.log(data);

    this.writerNames = data.map(row => row.Writer);

    // adding writers in the dropdown menu
    d3.select("#writer").selectAll('option')
        .data(this.writerNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#writer').multiselect({
        onChange: (element, checked) => {
            this.selectedWriters = [];
            $('#writer option:selected').each((index, selVal) => {
                this.selectedWriters.push($(selVal).val());
            });
        }
    });
});

// Rated selection
let ratingNames = ['G', 'NA', 'PG', 'PG-13', 'R']
d3.select("#rated").selectAll('option')
    .data(ratingNames)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });

let genreNames = ['Action', 'Adventure', 'Animation', 'Biography',
    'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'Horror', 'Musical',
    'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller']

d3.select("#genre").selectAll('option')
    .data(genreNames)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });

d3.json("/director").then((data) => {
    //printinb data
    console.log(data);

    this.directorNames = data.map(row => row.director);

    // adding writers in the dropdown menu
    d3.select("#director").selectAll('option')
        .data(this.directorNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#director').multiselect({
        onChange: (element, checked) => {
            this.selectedDirectors = [];
            $('#director option:selected').each((index, selVal) => {
                this.selectedDirectors.push($(selVal).val());
            });
        }
    });
});

d3.json("/star").then((data) => {
    //printinb data
    //console.log(data);

    this.starNames = data.map(row => row.star);

    // adding writers in the dropdown menu
    d3.select("#star").selectAll('option')
        .data(this.starNames)
        .enter()
        .append('option')
        .text((d) => { return d; })
        .attr("value", function (d) { return d; });

    // enable multi-select
    $('#star').multiselect({
        onChange: (element, checked) => {
            this.selectedStars = [];
            $('#star option:selected').each((index, selVal) => {
                this.selectedStars.push($(selVal).val());
            });
        }
    });
});

$(document).ready(function () {
    // enable multi-select for static values defined here
    $('#rated').multiselect({
        onChange: (element, checked) => {
            selectedRatings = [];
            $('#rated option:selected').each((index, selVal) => {
                selectedRatings.push($(selVal).val());
            });
        }
    });

    $('#genre').multiselect({
        onChange: (element, checked) => {
            selectedGenres = [];
            $('#genre option:selected').each((index, selVal) => {
                selectedGenres.push($(selVal).val());
            });
        }
    });
});

// submit for prediction
d3.select("#predict").on("click", () => {
    // console.log(this.selectedActors);
    // console.log(this.selectedLanguages);
    // console.log(this.selectedCountries);
    // console.log(this.selectedGenres);
    // console.log(this.selectedStars);

    let model = [];

    // Runtime
    let runtime = $("#runtime").val();
    model.push(runtime ? Number(runtime) : 0);

    // Budget
    let budget = $("#budget").val();
    model.push(budget ? Number(budget) : 0);

    // Country
    // console.log(this.selectedCountries);
    this.countryNames.forEach(val => {
        if (this.selectedCountries && this.selectedCountries.includes(val)) {
            model.push(1);
        } else {
            model.push(0);
        }
    });

    // Language
    // console.log(this.selectedLanguages);
    this.languageNames.forEach(val => {
        if (this.selectedLanguages && this.selectedLanguages.includes(val)) {
            model.push(1);
        } else {
            model.push(0);
        }
    });

    // Writer
    // console.log(this.selectedWriters);
    this.writerNames.forEach(val => {
        if (this.selectedWriters && this.selectedWriters.includes(val)) {
            model.push(1);
        } else {
            model.push(0);
        }
    });

    // Actor
    // console.log(this.selectedActors);
    this.actorNames.forEach(val => {
        if (this.selectedActors && this.selectedActors.includes(val)) {
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
    // console.log(this.selectedDirectors);
    this.directorNames.forEach(val => {
        if (this.selectedDirectors && this.selectedDirectors.includes(val)) {
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
    // console.log(this.selectedStars);
    this.starNames.forEach(val => {
        if (this.selectedStars && this.selectedStars.includes(val)) {
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