// const viewDiv = document.getElementById('viewDiv')

require([
    
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

    let simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
    };

  

    function addPoint(longitude, latitude, properties, mag) {
        // popupTemplate atts
      

        const point = { //Create a point
            type: "point",
            longitude: longitude,
            latitude: latitude
        };

        const simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40],  // Orange
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
                content: "test"
            }
        });

        
        graphicsLayer.add(pointGraphic);
    }
    
    let view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: {
                x: window * 0.5,
                y: window * 0.5,
                z: 50000,
            },
            tilt: 10
        }
    });
    
    function moveView(longitude, latitude) {
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
    }




function renderCard (data) {
    return `<div class="card-base col">
    <div class="card mb-2">
        <img class="card-img-top" src="./TriangleEQ.png" alt="Card image cap">
        <div class="card-body">
            <h4 class="card-title">${data.properties.title}</h4>
            <div class="earthquake-info">
                <p class="card-text">Time: ${new Date(data.properties.time)}</p>
                <p class="card-text">Long: ${data.geometry.coordinates[0]}</p>
                <p class="card-text">Lat: ${data.geometry.coordinates[1]}</p>
                <p class="card-text">Mag: ${data.properties.mag}</p>
                <p class="card-text">Depth: ${data.geometry.coordinates[2]}</p>

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

    // document.addEventListener('DOMContentLoaded', function () {
        fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-07-07&limit=12')
        .then((res) => {
            return res.json();
        })
        .then(function(data) {
            
            let carousel = document.querySelector('.carousel-inner')
            carousel.innerHTML = ''
                for (let index = 0; index < 12; index += 3) {
                    carousel.innerHTML += renderSlide(data.features[index], data.features[index+1], data.features[index+2] )
                }
            document.querySelector('.carousel-item').classList.add('active')
            for (let index = 0; index < data.features.length; index++) {
                addPoint(data.features[index].geometry.coordinates[0], data.features[index].geometry.coordinates[1], data.features[index].properties, data.features[index].properties.mag * 10)

            }
            console.log(data.features)
            // enlargePoint(15)
        })
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
