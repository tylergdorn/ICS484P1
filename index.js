// Make sure the document is loaded
document.addEventListener("DOMContentLoaded", function(event) { 
    // This is pretty gross, because it has to be. You can't pass parameters to event handlers, so this is where we're at.
    document.getElementById('alink').addEventListener('click', function(){showSection('a')});
    document.getElementById('blink').addEventListener('click', function(){showSection('b')});
    document.getElementById('clink').addEventListener('click', function(){showSection('c')});
    document.getElementById('mainlink').addEventListener('click', showAllSections());
    document.getElementById('alllink').addEventListener('click', showAllSections);
    // load graphs
    aGrade(document.getElementById('mapa'));
    bGrade();
    cGrade(document.getElementById('graphc'));
    showAllSections();
});

/*
    Functions for stylizing the page
*/

//shows one section of the data, either a, b, c. if it doesn't get one of these, it does nothing
function showSection(idChar){
    if (['a', 'b', 'c'].includes(idChar)){
        showNoSections();
        document.getElementById(idChar).style = 'display: default';
        // this is a terrible hack, and i'm sorry. 
        // but i'm also lazier than I am sorry.
        document.getElementById(idChar + 'link').classList.add('active');
    }
}

function showAllSections(){
    showNoSections();
    let sections = document.getElementById('main').children;
    for(let s = 0; s < sections.length; s++){
        sections[s].style = 'display: default';
    }
    let alllink = document.getElementById('alllink').classList.add('active');
}

function showNoSections(){
    let sections = document.getElementById('main').children;
    for(let s = 0; s < sections.length; s++){
        sections[s].style = 'display: none';
    }
    let links = document.getElementById('links').children;
    for(let s = 0; s < links.length; s++){
        if(links[s].classList.contains('active')){
            links[s].classList.remove('active');
        }
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

    // rendering the data we read in
    function deathp(data, id){
        // parse the raw tsv into something useful
        var dataparsed = Plotly.d3.tsv.parse(data);
        // initialize our holders for data
        var xData = [];
        var attackData = [];
        var deathData = [];
        var totalData = [];
        var cumulativeData = [];
        var cumulativeAttackData = [];
        // add all the data to the arrays
        var cumulation = 0;
        var cumulationAttack = 0;
        for(i in dataparsed){
            xData[i] = dataparsed[i].Date;
            attackData[i] = dataparsed[i].Attack;
            deathData[i] = dataparsed[i].Death;
            totalData[i] = parseInt(deathData[i]) + parseInt(attackData[i]);
            cumulation += parseInt(deathData[i]);
            cumulationAttack += parseInt(attackData[i]);
            cumulativeData[i] = cumulation;
            cumulativeAttackData[i] = cumulationAttack;
        }
        // add all the data to the traces
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
            y: cumulativeAttackData,
            type: 'line',
            name: 'Cumulative Cholera Attacks'
        };
        var cumulativeTrace = {
            x: xData,
            y: cumulativeData,
            type: 'line',
            name: 'Cumulative Cholera Deaths'
        };

        // also add data to table
        var tableValues = [
            xData,
            attackData,
            deathData,
            totalData,
            cumulativeAttackData,
            cumulativeData
        ]
        var tableData = {
            type: 'table',
            header: {
                values: [['Date'], ['Cholera Attacks'], ['Cholera Deaths'], ['Total Cholera Incidents'], ['Cumulative Cholera Deaths'], ['Cumulative Cholera Attacks']],
                fill: { color: "lightgrey" }
            },
            cells: {
                values: tableValues,
            }
        }
        var tableLayout = {
            title: "Cholera Data"
        }
        // render the table
        var table = Plotly.plot('tablec', [tableData], tableLayout);
        
        data = [attackTrace, deathTrace, totalTrace, cumulativeTrace];
        plot2Div = id;
        var layout = {
            title: "Cholera Deaths",
            xaxis: {
                title: 'Time'
            },
            yaxis: {
                title: 'Number of Deaths/Attacks'
            }
        };
        // render the chart
        var myChart2 = Plotly.plot(plot2Div, data, layout);
    }
}


