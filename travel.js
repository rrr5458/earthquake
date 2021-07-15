
//Using AMD to grab modules from esri
require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/PopupTemplate",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",

//All code is contained in this function in order to use the modules as paramters
], function (esriConfig, Map, SceneView, PopupTemplate, Graphic, GraphicsLayer) {

    esriConfig.apiKey = "AAPK2ecbffa6b04c4595986f15d7b92b786360Vh3K-cqrwl9Lkxt35QsY601Zr-1ZKleqAXXTL-KMOrsqWOKsTFOz-P2vf8-Bpc";
    //Map() module gives map style
    const map = new Map({
        basemap: "arcgis-topographic",
        ground: "world-elevation",
    });
    //GraphicsLayer() module is required to add points
    const graphicsLayer = new GraphicsLayer();
    //places graphics on map
    map.add(graphicsLayer);
    //object built in line145 to store point properties and earthquake dataa
    const points = {}
    //adds points to map using the below parameters
    function addPoint(longitude, latitude, properties, mag, id) {
        // popupTemplate atts
        let convertedCoordinates = convertDMS(longitude, latitude);

        const point = { //Create a point
            type: "point",
            longitude: longitude,
            latitude: latitude
        };
        //properties of orange markers
        const orangeMarkerSymbol = { 
            type: "simple-marker",
            color: [226, 119, 40],  // Orange
            size: mag,
            outline: {
                color: [255, 255, 255], // White
                width: 1
            }
        
        };
        //properties of blue markers
        const blueMarkerSymbol = {
            type: "simple-marker",
            color: [20, 50, 220],  // Blue
            size: mag,
            outline: {
                color: [255, 255, 255], // White
                width: 1
            }
        };
        //properties of green markers
        const greenMarkerSymbol = {
            type: "simple-marker",
            color: [60, 179, 113],  // Green
            size: mag,
            outline: {
                color: [255, 255, 255], // White
                width: 1
            }
        };
        //properties of red markers
        const redMarkerSymbol = {
            type: "simple-marker",
            color: [240, 20, 50],  // Red
            size: mag,
            outline: {
                color: [255, 255, 255], // White
                width: 1
            }
        };
        //????????
        let pointGraphic;
        //changes color and size of point based on mag
        if(mag < 7) { //turns marker orange

            pointGraphic = new Graphic({
                geometry: point,
                symbol: orangeMarkerSymbol,
                attributes: properties, 
                popupTemplate: { // earthquake details with point clicked
                    title: "{title}",
                    content: 
                    `Magnitude: {mag} <br>
                    <br>
                    ${convertedCoordinates}
                    `,
                    
                }
            });

        } else if (mag < 17.495 && mag >= 7) { //turns marker blue

            pointGraphic = new Graphic({
                geometry: point,
                symbol: blueMarkerSymbol,
                attributes: properties,
                popupTemplate: {
                    title: "{title}",
                    content: `Magnitude: {mag} <br>
                    <br>
                    ${convertedCoordinates}
                    `,
                    
                }
            });
        } else if (mag < 34.999 && mag >= 17.495) { //turns marker green

            pointGraphic = new Graphic({
                geometry: point,
                symbol: greenMarkerSymbol,
                attributes: properties,
                popupTemplate: {
                    title: "{title}",
                    content: `Magnitude: {mag} <br>
                    <br>
                    ${convertedCoordinates}
                    `,
                    
                }
            });
        } else if (mag >= 34.999) { //turns marker red

            pointGraphic = new Graphic({
                geometry: point,
                symbol: redMarkerSymbol,
                attributes: properties,
                popupTemplate: {
                    title: "{title}",
                    content: 
                    `Magnitude: {mag} <br>
                    <br>
                    ${convertedCoordinates}
                    `,
                }
            });
        }
        //adds point properties to points
        graphicsLayer.add(pointGraphic);
        //builds points object above when addPoints() is called. This will be used in moveView() to remove highlights
        points[id] = {
            graphic : pointGraphic,
            data : {longitude, latitude, properties, mag}
        }
    }
     // starting container/frame for the map
    let view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: {
                x: window * 0.5,
                y: window * 0.5,
                z: 25000,
            },
            tilt: 10
        }
    });
    //moves camera and highlights point on button click

    function moveView(longitude, latitude, mag, id) {
        let view = new SceneView({
            container: "viewDiv",
            map: map,
            camera: {
                position: {
                    x: longitude, //moves to this longitude
                    y: latitude, //moves to this latitude
                    z: 100000,
                },
                tilt: 10
            }
        });

        //highlights the selected earthquake
        points[id].graphic.symbol.outline.width = 4
        points[id].graphic.symbol.outline.color = [64,224,208]
        points[id].graphic.symbol.size = mag * 7
        }

        //removes highlight on second click

        function removeHighlight () {
            //returns an array of a given object's own property names; keys here = the ids of the earthquakes
            const keys = Object.keys(points)
            console.log(keys)
            for (let index = 0; index < keys.length; index++) {
                //outline width was 4 and turqoise, in order to remove it, we set it to 1 and white, like it is orginally after addPoints()
                points[keys[index]].graphic.symbol.outline.width = 1
                points[keys[index]].graphic.symbol.outline.color = [255, 255, 255]
                points[keys[index]].graphic.symbol.size = points[keys[index]].data.mag
                
    
}
        }


    function renderCard(data) {
        return `<div class="card-base col">
    <div class="card mb-2">
        <img class="card-img-top" src="./TriangleEQ.png" alt="Card image cap">
        <div class="card-body">
            <h4 class="card-title">${data.properties.title}</h4>
            <div class="earthquake-info">
                <h6 class="card-text">Time: ${new Date(data.properties.time)}</h6>
                <p class="card-text">Magnitude: ${Number(data.properties.mag).toFixed(2)}<br>
                Depth: ${Number(data.geometry.coordinates[2]).toFixed(2)} km</p>

            </div>

            <a class="btn btn-primary" data-longitude="${data.geometry.coordinates[0]}" data-latitude="${data.geometry.coordinates[1]}" data-title="${data.properties.title}" data-mag="${data.properties.mag}", data-id="${data.id}">Show Me</a>
        </div>
    </div>
</div>`
    }


    // Renders a slide with 3 cards as arguments (line 259)

    function renderSlide(card1, card2, card3) {
        // Each individual slide's Html layout includes the string portion below.
        let slideHtml = `
<div class="carousel-item">
    <div class="container container-fluid">
        <div class="row card-row">`
        // When data is passed into the 'card1' parameter, it is rendered in the 
        // first position of the 'card-row'
        if (card1) {
            slideHtml += renderCard(card1)
        }
        // When data is passed into the 'card2' parameter, it is rendered in the 
        // second position of the 'card-row'

        if (card2) {
            slideHtml += renderCard(card2)
        }
        // When data is passed into the 'card3' parameter, it is rendered in the 

        // third position of the 'card-row'
        if (card3) {
            slideHtml += renderCard(card3)
        }
        // The ending/closing html is added (+=) to the string and then returned to be 
        // displayed as the carousel innerHTML(line 259)
        slideHtml += `
        </div>
    </div>
</div>`
    return slideHtml
}

    // erathquake API fetch to get data

    fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-07-07&limit=3')
        .then((res) => {
            return res.json();
        })
        .then(function (data) {

            let carousel = document.querySelector('.carousel-inner')
            carousel.innerHTML = ''
            for (let index = 0; index < 3; index += 3) {
                carousel.innerHTML += renderSlide(data.features[index], data.features[index + 1], data.features[index + 2])
            }
            document.querySelector('.carousel-item').classList.add('active')
            //calls addPoint() for every earthquake
            for (let index = 0; index < data.features.length; index++) {
                addPoint(data.features[index].geometry.coordinates[0], data.features[index].geometry.coordinates[1], data.features[index].properties, data.features[index].properties.mag * 7, data.features[index].id)
            }

        })
        //triggers removeHighlight() and moveView() when user cliks "See More". 
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-primary')) {
            const longitude = e.target.dataset.longitude;
            const latitude = e.target.dataset.latitude;
            const title = e.target.dataset.title
            const time = e.target.dataset.time
            const mag = e.target.dataset.mag
            const id = e.target.dataset.id

            removeHighlight()
            moveView(longitude , latitude, mag, id)
        
        
        }
    });

    // takes a coordinate, takes the absolute value, and then truncates
    // converts the remainder of decimal into minutes
    // converts remainder of minutes into seconds
    function toDegreesMinutesAndSeconds(coordinate) {
        let absolute = Math.abs(coordinate);
        let degrees = Math.floor(absolute);
        let minutesLong = (absolute - degrees) * 60;
        let minutes = Math.floor(minutesLong);
        let seconds = Math.floor((minutesLong - minutes) * 60);

        return degrees + '\u00B0' + minutes + "'" + seconds + '"';

    }
    // checks if coordinate was positive or negative
    // returns a string of degrees, minutes, and seconds with correct syntax
    function convertDMS(lat, long) {
        let convertedLat = toDegreesMinutesAndSeconds(lat);
        let cardinalLat = lat >= 0 ? 'E' : 'W';

        let convertedLong = toDegreesMinutesAndSeconds(long);
        let cardinalLong = long >= 0 ? 'N' : 'S';

        return convertedLat + '  ' + cardinalLat + '<br>' + convertedLong + ' ' + cardinalLong;
    }

});
