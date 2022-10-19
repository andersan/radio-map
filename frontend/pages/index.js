import dynamic from 'next/dynamic'
import {useState} from "react";

const CesiumViewer = dynamic(
  () => import('../components/CesiumViewer/CesiumViewer'),
  { ssr: false }
)
const RadioMenu = dynamic(
  () => import('../components/RadioMenu/RadioMenu'),
  { ssr: false }
)

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(0);

  return (
    <>
      <RadioMenu selectedPlace={selectedPlace} selectedChannel={selectedChannel}></RadioMenu>
      <CesiumViewer setSelectedPlace={setSelectedPlace} setSelectedChannel={setSelectedChannel}></CesiumViewer>
    </>
  )
}
