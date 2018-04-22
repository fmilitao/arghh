import * as d3 from 'd3';
import * as drawing from './drawing';
import { geoLondon, mockLondon, mockLondon2, reverseLondon } from './samples';
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
  const fixed = 5;
  return [['Latitude', position.latitude.toFixed(fixed)], ['Longitude', position.longitude.toFixed(fixed)]];
}

//
// Runs
//

function drawLondonSample(resultList: HTMLElement) {
  const mockGeoLocation: Promise<GeoLocation> = Promise.resolve(geoLondon);
  const mockSunsetSunrise: Promise<SunsetSunrise> = Promise.resolve(mockLondon2);

  const mockReverseLocation: Promise<GoogleReverseGeoLocation> = Promise.resolve(reverseLondon);

  mockReverseLocation.then(reverse => {
    addMessage(`Sample location: <b>${extractLocation(reverse)}</b>`, 'result', resultList);
  });

  mockGeoLocation
    .then(location => {
      addPosition(geoLondon, results);
      return mockSunsetSunrise;
    })
    .then(data => addSunsetSunrise(data, results))
    .then(() => {
      const pressMe = addMessage('Press me to get your data!', 'pressMe', resultList);
      pressMe.onclick = () => {
        d3.select('svg').remove();
        d3.select(resultList).selectAll('*').remove();

        addMessage('Fetching real data.', 'result', resultList);
        drawRealLocation(resultList);
      };
    });
}

function extractLocation(reverse: GoogleReverseGeoLocation) {
  return reverse.results[0]
    .address_components
    .filter(a => a.types.indexOf('postal_town') !== -1)[0]
    .long_name;
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
    .then(position => {
      addPosition(position, resultList);
      const reverseGeo: Promise<GoogleReverseGeoLocation> = services.getReverseGeo(position);
      reverseGeo.then(reverse => {
        if (reverse.status === 'OK') {
          addMessage(`Location: <b>${extractLocation(reverse)}</b>`, 'result', resultList);
        } else {
          addMessage(`${reverse.error_message}`, 'error', resultList);
        }
      });
    });

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
  const now = new utils.DateFormatter();
  addMessage(toHTMLTable(convertSunsetSunrise(data)), 'result', resultList);
  addMessage(`Current Time: <b>${now.getHourAsString()}</b>`, 'result', resultList);
  drawing.drawSunriseSunsetArc(data, resultList, now);
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
