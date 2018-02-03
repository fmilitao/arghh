import * as d3 from 'd3';
import * as drawing from './drawing';
import * as services from './services';
import { getFreeGeoIpLocation } from './services';
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

//
// Utils
//

function convertHours(date: string) {
  return utils.DateFormatter.fromUtcString(date).getHourAsString();
}

function convertDate(date: string) {
  return utils.DateFormatter.fromUtcString(date).getTodayAsString();
}

function convertSunsetSunrise(data: SunsetSunrise) {
  return [
    ['Dawn', convertHours(data.civil_twilight_begin)],
    ['Sunrise', convertHours(data.sunrise)],
    ['Sunset', convertHours(data.sunset)],
    ['Dusk', convertHours(data.civil_twilight_end)]
  ];
}

function toHTMLTable(table: any[][]) {
  const tableContent = table.map(([label, value]) =>
    `<tr><td class='labels'>${label}:</td><td class='values'>${value}</td></tr>`
  ).join('');

  return `<table>${tableContent}</table>`;
}

function convertGeoLocation(position: GeoLocation) {
  return [['Latitude', position.latitude], ['Longitude', position.longitude]];
}

//
// Runs
//

function drawLondonSample(resultList: HTMLElement) {
  const mockLocation = 'London';
  const mockGeoLocation: Promise<GeoLocation> = Promise.resolve(geoLondon);
  const mockSunsetSunrise: Promise<SunsetSunrise> = Promise.resolve(mockLondon);

  mockGeoLocation
    .then(location => {
      addMessage(`Sample data from <b>${mockLocation}</b>`, 'result', resultList);
      addPosition(geoLondon, results);
      return mockSunsetSunrise;
    })
    .then(data => addSunsetSunrise(data, results))
    .then(() => {
      const pressMe = addMessage('Press me to get your data!', 'pressMe', resultList);
      pressMe.onclick = () => {
        d3.select('svg').remove();
        d3.select(resultList).selectAll('*').remove();

        addMessage('Fetching data for your location.', 'result', resultList);
        drawRealLocation(resultList);
      };
    });
}

function drawRealLocation(resultList: HTMLElement) {
  // attempt to get real location from browser, if not then freegeoip, if not then just use London.
  const locationPromise: Promise<GeoLocation> = services.getNavigatorGeoLocation()
    .catch(error => {
      console.log(error);
      addMessage(`Error: ${error.message}.<br/>Trying 'freegeoip' service...`, 'error', resultList);
      return getFreeGeoIpLocation().catch(geoIpError => {
        addMessage(`Error: ${geoIpError.message}.<br/>Fine! Using location for <b>London</b>.`, 'error', resultList);
        return geoLondon;
      });
    });

  locationPromise
    .then(position => addPosition(position, resultList));

  const sunsetSunrisePromise: Promise<SunsetSunrise> =
    locationPromise
      .then(services.getSunriseSunset)
      .catch(error => {
        addMessage(`Error: ${error.message}.<br/>Using sample values for <b>London</b>.`, 'error', resultList);
        return mockLondon;
      });

  sunsetSunrisePromise
    .then(data => addSunsetSunrise(data, resultList));
}

function addPosition(position: GeoLocation, resultList: HTMLElement) {
  addMessage(toHTMLTable(convertGeoLocation(position)), 'result', resultList);
  return position;
}

function addSunsetSunrise(data: SunsetSunrise, resultList: HTMLElement) {
  addMessage(`Date: <b>${convertDate(data.astronomical_twilight_begin)}</b>`, 'result', resultList);
  addMessage(toHTMLTable(convertSunsetSunrise(data)), 'result', resultList);
  drawing.drawSunriseSunsetArc(data, resultList);
}

//
// Main
//

document.body.appendChild(testComponent());
document.body.appendChild(utils.createBuildInfoElement('buildInfo', 'https://github.com/fmilitao/arghh/commit/'));

const results = document.createElement('div');
results.classList.add('resultList');
document.body.appendChild(results);

// to exemplify
drawLondonSample(results);

// tslint:disable-next-line:max-line-length
// TODO: get city/country from: https://stackoverflow.com/questions/6159074/given-the-lat-long-coordinates-how-can-we-find-out-the-city-country ?
