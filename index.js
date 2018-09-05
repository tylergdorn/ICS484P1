function loadDeathGraph(){
    fetch('cholera/choleraDeaths.tsv')
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        deathp(data);
    });

    // this works now.

    function deathp(data){
        // parse the raw tsv into something useful
        var dataparsed = Plotly.d3.tsv.parse(data);
        // initialize our holders for data
        var xData = [];
        var attackData = [];
        var deathData = [];
        var totalData = [];
        var cumulativeData = []
        // add all the data to the arrays
        var cumulation = 0;
        for(i in dataparsed){
            xData[i] = dataparsed[i].Date;
            attackData[i] = dataparsed[i].Attack;
            deathData[i] = dataparsed[i].Death;
            totalData[i] = parseInt(deathData[i]) + parseInt(attackData[i]);
            cumulation += parseInt(deathData[i]);
            cumulativeData[i] = cumulation
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
        data = [attackTrace, deathTrace, totalTrace, cumulativeTrace];
        plot2Div = document.getElementById('test');
        var layout = {
            title: "Cholera Deaths"
        };
    var myChart2=Plotly.plot(plot2Div, data, layout);
    }
}

// loadDeathGraph();

function aGrade(){
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

aGrade();