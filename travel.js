// const viewDiv = document.getElementById('viewDiv')

require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",

    "esri/Graphic",
    "esri/layers/GraphicsLayer"

    ], function (esriConfig, Map, SceneView, Graphic, GraphicsLayer) {

    esriConfig.apiKey = "AAPK2ecbffa6b04c4595986f15d7b92b786360Vh3K-cqrwl9Lkxt35QsY601Zr-1ZKleqAXXTL-KMOrsqWOKsTFOz-P2vf8-Bpc";

    const map = new Map({
        basemap: "arcgis-topographic",
        ground: "world-elevation",
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);


    const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
    };


    function addPoint(longitude, latitude) {
        const point = { //Create a point
            type: "point",
            longitude: longitude,
            latitude: latitude
        };
        const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol
        });
        graphicsLayer.add(pointGraphic);
    }
    
    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: {
                x: -110.808,
                y: 30.961,
                z: 50000,
            },
            tilt: 10
        }
    });

    // document.addEventListener('DOMContentLoaded', function () {
        fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-07-07&limit=10')
        .then((res) => {
            return res.json();
        })
        .then(function(data) {
            console.log(data.features)
            let card = document.querySelector('.info-bar')
            let window = document.querySelector('.card-window')
            for (let index = 0; index < 5; index++) {
                window.appendChild(card)
                card.innerHTML = `
                <div class="card-body">
                <h2 class="card-title">Seismic Info</h2>
                <h4>Time</h4>
                <p>${data.features[index].properties.time}</p>
                <h4>Mag</h4>
                <p>${data.features[index].properties.mag}</p>
                <h4>Long</h4>
                <p>${data.features[index].geometry.coordinates[0]}</p>
                <h4>Lat</h4>
                <p>${data.features[index].geometry.coordinates[1]}</p>
                <h4>Depth</h4>
                <p>${data.features[index].geometry.coordinates[2]}</p>
                </div>`
            }
            for (let index = 0; index < data.features.length; index++) {
                addPoint(data.features[index].geometry.coordinates[0], data.features[index].geometry.coordinates[1])
                
            }
    
    });
    // });

});







// document.addEventListener('DOMContentLoaded', function () {


//     fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02")
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data.features)

//         });
// });