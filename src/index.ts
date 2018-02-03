import * as d3 from 'd3';
import * as drawing from './drawing';
import * as services from './services';
import './style.css';
import * as utils from './utils';

//
// Test component
//

function testComponent() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello Arghh!';
  element.classList.add('hello');

  return element;
}

//
// Add Result
//

function addMessage(message: string, style: string, targetElement: HTMLElement) {
  const tmp = document.createElement('div');
  tmp.classList.add(style);
  tmp.innerHTML = message;
  targetElement.appendChild(tmp);

  d3.select(tmp)
    .style('opacity', 0)
    .style('transform', 'translate(0px,-20px)')
    .transition()
    .duration(500)
    .style('transform', 'translate(0px,0px)')
    .style('opacity', 1);

  return tmp;
}

//
// Other tests
//

const root = document.createElement('div');
root.classList.add('resultList');
document.body.appendChild(root);

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

function toHTMLTable(table: any[][]) {
  const tableContent = table.map(([label, value]) =>
    `<tr><td class='labels'>${label}:</td><td class='values'>${value}</td></tr>`
  ).join('');

  return '<table>' + tableContent + '</table>';
}

const locationPromise: Promise<GeoLocation> = services.getNavigatorGeoLocation()
  .then(position => {
    addMessage(
      toHTMLTable([
        ['Latitude', position.latitude],
        ['Longitude', position.longitude]
      ]),
      'result',
      root
    );
    return position;
  })
  .catch(error => {
    console.log(error);
    addMessage(
      `Error: ${error.message}.<br/>Using the following coordinates:` +
      toHTMLTable([
        ['Latitude', geoLondon.latitude],
        ['Longitude', geoLondon.longitude]
      ]),
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

const convertDate = (date: string) => utils.DateFormatter.fromUtcString(date).getHourAsString();

sunsetSunrisePromise
  .then(data => {
    addMessage(
      toHTMLTable([
        ['Dawn', convertDate(data.civil_twilight_begin)],
        ['Sunrise', convertDate(data.sunrise)],
        ['Sunset', convertDate(data.sunset)],
        ['Dusk', convertDate(data.civil_twilight_end)]
      ]),
      'result',
      root
    );
    // addMessage(`Length: ${data.day_length}`, 'result');
    return data;
  })
  .then(data => drawing.drawSunriseSunsetArc(data, root));
