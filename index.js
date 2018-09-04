
// $(" #test ").text = requestLocalData("Cholera/choleraDeaths.tsv");
// console.log(requestLocalData("Cholera/choleraDeaths.tsv"));

var deathstsv// = Plotly.d3.tsv.parse(requestLocalData("Cholera/choleraDeaths.tsv"));
// console.log(deathstsv);

fetch('cholera/choleraDeaths.tsv')
.then(data.text() => console.log(data.text()));
// TODO: Make this work lmao