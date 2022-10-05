

// import * as Cesium from 'cesium';
// import "cesium/Build/Cesium/Widgets/widgets.css";

// Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NTE0ZTRhOS04MmQ0LTQ0ZjUtYTdjYS1kODdkZGE1YTk2OWIiLCJpZCI6MTEwMTgzLCJpYXQiOjE2NjQ5OTU5NzV9.AFcJpzgWXRLzvasrkWbIJrXzU4rlLFewsGqPg3NbVLQ';

// const viewer = new Cesium.Viewer('cesiumContainer', {
//   terrainProvider: Cesium.createWorldTerrain()
// });    
// // Add Cesium OSM Buildings, a global 3D buildings layer.
// const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
// // Fly the camera to San Francisco at the given longitude, latitude, and height.
// viewer.camera.flyTo({
//   destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
//   orientation : {
//     heading : Cesium.Math.toRadians(0.0),
//     pitch : Cesium.Math.toRadians(-15.0),
//   }
// });

import ReactDOM from "react-dom/client";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("wrapper"));
root.render(<App />);
