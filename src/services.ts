import * as utils from './utils';

//
// Geo location from navigator
//

function toGeoLocationServiceData(position: Position): GeoLocation {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };
}

export function getNavigatorGeoLocation(): Promise<GeoLocation> {
  return new Promise((resolve: ((x: GeoLocation) => any), reject: any) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => resolve(toGeoLocationServiceData(position)),
        reject
      );
    } else {
      reject('Geolocation is not supported by this browser.');
    }
  });
}

//
// Geo location from 'freegeoip'
//

export function getFreeGeoIpLocation(): Promise<GeoLocation> {
  // coordinate services urls
  // http://freegeoip.net/json/ -- may be blocked by adblockers!
  // https://www.metaweather.com/api/location/search/?query=london -- requires CORS proxy
  // https://maps.googleapis.com/maps/api/geocode/json?address=London -- requires API key
  // TODO: perhaps try enum in argument as other options?
  const coordinatesServiceUrl = 'https://freegeoip.net/json/';

  const fetcher = new utils.UrlFetcher();
  const parseCoordinates = (data: any) => data as GeoLocation;

  return fetcher.fetchUrl(coordinatesServiceUrl).then(parseCoordinates);
}

//
// Sunset/Sunrise
//

export function getSunriseSunset(location: GeoLocation): Promise<SunsetSunrise> {
  // sunrise/sunset service url
  const date = new utils.DateFormatter().getTodayAsString();
  const lat = location.latitude;
  const long = location.longitude;
  const serviceUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0&date=${date}`;

  const fetcher = new utils.UrlFetcher();
  const parseSunriseSunset = (data: any) => data.results as SunsetSunrise;

  return fetcher.fetchUrl(serviceUrl).then(parseSunriseSunset);
}
