import * as lodash from 'lodash';
import './style.css';
import * as utils from './utils';

function testComponent() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = lodash.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = utils.printMe;
  element.appendChild(btn);

  return element;
}

// 1. get location
// 2. get sun-rise

function getCoordinates() {
  return 'https://freegeoip.net/json/';
}

function parseCoordinates(freeGeoIpResult: any): { latitude: number, longitude: number } {
  return {
    latitude: freeGeoIpResult.latitude,
    longitude: freeGeoIpResult.longitude
  };
}

function getSunriseSunsetUrl(lat: number = 51.5073509, long: number = -0.1277583) {
  // FIXME: hack for current day
  const date = new Date().toISOString().split('T')[0];
  return `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0&date=${date}`;
}

function parseSunriseSunset(sunsetSunrise: any): { sunrise: string, sunset: string } {
  return {
    sunrise: sunsetSunrise.results.sunrise,
    sunset: sunsetSunrise.results.sunset
  };
}

function addResult(url: string, data: any, targetElement: HTMLElement) {
  const tmp = document.createElement('div');
  tmp.classList.add('result');
  tmp.innerText = url + ' \n ' + JSON.stringify(data);
  targetElement.appendChild(tmp);
}

function _urlComponent(targetElement: HTMLElement) {
  const fetch = (url: string) => new utils.UrlFetcher().fetchUrl(url);
  const coordinatesUrl = getCoordinates();

  console.log(coordinatesUrl);

  fetch(coordinatesUrl).then(data => {
    const coordinates = parseCoordinates(data);
    addResult(coordinatesUrl, coordinates, targetElement);
    return coordinates;
  }).then(coordinates => {
    const sunsetSunriseUrl = getSunriseSunsetUrl(coordinates.latitude, coordinates.longitude);
    console.log(sunsetSunriseUrl);
    fetch(sunsetSunriseUrl).then(data => {
      const sunsetSunrise = parseSunriseSunset(data);
      addResult(sunsetSunriseUrl, sunsetSunrise, targetElement);
    });
  });

}

// FIXME: mock results for dev
function urlComponent(targetElement: HTMLElement) {
  const coordinatesUrl = getCoordinates();
  const coordinates = { latitude: 51.5142, longitude: -0.0931 };

  const sunsetSunriseUrl = getSunriseSunsetUrl(coordinates.latitude, coordinates.longitude);
  const sunsetSunrise = { sunrise: '2018-01-28T07:43:35+00:00', sunset: '2018-01-28T16:43:11+00:00' };

  addResult(coordinatesUrl, coordinates, targetElement);
  addResult(sunsetSunriseUrl, sunsetSunrise, targetElement);
}

// function urlComponent(targetElement: HTMLElement) {
//   const fetcher = new utils.UrlFetcher();

//   // http://freegeoip.net/json/
//   // https://freegeoip.net/?q=195.99.14.79

//   // see more at: https://github.com/toddmotto/public-apis
//   const examples: Array<[string, boolean]> =
//     [
//       // for sunset/dawn at location // &formatted=0&date=2018-08-27
//       ['https://api.sunrise-sunset.org/json?lat=51.5073509&lng=-0.1277583', false],
//       // for weather
// FIXME: also fetches coordinates
//       ['https://www.metaweather.com/api/location/search/?query=london', true],
//       // ip fetcher FIXME: may be blocked by ad-blockers
//       ['https://freegeoip.net/json/', false],
//       // basic test
//       ['https://yesno.wtf/api', false],
// FIXME: also fetches coordinates
//       // for getting geo coords
//       // ['https://maps.googleapis.com/maps/api/geocode/json?address=London', false]
//     ];

//   examples.forEach(([url, cors]) => fetcher
//     .fetchUrl(url, cors)
//     .then(data => {
//       const tmp = document.createElement('div');
//       tmp.classList.add('result');
//       tmp.innerText = url + ' \n ' + JSON.stringify(data);
//       targetElement.appendChild(tmp);
//     })
//   );
// }

const root = document.body;

// root.appendChild(testComponent());
root.appendChild(utils.createBuildInfoElement('buildInfo', 'https://github.com/fmilitao/arghh/commit/'));
urlComponent(root);
