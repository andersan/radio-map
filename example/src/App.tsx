import { Viewer, Entity, PointGraphics, EntityDescription } from "resium";
import { Cartesian3, createWorldTerrain, Color } from "cesium";
import Cesium3DTile from "cesium/Source/Scene/Cesium3DTile";

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const terrainProvider = createWorldTerrain();

function App() {
    return (  
<Viewer 
  // terrainProvider={terrainProvider}

  // remove the clock and timeline for the stars behind the earth
  animation={false}
  timeline={false}

  // remove the buttons and options in top right corner
  navigationHelpButton={false}
  baseLayerPicker={false}
  projectionPicker={false}
  homeButton={false}
  sceneModePicker={false}
  // this is the search button
  geocoder={false}
  // fullscreenElement={true}

  // remove some effects from the globe
  // remove atmosphere along earth's edges
  skyAtmosphere={false}
  // remove stars
  skyBox={false}

  // imageryProvider={false}
  // creditContainer={"test"}
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }}>
  <Entity
    name="tokyo"
    position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}>
    <PointGraphics pixelSize={10} color={new Color(0,1,1,1)}/>
    <EntityDescription>
      <h1>Hello, world.</h1>
      <p>JSX is available here!</p>
    </EntityDescription>
  </Entity>
  <Entity
    position={position}
    name="NYC"
    description="Bronx?">
    <PointGraphics pixelSize={10} color={Color.RED} outlineColor={Color.BLUE} outlineWidth={1} />
  </Entity>
</Viewer>
  );
}
// TODO: integrate "camera fly to" for animation of moving to another station?? 
// https://resium.reearth.io/examples/?path=/story/cameraflyto--basic

// TODO: list of radio stations https://stackoverflow.com/questions/29426203/how-to-find-or-search-for-fm-radio-streaming-url

export default App;
