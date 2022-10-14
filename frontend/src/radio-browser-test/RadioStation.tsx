import React from 'react'
import {getCountries, getLanguages, getStates, getStationsByCountry, Country, RadioStation} from "./api"
  

class RadioStationTest extends React.Component {
    abc;
    state = {
      countries:Array<Country>,
      stations:Array<RadioStation> 
    };
    constructor(props:any) {
      super(props)
      this.abc = "hello";
    }

    componentDidMount() {
      this.getCountriesViaAPI();
      this.getUSStationsViaAPI();
    }

    async getCountriesViaAPI() {
        await getCountries().then(country => 
            this.setState({countries: country}));
    }

    async getUSStationsViaAPI() {
        await getStationsByCountry("US").then(station => 
            this.setState({stations: station}));
    }

    getStuff() {
        // const [post, setPost] = React.useState(null);
      
        // React.useEffect(() => {
        //   axios.get("http://de1.api.radio-browser.info/json/countries").then((response) => {
        //     setPost(response.data);
        //   });
        // }, []);

        // if (!post) return null;

        // return (`<div>
        //   <h1>{post.title}</h1>
        //   <p>{post.body}</p>
        // </div>`);
        // return getCountries().then();
    }
    
    render() {
      return (
        <div>
          <div>
            <h2>Countries</h2>
            <div>
              {Array.isArray(this.state.countries) && this.state.countries.map(country => (
              <p>name: {country.name}, # stations: {country.stationcount}, id iso 3166: {country.iso_3166_1}</p>
              )).slice(0,10)}
            </div>
          </div>
          <div>
            <h2>Stations</h2>
            <div>
              {Array.isArray(this.state.stations) && this.state.stations.map(station => (
              <p>name: {station.name}, url: {station.url}, state: {station.state}, country: {station.country}, countrycode: {station.countrycode}</p>
              )).slice(0,10)}
            </div>
          </div>
        </div>
      )
    }
} 
export default RadioStationTest;