// const viewDiv = document.getElementById('viewDiv')

require([
    // esri API requirments
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/PopupTemplate",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
  

    ], function (esriConfig, Map, SceneView, PopupTemplate, Graphic, GraphicsLayer) {

    esriConfig.apiKey = "AAPK2ecbffa6b04c4595986f15d7b92b786360Vh3K-cqrwl9Lkxt35QsY601Zr-1ZKleqAXXTL-KMOrsqWOKsTFOz-P2vf8-Bpc";

    //map style
    const map = new Map({
        basemap: "arcgis-topographic",
        ground: "world-elevation",
    });
    // ?????? GraphicLayer() is some built-in class/requirement that needs to be intiated for graphics to be put on the map
    const graphicsLayer = new GraphicsLayer();
    // applied the Graphic layer on the map????????
    map.add(graphicsLayer);

    function addPoint(longitude, latitude, properties, mag) {
        // popupTemplate atts
        
    // point object (marker)
        const point = { //Create a point
            type: "point",
            longitude: longitude,
            latitude: latitude
        };
        //if statements change color and size based on mag. Mag is multiplied by 5 here because when we call, we multiply by 5 to make dots bigger/more dramatic size differences
        if(mag < 5) { //turns marker orange

            console.log('1')
            //marker properties
            const simpleMarkerSymbol = { 
                type: "simple-marker",
                color: [226, 119, 40],  // Orange
                size : mag,
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
            };
            //idk what Graphic does, but it is required to put down markers
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
                attributes: properties, 
                popupTemplate: { // earthquake details with point clicked
                    title: "{title}",
                    content: "Magnitude: {mag}"
                }
            });
            //???? also no idk
            graphicsLayer.add(pointGraphic);
        } else if(mag < 12.5 && mag >=5) { //turns marker blue
            console.log('2.5')
            let simpleMarkerSymbol = {
                type: "simple-marker",
                color: [20, 50, 220],  // Blue
                size : mag,
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
                    content: "Magnitude: {mag}"
                }
            });
            graphicsLayer.add(pointGraphic);
        } else if(mag < 25 && mag >=12.5) { //turns marker green
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
                    content: "Magnitude: {mag}"
                }
            });
            graphicsLayer.add(pointGraphic);
        } else if(mag >= 25) { //turns marker red
            console.log('larger than 5')
            let simpleMarkerSymbol = {
                type: "simple-marker",
                color: [240, 20, 50],  // Red
                size : mag,
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
                    content: "Magnitude: {mag}"
                }
            });
            graphicsLayer.add(pointGraphic);
        }
    }
     // main container/frame for the map
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
    //moves camera and highlights point clicked in carousel
    function moveView(longitude, latitude, mag) {
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
            outline: { //changes outline color
                color: [64,224,208], // Turqoise
                width: 3
            }
        };
        const pointGraphic = new Graphic({ //trying to have the window pop up
            geometry: point,
            symbol: simpleMarkerSymbol,
            popupTemplate: {
                title: "{title}",
                content: "Magnitude: {mag}"
            }
        });
        graphicsLayer.add(pointGraphic);  
    }




function renderCard (data) {
    return `<div class="card-base col">
    <div class="card mb-2">
        <img class="card-img-top" src="./TriangleEQ.png" alt="Card image cap">
        <div class="card-body">
            <h4 class="card-title">${data.properties.title}</h4>
            <div class="earthquake-info">
                <h6 class="card-text">Time: ${new Date(data.properties.time)}</h6>
                <p class="card-text">Magnitude: ${data.properties.mag}<br>
                Depth: ${data.geometry.coordinates[2]} km</p>

            </div>

            <a class="btn btn-primary" data-longitude="${data.geometry.coordinates[0]}" data-latitude="${data.geometry.coordinates[1]}" data-title="${data.properties.title}">Show Me</a>
        </div>
    </div>
</div>`
}

function renderSlide (card1, card2, card3) {
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
    // erathquake API fetch to get data
    // document.addEventListener('DOMContentLoaded', function () {
        fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-07-07&limit=60')
        .then((res) => {
            return res.json();
        })
        .then(function(data) {
            let carousel = document.querySelector('.carousel-inner')
            carousel.innerHTML = ''
                for (let index = 0; index < 60; index += 3) {
                    carousel.innerHTML += renderSlide(data.features[index], data.features[index+1], data.features[index+2] )
                }
            document.querySelector('.carousel-item').classList.add('active')
            //loops through the data to call the the addPoint() above
            for (let index = 0; index < data.features.length; index++) {
                addPoint(data.features[index].geometry.coordinates[0], data.features[index].geometry.coordinates[1], data.features[index].properties, data.features[index].properties.mag * 5)

            }
        })
        //moves camera on click, will also highlight marker as well
        document.addEventListener('click', function(e) {
            if(e.target.classList.contains('btn-primary')) {
                const longitude = e.target.dataset.longitude;
                const latitude = e.target.dataset.latitude;
                const title = e.target.dataset.title
                const time = e.target.dataset.time

                moveView(longitude, latitude)
                
            }
            
            
            
        });
});
