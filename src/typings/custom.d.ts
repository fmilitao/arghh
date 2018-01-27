
// global variables that are defined
// via DefinePlugin in 'webpack.config.js'
declare var __VERSION__: string;
declare var __BUILD__: string;

// for importing CSS files (without any types)
declare module '*.css' {
  // intentionally empty
}
