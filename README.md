# ARGHH [![Build Status](https://travis-ci.org/fmilitao/arghh.svg?branch=master)](https://travis-ci.org/fmilitao/arghh)

Currently does nothing. Exciting!

[Test Page](https://fmilitao.github.io/arghh/)

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

## Code Structure

|directory|purpose|
|---|---|
|`src/typings`|All custom typescript definition files.|
|`src/test`|All test files.|
|`src/`|Remaining files are left at the root of `src`.|
|`dist/`|Contains the webpack-generated bundle.|
|`coverage/`|Coverage report.|
