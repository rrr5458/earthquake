// esri API requirments
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

    // earthquake details with point clicked
    const popupTemplate = {
        title: "{Name}",
        content: "{Description}"
    }

    // API method to draw points
    function addPoint(longitude, latitude, title, time) {
        // popupTemplate atts
        const attributes = {
            Name: title,
            Description: new Date(time)
        }
        // point object (marker)
        const point = { //Create a point
            type: "point",
            longitude: longitude,
            latitude: latitude
        };
        // API new graphic object
        const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            attributes: attributes,
            popupTemplate: popupTemplate
        });
        graphicsLayer.add(pointGraphic);
    }

    // main container/frame for the map (required)
    new SceneView({
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
    // erathquake API fetch to get data
    fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-07-07&limit=10')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const window = document.querySelector('.card-window')
            // loopthing throught data
            data.features.forEach(feature => {
                // creating a new card for each earthquake (feature) with class 'info-bar'
                let card = document.createElement('div')
                card.classList.add('info-bar')
                // creating card inner elements
                card.innerHTML = `
                <div class="card-body">
                <h3 class="card-title">${feature.properties.title}</h3>
                <h4>Time</h4>
                <p>${new Date(feature.properties.time)}</p>
                <h4>Mag</h4>
                <p>${feature.properties.mag}</p>
                <h4>Long</h4>
                <p>${feature.geometry.coordinates[0]}</p>
                <h4>Lat</h4>
                <p>${feature.geometry.coordinates[1]}</p>
                <h4>Depth</h4>
                <p>${feature.geometry.coordinates[2]}</p>
                </div>`
                // feature.properties.time returns time in number format, hence we instantiate a new date obj
                // add to container
                window.appendChild(card)
                // calling the API addPoint method
                addPoint(
                    // coordinates
                    feature.geometry.coordinates[0],
                    feature.geometry.coordinates[1],
                    // title and time (for pop up)
                    feature.properties.title,
                    feature.properties.time
                )
            });
        });
});