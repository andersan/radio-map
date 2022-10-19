import Head from 'next/head'
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
      <Head>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <RadioMenu selectedPlace={selectedPlace} selectedChannel={selectedChannel}></RadioMenu>
      <CesiumViewer setSelectedPlace={setSelectedPlace} setSelectedChannel={setSelectedChannel}></CesiumViewer>
    </>
  )
}
