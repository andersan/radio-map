// import { Viewer, PointPrimitive, PointPrimitiveCollection} from "resium";
import { Cartesian3, Color, Ion, Rectangle, Camera, Cartesian2, NearFarScalar } from "cesium";
import { PointPrimitive, PointPrimitiveCollection, Viewer } from "resium";
// import Cartesian3 from "cesium/Source/Core/Cartesian3";
// import Cartesian2 from "cesium/Source/Core/Cartesian2";
// import Color from "cesium/Source/Core/Color";
// import Camera from "cesium/Source/Scene/Camera";
// import Rectangle from "cesium/Source/Core/Rectangle";
// import NearFarScalar from "cesium/Source/Core/NearFarScalar";
// import Ion from "cesium/Source/Core/Ion";
import {fetchAllPlacesJSONData, /*fetchSinglePlaceChannels, fetchSinglePlaceInfo*/} from '../../shared/libs/rg-express-test-routes'
import {/*fetchAllPlacesJSONData,*/ fetchSinglePlaceChannels, fetchSinglePlaceInfo, fetchSingleChannelInfo} from '../../shared/libs/rg-express-routes-real'
// import {Place} from '../APIs/radio-garden-api/api'
// import env from "../../env.js"
import React from 'react'

// document.camera = Camera;

// const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
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
  return Math.max(10, Math.log(size) * 6);
}

async function waitForSeconds(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}


Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN!;

class CesiumViewer extends React.Component {
  viewer;
  user_position_label;
  viewerComponent;

  constructor(props:any) {
    super(props);

    this.showPosition = this.showPosition.bind(this);
  }

  componentDidMount(): void {
    console.log("CesiumViewer mounted!!!");
    console.log(this.viewerComponent);

    this.finishMounting();
  }

  finishMounting(): void {
    console.log("finishMounting");
    if (!this.viewerComponent || !this.viewerComponent.cesiumElement) {
      console.log("no viewerComponent");
      waitForSeconds(0.05).then(() => {
        this.finishMounting();
      });
      return;
    }
    // document.viewerComponent = this.viewerComponent;
    this.viewerComponent.cesiumElement.scene.globe.showGroundAtmosphere = false;
    var viewer = this.viewerComponent;
    var selectClosestPlace = this.selectClosestPlace;

    function handleMove() {
      // console.log("camera moved");
      // console.log(viewer.cesiumElement.scene.camera.positionCartographic);
      // console.log(viewer.cesiumElement.scene.camera.positionCartographic.height);
      var center = viewer.cesiumElement.scene.camera.position;
      console.log(center);

      selectClosestPlace(center);
    }

    if (this.viewerComponent) {
      console.log("listenForMovementOrZoom");
      this.viewerComponent.cesiumElement.scene.camera.moveEnd.addEventListener(function() {
        handleMove();
      });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    // add all places to the map
  this.setState({
    places: placeData.data.list
  });
  }

  selectClosestPlace(center) {
    console.log("selectClosestPlace");
    console.log(center);
    // TODO: select closest place to camera position
  }

  showPosition(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;

    if(this.user_position_label){
        this.viewerComponent.cesiumElement.entities.remove(this.user_position_label);
    }

    this.user_position_label = this.viewerComponent.cesiumElement.entities.add({
      position: Cartesian3.fromDegrees(longitude, latitude),
      clampToGround: true,
      label: {
        text: "Your location",
        scale: 0.8,
        pixelOffset: new Cartesian2(0, -30),
        font: "32px Helvetica",
        fillColor: Color.YELLOW,
        outlineColor: Color.BLACK,
        outlineWidth: 2,
        style: 2, // LabelStyle.FILL_AND_OUTLINE
      },
      point : {
        color : Color.BLUE,
        pixelSize : 15
      }
    });

    // console.log("Camera.DEFAULT_VIEW_RECTANGLE")
    // console.log(Camera.DEFAULT_VIEW_RECTANGLE)
    // console.log(longitude)
    // console.log(latitude)

    // set home button center
    Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
      longitude - 1,
      latitude - 1,
      longitude + 1,
      latitude + 1
    );

    // this.viewerComponent.cesiumElement.scene.camera.flyTo({
    //   destination : Cartesian3.fromDegrees(longitude, latitude,  1000000)
    // });
  }

  render() {
    return (
      <Viewer 
        // terrainProvider={terrainProvider}

        // remove the clock and timeline for the stars behind the earth
        animation={false}
        timeline={false}
        navigationInstructionsInitiallyVisible={true}

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
        
        // ref={e => {
        //   console.log("RENDER viewer");
        //   // this.state.viewer = e && e.cesiumElement;
        // }}

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
        ref={viewer => { 
          console.log("RENDER viewer");
          this.viewerComponent = viewer;
        }}
      > 
        { <PointPrimitiveCollection>
          {
            (this.state?.places ?? []).map((place) => {
              return (
                <PointPrimitive
                  position={Cartesian3.fromDegrees(place.geo[0], place.geo[1], 4000)}
                  color={Color.RED}
                  // unsure if scalebydistance has big performance impact
                  scaleByDistance={new NearFarScalar(1, 2, 1.5e6, .5)}
                  pixelSize={getPlaceSizeInPixels(place.size)}

                  onClick={async () => {
                    console.log("clicked on place " + place.url.split("/")[2]);
                    console.log("place " + place.url.split("/").pop());
                    var placeInfo = await fetchSinglePlaceInfo(place.url.split("/").pop());
                    console.log(placeInfo);
                    // placeInfo = placeInfo.place;
                    // @ts-ignore
                    this.props.setSelectedPlace(placeInfo);
                  }}

                  onMiddleClick={async () => {
                    console.log("middle clicked on place " + place.url.split("/")[2]);
                    var channelInfo = await fetchSinglePlaceChannels(place.url.split("/").pop());
                    console.log(channelInfo);
                    channelInfo = channelInfo.data;
                    channelInfo = channelInfo.content[0].items[Math.floor(Math.random() * channelInfo.content[0].items.length)];
                    console.log(channelInfo);
                    console.log("set selected staton.");
                    // @ts-ignore
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