import * as drawing from './drawing';
import * as services from './services';
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

function addMessage(message: string, style: string, targetElement: HTMLElement = document.body) {
  const tmp = document.createElement('div');
  tmp.classList.add(style);
  tmp.innerHTML = message;
  targetElement.appendChild(tmp);
}

//
// Other tests
//

const root = document.body;

root.appendChild(testComponent());
root.appendChild(utils.createBuildInfoElement('buildInfo', 'https://github.com/fmilitao/arghh/commit/'));

//
// Promises tests
//

Promise.resolve('Promises work in build!').then(console.log);

// for Lisbon
const mockLisbon: SunsetSunrise = {
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

// for London
const mockLondon: SunsetSunrise = {
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

const geoLondon: GeoLocation = {
  latitude: 51.5073509,
  longitude: -0.1277583
};

const geoLisbon: GeoLocation = {
  latitude: 38.7222524,
  longitude: -9.1393366
};

const locationPromise: Promise<GeoLocation> = services.getNavigatorGeoLocation()
  .then(position => {
    addMessage(
      'Latitude: ' + position.latitude + '<br/>Longitude: ' + position.longitude,
      'result',
      root
    );
    return position;
  })
  .catch(error => {
    console.log(error);
    addMessage(
      `Error: ${JSON.stringify(error.message)}<br/>Using: ${JSON.stringify(geoLondon)}`,
      'error',
      root
    );
    // using mock location for london
    return geoLondon;
  });

const sunsetSunrisePromise: Promise<SunsetSunrise> =
  locationPromise
    .then(services.getSunriseSunset)
    .catch(error => mockLondon);

const time = (date: string) => utils.DateFormatter.fromUtcString(date).getHourAsString();

sunsetSunrisePromise
  .then(data => {
    addMessage(
      `<table>
      <tr><td class='labels'>Dawn:</td>
        <td class='values'>${time(data.civil_twilight_begin)}</td></tr>
      <tr><td class='labels'>Sunrise:</td>
        <td class='values'> ${time(data.sunrise)}</td></tr>
      <tr><td class='labels'>Sunset:</td>
        <td class='values'>${time(data.sunset)}</td></tr>
      <tr><td class='labels'>Dusk:</td>
        <td class='values'>${time(data.civil_twilight_end)}</td></tr>
      </table>`,
      'result',
      root
    );
    // addMessage(`Length: ${data.day_length}`, 'result');
    return data;
  })
  .then(data => drawing.drawSunriseSunsetArc(data, root));
