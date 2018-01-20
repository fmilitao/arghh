import * as _ from 'lodash';
import printMe from './print';

// defined via DefinePlugin in 'webpack.config.js'
declare let __VERSION__: string;
declare let __BUILD__: string;

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  const divElement = document.createElement('div');
  divElement.innerHTML = `Commit: ${__VERSION__} of ${__BUILD__}`;
  console.log(__VERSION__);
  console.log(__BUILD__);
  element.appendChild(divElement);

  return element;
}

document.body.appendChild(component());
