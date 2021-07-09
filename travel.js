// const viewDiv = document.getElementById('viewDiv')

require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView"
], function(esriConfig,Map, SceneView) {

    esriConfig.apiKey = "AAPK2ecbffa6b04c4595986f15d7b92b786360Vh3K-cqrwl9Lkxt35QsY601Zr-1ZKleqAXXTL-KMOrsqWOKsTFOz-P2vf8-Bpc";

    const map = new Map ({
        basemap: "arcgis-topographic",
        ground: "world-elevation",
    });

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


    });