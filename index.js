
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
    // parse the raw tsv into something useful
    var dataparsed = Plotly.d3.tsv.parse(data);
    // initialize our holders for data
    xData = [];
    attackData = [];
    deathData = [];
    totalData = [];
    // add all the data to the arrays
    for(i in dataparsed){
        xData[i] = dataparsed[i].Date;
        attackData[i] = dataparsed[i].Attack;
        deathData[i] = dataparsed[i].Death;
        totalData[i] = parseInt(deathData[i]) + parseInt(attackData[i]);
    }
    var attackTrace = {
        x: xData,
        y: attackData,
        type: 'bar',
        name: 'Cholera Attacks'
    };
    var deathTrace = {
        x: xData,
        y: deathData,
        type: 'bar',
        name: 'Cholera Deaths'
    };
    var totalTrace = {
        x: xData,
        y: totalData,
        type: 'bar',
        name: 'Total Cholera Incidents'
    };
    data = [attackTrace, deathTrace, totalTrace];
    plot2Div = document.getElementById('test');
    var layout = {
        title: "Cholera Deaths"
    };
   var myChart2=Plotly.plot(plot2Div, data, layout);
}

