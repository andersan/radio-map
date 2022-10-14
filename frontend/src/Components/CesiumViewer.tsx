import { Viewer, PointPrimitive, PointPrimitiveCollection} from "resium";
import { Cartesian3, Color, Ion } from "cesium";
import {fetchAllPlacesJSONData, fetchSinglePlaceChannels, fetchSinglePlaceInfo} from '../APIs/rg-express-test-routes'
import {Place} from '../APIs/radio-garden-api/api'
import env from "../env.js"
import React from 'react'

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
// const terrainProvider = createWorldTerrain();

// TODO: load geo data from places-export-curl.json

// TODO: load places data from api??

// TODO: set up API calls so that when a place is selected, it gets that place's data

// TODO: build place data UI/nav


var placeData = await fetchAllPlacesJSONData();
// console.log(Object.keys(placeData));
// console.log("placeData");
// console.log(placeData);

function getPlaceSizeInPixels(size:number): number {
  return Math.max(3, Math.log(size) * 4);
}


Ion.defaultAccessToken = env["cesium_access_token"];

class CesiumViewer extends React.Component {
  viewer;
  constructor(props:any) {
    super(props);
  }

  componentDidMount(): void {

  }

  render() {
    return (
      <Viewer 
        // terrainProvider={terrainProvider}

        // remove the clock and timeline for the stars behind the earth
        animation={false}
        timeline={false}

        // save reference for later use

        // remove the buttons and options in top right corner
        navigationHelpButton={false}
        // baseLayerPicker={false}
        // projectionPicker={false}
        // homeButton={false}
        // sceneModePicker={false}
        // this is the search button
        geocoder={false}
        // fullscreenElement={true}

        // remove some effects from the globe
        // remove atmosphere along earth's edges
        skyAtmosphere={false}
        // remove stars
        skyBox={false}
        ref={e => {
          console.log("RENDER viewer");
          // this.state.viewer = e && e.cesiumElement;
        }}

        // imageryProvider={new TileMapServiceImageryProvider({
        //   // url: buildModuleUrl("Assets/Textures/NaturalEarthII"),
        //   url: buildModuleUrl("Assets/Textures/Earth/BlueMarble"),
        //   // url: buildModuleUrl("https://cesiumjs.org/tilesets/imagery/blackmarble"),
        // })}
        // imageryProvider = {new ArcGisMapServerImageryProvider({
        //     url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
        // })}
        // creditContainer={"test"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        >
        { <PointPrimitiveCollection>
          {
            placeData.data.list.map((place) => {
              return (
                <PointPrimitive
                  position={Cartesian3.fromDegrees(place.geo[0], place.geo[1], 0)}
                  color={Color.RED}
                  pixelSize={getPlaceSizeInPixels(place.size)}

                  onClick={async () => {
                    console.log("clicked on place " + place.url.split("/")[2]);
                    var placeInfo = await fetchSinglePlaceInfo(place.url.split("/")[2]);
                    console.log(placeInfo);
                    placeInfo = placeInfo["place-info"].data;
                    this.props.setSelectedPlace(placeInfo);
                  }}

                  onMiddleClick={async () => {
                    console.log("middle clicked on place " + place.url.split("/")[2]);
                    var channelInfo = await fetchSinglePlaceChannels(place.url.split("/")[2]);
                    console.log(channelInfo);
                    channelInfo = channelInfo["place-channels"].data.content[0].items[Math.floor(Math.random() * channelInfo["place-channels"].data.content[0].items.length)];
                    console.log(channelInfo);
                    console.log("set selected staton.");
                    this.props.setSelectedChannel(channelInfo);
                    console.log("finished set selected staton.");
                  }}
                />
              )
            })
          }
        </PointPrimitiveCollection> 
        }
      </Viewer>
    );
  }
}
// TODO: integrate "camera fly to" for animation of moving to another station?? 
// https://resium.reearth.io/examples/?path=/story/cameraflyto--basic

// TODO: list of radio stations https://stackoverflow.com/questions/29426203/how-to-find-or-search-for-fm-radio-streaming-url

export default CesiumViewer;