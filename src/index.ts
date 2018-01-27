import axios from 'axios';
import * as lodash from 'lodash';
import printMe from './print';
import './style.css';

function fetchUrl(url: string) {
  axios.get(url)
    .then(response => console.log(`${url}:\n${JSON.stringify(response.data)}`))
    .catch(console.error);
}

function addCorsProxy(url: string) {
  // return `http://cors-proxy.htmldriven.com/?url=${url}`;
  return `https://cors-anywhere.herokuapp.com/${url}`;
}

function testFetch() {
  [
    addCorsProxy('https://www.metaweather.com/api/location/search/?query=london'),
    'https://yesno.wtf/api',
    'https://maps.googleapis.com/maps/api/geocode/json?address=Florence'
  ].forEach(fetchUrl);
}

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = lodash.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  const divElement = document.createElement('div');
  divElement.classList.add('foo');
  divElement.innerHTML = `Commit: ${__VERSION__} of ${__BUILD__}`;
  console.log(__VERSION__);
  console.log(__BUILD__);
  element.appendChild(divElement);

  return element;
}

document.body.appendChild(component());

testFetch();
