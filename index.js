
// $(" #test ").text = requestLocalData("Cholera/choleraDeaths.tsv");
// console.log(requestLocalData("Cholera/choleraDeaths.tsv"));

// = Plotly.d3.tsv.parse(requestLocalData("Cholera/choleraDeaths.tsv"));
// console.log(deathstsv);

fetch('cholera/choleraDeaths.tsv')
// this works but i don't like it
// .then(function(response){
//     console.log(response.text())
// })
.then((resp) => resp.text())
.then((resp) => console.log())
.then(deathp(resp))
.catch(console.log("something bad happened!"));
// TODO: Make this work lmao

function deathp(data){
    var data = Plotly.d3.tsv.parse(data);
    console.log(data)
}

