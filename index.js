// Make sure the document is loaded
document.addEventListener("DOMContentLoaded", function(event) { 
    // This is pretty gross, because it has to be. You can't pass parameters to event handlers, so this is where we're at.
    document.getElementById('alink').addEventListener('click', function(){showSection('a')});
    document.getElementById('blink').addEventListener('click', function(){showSection('b')});
    document.getElementById('clink').addEventListener('click', function(){showSection('c')});
    // load graphs
    aGrade(document.getElementById('mapa'));
    //bGrade();
    //cGrade(document.getElementById('graphc'));
    showAllSections();
});

/*
    Functions for stylizing the page
*/

//shows one section of the data, either a, b, c. if it doesn't get one of these, it does nothing
function showSection(idChar){
    console.log('something happened');
    if (['a', 'b', 'c'].includes(idChar)){
        showNoSections()
        document.getElementById(idChar).style = 'display: default';
    }
}

function showAllSections(){
    let sections = document.getElementById('main').children;
    for(let s = 0; s < sections.length; s++){
        sections[s].style = 'display: default';
    }
}

function showNoSections(){
    let sections = document.getElementById('main').children;
    for(let s = 0; s < sections.length; s++){
        sections[s].style = 'display: none';
    }
}

/*
    Functions for creating the graphs
*/

// part c
function cGrade(id){
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
        var table = Plotly.plot('tablec', [tableData], tableLayout);
        
        data = [attackTrace, deathTrace, totalTrace, cumulativeTrace];
        plot2Div = id;
        var layout = {
            title: "Cholera Deaths"
        };
        var myChart2 = Plotly.plot(plot2Div, data, layout);
    }
}

function bGrade(){

}

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

    // the sweet spot. Determined by hand because i'm lazy
    let mymap = L.map('mapa').setView([51.514, -0.1365], 17);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
    }).addTo(mymap);

    // plotting wells on map
    function well(data){
        var dataparsed = Plotly.d3.csv.parse(data);
        console.log(dataparsed);
    }
    // plotting deaths on map
    function death(data){
        var dataparsed = Plotly.d3.csv.parse(data);
        // console.log(dataparsed);
        for(dat in dataparsed){
            // the csv is parsed in a weird way. rather than changing it I am working around it here.
            // It is parsed to json with some numbers as the field. I didn't want to hard code it. 
            const datum = dataparsed[dat];
            const keys = Object.keys(datum);
            L.marker([datum[keys[2]], datum[keys[1]]]).addTo(mymap);
        }
    }

}