import dynamic from 'next/dynamic'
import {useState} from "react";
import Head from 'next/head';

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
        <title>Radio map</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        {/* <a href="https://www.vecteezy.com/free-vector/globe-icon">Globe Icon Vectors by Vecteezy</a> */}
      </Head>
      <RadioMenu selectedPlace={selectedPlace} selectedChannel={selectedChannel}></RadioMenu>
      <CesiumViewer setSelectedPlace={setSelectedPlace} setSelectedChannel={setSelectedChannel}></CesiumViewer>
    </>
  )
}
