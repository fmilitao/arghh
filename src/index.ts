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

function urlComponent(targetElement: HTMLElement) {
  const fetcher = new utils.UrlFetcher();

  // http://freegeoip.net/json/
  // https://freegeoip.net/?q=195.99.14.79

  // see more at: https://github.com/toddmotto/public-apis
  const examples: Array<[string, boolean]> =
    [
      // for sunset/dawn at location // &formatted=0&date=2018-08-27
      ['https://api.sunrise-sunset.org/json?lat=51.5073509&lng=-0.1277583', false],
      // for weather
      ['https://www.metaweather.com/api/location/search/?query=london', true],
      // basic test
      ['https://yesno.wtf/api', false],
      // for getting geo coords
      // ['https://maps.googleapis.com/maps/api/geocode/json?address=London', false]
    ];

  examples.forEach(([url, cors]) => fetcher.fetchUrl(url, data => {
    const tmp = document.createElement('div');
    tmp.classList.add('result');
    tmp.innerText = url + ' \n ' + JSON.stringify(data);
    targetElement.appendChild(tmp);
  }, cors));
}

const root = document.body;

// root.appendChild(testComponent());
root.appendChild(utils.createBuildInfoElement('buildInfo', 'https://github.com/fmilitao/arghh/commit/'));
urlComponent(root);
