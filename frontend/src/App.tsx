import Cesium3DTile from "cesium/Source/Scene/Cesium3DTile";
import RadioMenu from "./Components/RadioMenu";
import CesiumViewer from "./Components/CesiumViewer";
import {useState} from "react";


function App() {  
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(0);

  return (
    <div>
      <RadioMenu selectedPlace={selectedPlace} selectedChannel={selectedChannel}></RadioMenu>
      {/* <RadioMenu></RadioMenu> */}
      <CesiumViewer setSelectedPlace={setSelectedPlace} setSelectedChannel={setSelectedChannel}></CesiumViewer>
    </div>
  );
}
export default App;