// This function fetches and renders part b graphs
function bGrade(){
    // it's important to note that d3 won't parse comments in csv and tsv correctly, so I need to remove those
    // in addition, the tsv file we were given had some spaces seperating elements, so this also needed to be fixed.
    fetch('cholera/naplesCholeraAgeSexData.tsv')
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        return Plotly.d3.tsv.parse(data)
    })
    .then((data) => {
        naples(data);
    });

    fetch('cholera/UKcensus1851.csv')
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        return Plotly.d3.csv.parse(data)
    })
    .then((data) => {
        census(data);
    });

    // this is an arrow function because it is idk
    let naples = (data) => {
        let age = [];
        let male = [];
        let female = [];
        for(datum in data){
            age.push(data[datum].age);
            male.push(data[datum].male);
            female.push(data[datum].female);
        }
        let tableValues = [
            age,
            male,
            female
        ];
        let tableData = {
            type: 'table',
            header: {
                values: [['Age'], ['Male'], ['Female']],
                fill: { color: "lightgrey" }
            },
            cells: {
                values: tableValues,
            }
        }
        let tableLayout = {
            title: "Cholera Deaths in Naples"
        }
        // render the table
        let table = Plotly.plot('naplestable', [tableData], tableLayout);

        // render bar charts
        var tracemale = {
            x: age,
            y: male,
            name: 'Male Deaths',
            type: 'bar'
          };
          
          var tracefemale = {
            x: age,
            y: female,
            name: 'Female Deaths',
            type: 'bar'
          };
          
          var data = [tracemale, tracefemale];
          
          var layout = {
                barmode: 'group',
                title: "Cholera Deaths in Naples, by age",
                xaxis: {
                    title: 'Age'
                },
                yaxis: {
                    title: 'Number of Deaths per 10,000 People'
                }
            };
          
          Plotly.newPlot('naplesbar', data, layout);
    }

    let census = (data) => {
        // arrays for holding our data
        let age = [];
        let male = [];
        let female = [];
        // total number of pops. 0 is male, 1 is female
        let total = [0, 0];
        let totalAge = [];
        for(i in data){
            total[0] += parseInt(data[i].male);
            total[1] += parseInt(data[i].female);
            age.push(data[i].age);
            male.push(data[i].male);
            female.push(data[i].female);
            let totalAgei = parseInt(data[i].male);
            totalAgei += parseInt(data[i].female);
            totalAge.push(totalAgei);
        }

        // render table
        let tableValues = [
            age,
            male,
            female,
            totalAge
        ];
        let tableData = {
            type: 'table',
            header: {
                values: [['Age'], ['Male'], ['Female'], ['Combined Population']],
                fill: { color: "lightgrey" }
            },
            cells: {
                values: tableValues,
            }
        }
        let tableLayout = {
            title: "UK 1851 Census Data",
        }
        // render the table
        let table = Plotly.plot('censustable', [tableData], tableLayout);
        // pi charts
        // male

        let malePie = [{
            values: male,
            labels: age,
            type: 'pie'
        }];
        let layoutpiemale = {title: 'Male Census Data'};
        Plotly.newPlot('censuspiemale', malePie, layoutpiemale);
        // female

        let femalePie = [{
            values: female,
            labels: age,
            type: 'pie'
        }];
        let layoutpiefemale = {title: 'Female Census Data'};
        Plotly.newPlot('censuspiefemale', femalePie, layoutpiefemale);

        // Census male and female bar chart
        var tracemale = {
            x: age,
            y: male,
            name: 'Males by age',
            type: 'bar'
          };
          
          var tracefemale = {
            x: age,
            y: female,
            name: 'Females by age',
            type: 'bar'
          };
          
          var data = [tracemale, tracefemale];
          var layout = {
                barmode: 'group',
                title: "UK 1851 Census data, by sex and age",
                xaxis: {
                    title: 'Age'
                },
                yaxis: {
                    title: 'Number of People'
                }
            };
          Plotly.newPlot('censusbar', data, layout);

          let malefemale = [{
            values: total,
            labels: ['Male', 'Female'],
            type: 'pie'
        }];
        let layoutpiemalefemale = {title: 'Total Census Data'};
        Plotly.newPlot('censusmenwomen', malefemale, layoutpiemalefemale);
    }
}

// this function fetches and renders part a data
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
        
        for(dat in dataparsed){
            const datum = dataparsed[dat];
            const keys = Object.keys(datum);
            const latlong = [datum[keys[1]], datum[keys[0]]];
            // this is the infected well
            if(dat == 0){
                var circle = L.circle(latlong, {
                    color: 'purple',
                    fillColor: 'purple',
                    fillOpacity: 1,
                    radius: 5
                });
                circle.bindPopup('This is the location of the infected well.');
            }
            // This is for the normal wells
            else{
                var circle = L.circle(latlong, {
                    color: 'blue',
                    fillColor: 'blue',
                    fillOpacity: 1,
                    radius: 5
                });
                circle.bindPopup('This is a location of a well.');
            }
            circle.addTo(mymap);
        }
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
            const latlong = [datum[keys[2]], datum[keys[1]]];
            const deaths = datum[keys[0]];
            var circle = L.circle(latlong, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: deaths
            });
            if(deaths == 1){
                // this is how we bind popups when you click on the geometry
                circle.bindPopup('One person died here.');
            }
            else {
                circle.bindPopup(`${deaths} people died here.`);
            }
            circle.addTo(mymap);
        }
    }

}