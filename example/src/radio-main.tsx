import React from 'react'
import ReactDOM from 'react-dom/client'
import RadioPlayerTest from './RadioPlayer'
import RadioStationTest from './RadioStation'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RadioPlayerTest />
    <RadioStationTest />
  </React.StrictMode>
)