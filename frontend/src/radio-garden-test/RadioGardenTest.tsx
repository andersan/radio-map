import React from 'react'
import {SearchApiFp, PlacesApiFp, SearchApi, PlacesApi, Place} from './radio-garden-api/api'


class RadioGardenTest extends React.Component {
  // sound;
  state = {
    places:Array<Place>,
    stations:Array<Object>//<SearchResultSource>
  };
    constructor(props:any) {
      super(props)
      this.state = {
        places:Array<Place>,
        stations:Array<Object>//<SearchResultSource>
      };
    }

    componentDidMount() {
      this.placesApiTest();
      this.searchApiTest();
    }

    async placesApiTest() {
        var places = await (await new PlacesApi().araContentPlacesGet()).data.data?.list;
        this.setState({places: places});
        console.log(places);
        // await PlacesApiFp().araContentPlacesGet().then(place => { 
        //     this.setState({places: place})
        //     console.log(place)
        // });
    }
    async searchApiTest() {
        var stations = await (await new SearchApi().searchGet("Ondas")).data.hits?.hits;
        this.setState({stations: stations});
        console.log(stations);
        // await SearchApiFp().searchGet("Lansing").then(station => {
        //     this.setState({stations: station})
        //     console.log(station)
        // });
    }

    render() {
      return (
        <div>
            <h1>test radio garden</h1>
            <div>
                {/* {this.state.places.map(place => (
              <p>id: {place.id}, url: {place.url}, size: {place.size}, country: {place.country}, title: {place.title}, geo: {place.geo}, boost: {place.boost}</p>
              )).slice(0,10)} */}
              {Array.isArray(this.state.places) && this.state.places.map(place => (
            <p>{JSON.stringify(place)}</p>
            )).slice(0,10)}
              {Array.isArray(this.state.stations) && this.state.stations.map(station => (
            <p>{JSON.stringify(station)}</p>
            )).slice(0,10)}
            </div>
            hm
        </div>
      )
    }
} 
export default RadioGardenTest;