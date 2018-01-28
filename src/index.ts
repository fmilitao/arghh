import * as drawing from './drawing';
import './style.css';
import * as utils from './utils';

//
// Test component
//

function testComponent() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = 'Hello Arghh!';
  element.classList.add('hello');

  return element;
}

//
// Add Result
//

function addResult(url: string, data: any, targetElement: HTMLElement) {
  const tmp = document.createElement('div');
  tmp.classList.add('result');
  tmp.innerText = url + ' \n ' + JSON.stringify(data);
  targetElement.appendChild(tmp);
}

//
// Fetch lat/long then sunrise/sunset
//

// see more APIs at: https://github.com/toddmotto/public-apis

function getSunriseSunsetForCurrentLocation(targetElement: HTMLElement): Promise<ISunsetSunriseServiceData> {
  // coordinate services urls
  // http://freegeoip.net/json/ -- may be blocked by adblockers!
  // https://www.metaweather.com/api/location/search/?query=london -- requires CORS proxy
  // https://maps.googleapis.com/maps/api/geocode/json?address=London -- requires API key
  const coordinatesService = 'https://freegeoip.net/json/';

  // sunrise/sunset service url
  const sunsetSunriseService = (lat: number = 51.5073509, long: number = -0.1277583) => {
    const date = new utils.DateFormatter().getTodayAsString();
    return `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0&date=${date}`;
  };

  const parseCoordinates = (data: any) => data as ICoordinatesServiceData;
  const parseSunriseSunset = (data: any) => data.results as ISunsetSunriseServiceData;

  const fetcher = new utils.UrlFetcher();
  return fetcher.fetchUrl(coordinatesService)
    // fetch local coordinates
    .then(data => {
      const coordinates = parseCoordinates(data);
      addResult(coordinatesService, coordinates, targetElement);
      return coordinates;
    })
    // fetch sunset sunrise data
    .then(coordinates => {
      const sunsetSunriseUrl = sunsetSunriseService(coordinates.latitude, coordinates.longitude);
      return fetcher.fetchUrl(sunsetSunriseUrl)
        .then(data => {
          const sunsetSunrise = parseSunriseSunset(data);
          addResult(sunsetSunriseUrl, sunsetSunrise, targetElement);
          return sunsetSunrise;
        });
    });
}

//
// Other tests
//

const root = document.body;

root.appendChild(testComponent());
root.appendChild(utils.createBuildInfoElement('buildInfo', 'https://github.com/fmilitao/arghh/commit/'));

// getSunriseSunsetForCurrentLocation(root)
//   .then(data => drawing.drawSunriseSunsetArc(data, root));

// https://api.sunrise-sunset.org/json?lat=38.7222524&lng=-9.1393366&formatted=0
// for lisbon
const mockLisbon: ISunsetSunriseServiceData = {
  astronomical_twilight_begin: '2018-01-28T06:13:40+00:00',
  astronomical_twilight_end: '2018-01-28T19:25:29+00:00',
  civil_twilight_begin: '2018-01-28T07:17:02+00:00',
  civil_twilight_end: '2018-01-28T18:22:07+00:00',
  day_length: 36526,
  nautical_twilight_begin: '2018-01-28T06:45:02+00:00',
  nautical_twilight_end: '2018-01-28T18:54:07+00:00',
  solar_noon: '2018-01-28T12:49:34+00:00',
  sunrise: '2018-01-28T07:45:11+00:00',
  sunset: '2018-01-28T17:53:57+00:00'
};

// for london
const mockLondon: ISunsetSunriseServiceData = {
  astronomical_twilight_begin: '2018-01-28T05:47:19+00:00',
  astronomical_twilight_end: '2018-01-28T18:39:27+00:00',
  civil_twilight_begin: '2018-01-28T07:07:03+00:00',
  civil_twilight_end: '2018-01-28T17:19:43+00:00',
  day_length: 32376,
  nautical_twilight_begin: '2018-01-28T06:26:32+00:00',
  nautical_twilight_end: '2018-01-28T18:00:14+00:00',
  solar_noon: '2018-01-28T12:13:23+00:00',
  sunrise: '2018-01-28T07:43:35+00:00',
  sunset: '2018-01-28T16:43:11+00:00'
};

drawing.drawSunriseSunsetArc(mockLisbon, root);
