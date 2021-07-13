// const viewDiv = document.getElementById('viewDiv')

require([
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    // esri API requirments
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/PopupTemplate",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",


], function (esriConfig, Map, SceneView, PopupTemplate, Graphic, GraphicsLayer) {

    esriConfig.apiKey = "AAPK2ecbffa6b04c4595986f15d7b92b786360Vh3K-cqrwl9Lkxt35QsY601Zr-1ZKleqAXXTL-KMOrsqWOKsTFOz-P2vf8-Bpc";

    const map = new Map({
        basemap: "arcgis-topographic",
        ground: "world-elevation",
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);


    function addPoint(longitude, latitude, properties, mag) {
        // popupTemplate atts
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        
    // point object (marker)
=======
=======
>>>>>>> Stashed changes
        let convertedCoordinates = convertDMS(longitude, latitude);


>>>>>>> Stashed changes
        const point = { //Create a point
            type: "point",
            longitude: longitude,
            latitude: latitude
        };
        if (mag < 5) { //turns marker orange

            const simpleMarkerSymbol = {
                type: "simple-marker",
                color: [226, 119, 40],  // Orange
                size: mag,
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
            };
             
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
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
            graphicsLayer.add(pointGraphic);
        } else if (mag < 12.5 && mag >= 5) { //turns marker blue
            let simpleMarkerSymbol = {
                type: "simple-marker",
                color: [20, 50, 220],  // Blue
                size: mag,
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
                attributes: properties,
                popupTemplate: {
                    title: "{title}",
                    content: `Magnitude: {mag} <br>
                    <br>
                    ${convertedCoordinates}
                    `,
                    
                }
            });
            graphicsLayer.add(pointGraphic);
        } else if (mag < 25 && mag >= 12.5) { //turns marker green
            console.log('2.5 and 5')
            let simpleMarkerSymbol = {
                type: "simple-marker",
                color: [60, 179, 113],  // Green
                size: mag,
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
                attributes: properties,
                popupTemplate: {
                    title: "{title}",
                    content: `Magnitude: {mag} <br>
                    <br>
                    ${convertedCoordinates}
                    `,
                    
                }
            });
            graphicsLayer.add(pointGraphic);
        } else if (mag >= 25) { //turns marker red
            let simpleMarkerSymbol = {
                type: "simple-marker",
                color: [240, 20, 50],  // Red
                size: mag,
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
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
            graphicsLayer.add(pointGraphic);
        }

        // const pointGraphic = new Graphic({
        //     geometry: point,
        //     symbol: simpleMarkerSymbol,
        //     attributes: properties,
        //     popupTemplate: {
        //         title: "{title}",
        //         content: "test"
        //     }
        // });


        // graphicsLayer.add(pointGraphic);
    }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
     // main container/frame for the map
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    
    function moveView(longitude, latitude, mag) {
=======
=======
>>>>>>> Stashed changes

    function moveView(longitude, latitude) {
>>>>>>> Stashed changes
        let view = new SceneView({
            container: "viewDiv",
            map: map,
            camera: {
                position: {
                    x: longitude,
                    y: latitude,
                    z: 100000,
                },
                tilt: 10
            }
        });
        const point = { //Create a point
            type: "point",
            longitude: longitude,
            latitude: latitude
        };
        let simpleMarkerSymbol = {
            type: "simple-marker",
            outline: {
                color: [64,224,208], // Turqoise
                width: 3
            }
        };
        const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            popupTemplate: {
                title: "{title}",
                content: "Magnitude: {mag}"
            }
        });
        graphicsLayer.add(pointGraphic);  
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

            <a class="btn btn-primary" data-longitude="${data.geometry.coordinates[0]}" data-latitude="${data.geometry.coordinates[1]}" data-title="${data.properties.title}">Show Me</a>
        </div>
    </div>
</div>`
    }

    function renderSlide(card1, card2, card3) {
        let slideHtml = `
<div class="carousel-item">
    <div class="container container-fluid">
        <div class="row card-row">`
        if (card1) {
            slideHtml += renderCard(card1)
        }
        if (card2) {
            slideHtml += renderCard(card2)
        }
        if (card3) {
            slideHtml += renderCard(card3)
        }

        slideHtml += `
        </div>
    </div>
</div>`
        return slideHtml
    }

    // document.addEventListener('DOMContentLoaded', function () {
    fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-07-07&limit=60')
        .then((res) => {
            return res.json();
        })
        .then(function (data) {

            let carousel = document.querySelector('.carousel-inner')
            carousel.innerHTML = ''
            for (let index = 0; index < 60; index += 3) {
                carousel.innerHTML += renderSlide(data.features[index], data.features[index + 1], data.features[index + 2])
            }
            document.querySelector('.carousel-item').classList.add('active')
            for (let index = 0; index < data.features.length; index++) {
                addPoint(data.features[index].geometry.coordinates[0], data.features[index].geometry.coordinates[1], data.features[index].properties, data.features[index].properties.mag * 5)

            }
            // console.log(data.features)
            // enlargePoint(15)
        })
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-primary')) {
            const longitude = e.target.dataset.longitude;
            const latitude = e.target.dataset.latitude;
            const title = e.target.dataset.title
            const time = e.target.dataset.time

            moveView(longitude, latitude)

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

        return convertedLat + ' ' + cardinalLat + '<br>' + convertedLong + ' ' + cardinalLong;
    }

});
