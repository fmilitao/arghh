
// global variables that are defined
// via DefinePlugin in 'webpack.config.js'
declare var __VERSION__: string;
declare var __BUILD__: string;

// for importing CSS files (without any types)
declare module '*.css' {
  // intentionally empty
}

interface SunsetSunrise {
  sunrise: string;
  sunset: string;
  solar_noon: string;
  day_length: number;
  civil_twilight_begin: string;
  civil_twilight_end: string;
  nautical_twilight_begin: string;
  nautical_twilight_end: string;
  astronomical_twilight_begin: string;
  astronomical_twilight_end: string;
}

interface GeoLocation {
  latitude: number;
  longitude: number;
}

interface GoogleReverseGeoLocation {
  error_message?: string;
  results: GoogleAddressComponent[];
  status: string;
}

interface GoogleAddressComponent {
  address_components: GoogleAddressResult[];
  formatted_address: string;
  geometry: any;
  place_id: string;
  types: string[];
  // don't care about the rest
}

interface GoogleAddressResult {
  long_name: string;
  short_name: string;
  types: string[];
}
