## Testing approach

# Basic functionality
1. User opens up map and expects to see:
  a. a map/globe (with globe images...)
  b. a bunch of dots which correspond to places

2. Later: recovering state
  a. when the app is re-opened, the user would expect to see the last place and/or radio station they had listened to


# Radio Garden basic functionality
The below tests rely on a UX that exists only with the concept of Places, which is not present in the Radio Browser API? (Or at least, many stations don't have a city filled out...)
3. Selecting a place
  a. given a loaded cesium globe, after clicking on a place, user expects to see a menu loaded with stations and other local info

4. Selecting a station
  a. given an open menu, if the user clicks on a station, the station should load the URL for the music stream and start playing music

5. Menu functionality
  a. from the menu, the user expects to see options like "see all stations", "popular stations", nearby places, nearby stations, and cities in this country.
  b. the user should be able to select those stations and places

8. Later; menu navigation functionality
  a. be able to go back to the previously selected menu if this place/list of stations was reached via the menu (e.g. nearby places)
  b. open/close the menu - this won't open the current station's place, but the current selected place (whcih can be different)


# Music playing functionality
Tests with the howler/music player
6. Pausing/playing playback
  a. be able to pause and play. gracefully handle impatient users who click the buttons a lot.

7. Recovering from network errors
  a. expect the play button to be shown if the stream suddenly stops.