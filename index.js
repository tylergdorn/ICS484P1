
// $(" #test ").text = requestLocalData("Cholera/choleraDeaths.tsv");
// console.log(requestLocalData("Cholera/choleraDeaths.tsv"));

// = Plotly.d3.tsv.parse(requestLocalData("Cholera/choleraDeaths.tsv"));
// console.log(deathstsv);

fetch('cholera/choleraDeaths.tsv')
// this works but i don't like it
// .then(function(response){
//     console.log(response.text())
// })
// .then((resp) => resp.text())
// .then((resp) => console.log())
// .then(deathp(resp))
// .then(function(resp){
//     console.log(resp)
//     deathp(resp.text());
// })
.then((res) => {
    return res.text();
})
.then((data) => {
    deathp(data);
})
.catch(console.log("something bad happened!"));

// this works now.

function deathp(data){
    console.log(data);
    var dataparsed = Plotly.d3.tsv.parse(data);
    console.log(dataparsed);
}

