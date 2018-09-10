$(document).ready(function(){
function loadDeathGraph(id){
    fetch('cholera/choleraDeaths.tsv')
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        deathp(data, id);
    });


    function deathp(data, id){
        // parse the raw tsv into something useful
        var dataparsed = Plotly.d3.tsv.parse(data);
        // initialize our holders for data
        var xData = [];
        var attackData = [];
        var deathData = [];
        var totalData = [];
        var cumulativeData = [];
        // add all the data to the arrays
        var cumulation = 0;
        for(i in dataparsed){
            xData[i] = dataparsed[i].Date;
            attackData[i] = dataparsed[i].Attack;
            deathData[i] = dataparsed[i].Death;
            totalData[i] = parseInt(deathData[i]) + parseInt(attackData[i]);
            cumulation += parseInt(deathData[i]);
            cumulativeData[i] = cumulation;
        }
        var attackTrace = {
            x: xData,
            y: attackData,
            type: 'line',
            name: 'Cholera Attacks'
        };
        var deathTrace = {
            x: xData,
            y: deathData,
            type: 'line',
            name: 'Cholera Deaths'
        };
        var totalTrace = {
            x: xData,
            y: totalData,
            type: 'line',
            name: 'Total Daily Cholera Incidents'
        };
        var cumulativeTrace = {
            x: xData,
            y: cumulativeData,
            type: 'line',
            name: 'Cumulative Cholera Deaths'
        };

        var tableValues = [
            xData,
            attackData,
            deathData,
            totalData
        ]
        var tableData = {
            type: 'table',
            header: {
                values: [['Date'], ['Cholera Attacks'], ['Cholera Deaths'], ['Total Cholera Incidents']],
                fill: { color: "lightgrey" }
            },
            cells: {
                values: tableValues,
            }
        }
        var tableLayout = {
            title: "Cholera Data"
        }
        var table = Plotly.plot('table', [tableData], tableLayout);
        
        data = [attackTrace, deathTrace, totalTrace, cumulativeTrace];
        plot2Div = id;
        var layout = {
            title: "Cholera Deaths"
        };
        var myChart2 = Plotly.plot(plot2Div, data, layout);
    }
}
loadDeathGraph(document.getElementById('test'));

function aGrade(id){
    fetch('cholera/choleraPumpLocations.csv')
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        well(data);
    });

    fetch('cholera/choleraDeathLocations.csv')
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        death(data);
    });

    function well(data){
        var dataparsed = Plotly.d3.csv.parse(data);
        console.log(dataparsed);
    }
    function death(data){
        var dataparsed = Plotly.d3.csv.parse(data);
        console.log(dataparsed);
    }
}

// aGrade(document.getElementById('test'));


});

//shows one section of the data, either a, b, c. if it doesn't get one of these, it does nothing
function showSection(idChar){
    if (['a', 'b', 'c'].includes(idChar)){
        $('main').children().each(function(){
            var element = $(this);
            this.css()
        });
    }
}

function showAllSections(){

}