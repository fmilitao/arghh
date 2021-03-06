# ARGHH [![Build Status](https://travis-ci.org/fmilitao/arghh.svg?branch=master)](https://travis-ci.org/fmilitao/arghh)

Try on-line:
 1. [Show sunset/sunrise with animation.](https://fmilitao.github.io/arghh/sunny.html)
 2. [Sound visualizations.](https://fmilitao.github.io/arghh/sound.html)

Notes:
 * More [public APIs](https://github.com/toddmotto/public-apis) to play with, some may require a CORS proxy to work in Chrome.
 * Project was built to play with: webpack + typescript + jasmine (which was frustrating to get it to work, thus the name), and Travis-CI.

## Setup/Building

Install dependencies with `npm install` at the root of the project.

Then you may:

|command|effect|
|---|---|
|`npm run build`|Builds the bundle. Outputs to `dist/`.|
|`npm run test`|Runs all tests. Outputs coverage report to `coverage/`.|
|`npm run lint`|Lints all typescript files.|
|`npm run watch`|Make webpack watch for changes and auto-build when needed.|
|`npm run serve`|Make webpack watch for changes and serve the result with auto-reload.|

Commits on `master` are automatically deployed via Travis-CI to the `gh-pages` branch, if the build succeeds and produces the bundle.

For the `build`/`watch`/`serve` options, you can set `ENV=test` to build more quickly but produce a larger `bundle.js` file.
You can run it as the following one-liner:

    ENV=test npm run build

## Code Structure

|directory|purpose|
|---|---|
|`src/typings`|All custom typescript definition files.|
|`src/test`|All test files.|
|`src/*`|Each test page sources in its own directory.|
|`dist/`|Contains the webpack-generated bundle.|
|`coverage/`|Coverage report.|
