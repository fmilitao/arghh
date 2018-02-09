
// for Lisbon
export const mockLisbon: SunsetSunrise = {
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
export const mockLondon: SunsetSunrise = {
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

export const geoLondon: GeoLocation = {
    latitude: 51.5073509,
    longitude: -0.1277583
};

export const geoLisbon: GeoLocation = {
    latitude: 38.7222524,
    longitude: -9.1393366
};

export const reverseLondon: GoogleReverseGeoLocation = {
    results: [{
        address_components: [
            {
                long_name: 'A4',
                short_name: 'A4',
                types: ['route']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['locality', 'political']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['postal_town']
            },
            {
                long_name: 'Greater London',
                short_name: 'Greater London',
                types: ['administrative_area_level_2', 'political']
            },
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            },
            {
                long_name: 'WC2N 5DU',
                short_name: 'WC2N 5DU',
                types: ['postal_code']
            }
        ],
        formatted_address: 'A4, London WC2N 5DU, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 51.5074076,
                    lng: -0.128012
                },
                southwest: {
                    lat: 51.507309,
                    lng: -0.128271
                }
            },
            location: {
                lat: 51.5073649,
                lng: -0.1281351
            },
            location_type: 'GEOMETRIC_CENTER',
            viewport: {
                northeast: {
                    lat: 51.5087072802915,
                    lng: -0.126792519708498
                },
                southwest: {
                    lat: 51.5060093197085,
                    lng: -0.129490480291502
                }
            }
        },
        place_id: 'ChIJSzDdM84EdkgRgY8FbxvqCRM',
        types: ['route']
    },
    {
        address_components: [
            {
                long_name: 'Westminster',
                short_name: 'Westminster',
                types: ['locality', 'neighborhood', 'political']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['locality', 'political']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['postal_town']
            },
            {
                long_name: 'City of Westminster',
                short_name: 'City of Westminster',
                types: ['administrative_area_level_3', 'political']
            },
            {
                long_name: 'Greater London',
                short_name: 'Greater London',
                types: ['administrative_area_level_2', 'political']
            },
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'Westminster, London, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 51.5073854,
                    lng: -0.1223458
                },
                southwest: {
                    lat: 51.48813089999999,
                    lng: -0.1471354
                }
            },
            location: {
                lat: 51.4974948,
                lng: -0.1356583
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 51.5073854,
                    lng: -0.1223458
                },
                southwest: {
                    lat: 51.48813089999999,
                    lng: -0.1471354
                }
            }
        },
        place_id: 'ChIJVbSVrt0EdkgRQH_FO4ZkHc0',
        types: ['locality', 'neighborhood', 'political']
    },
    {
        address_components: [
            {
                long_name: 'London',
                short_name: 'London',
                types: ['locality', 'political']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['postal_town']
            },
            {
                long_name: 'Greater London',
                short_name: 'Greater London',
                types: ['administrative_area_level_2', 'political']
            },
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'London, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 51.6723432,
                    lng: 0.148271
                },
                southwest: {
                    lat: 51.38494009999999,
                    lng: -0.3514683
                }
            },
            location: {
                lat: 51.5073509,
                lng: -0.1277583
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 51.6723432,
                    lng: 0.148271
                },
                southwest: {
                    lat: 51.38494009999999,
                    lng: -0.3514683
                }
            }
        },
        place_id: 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
        types: ['locality', 'political']
    },
    {
        address_components: [
            {
                long_name: 'WC2N 5DU',
                short_name: 'WC2N 5DU',
                types: ['postal_code']
            },
            {
                long_name: 'Trafalgar Square',
                short_name: 'Trafalgar Square',
                types: ['route']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['locality', 'political']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['postal_town']
            },
            {
                long_name: 'Greater London',
                short_name: 'Greater London',
                types: ['administrative_area_level_2', 'political']
            },
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'Trafalgar Square, London WC2N 5DU, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 51.5086097,
                    lng: -0.1276047
                },
                southwest: {
                    lat: 51.5069414,
                    lng: -0.1283483
                }
            },
            location: {
                lat: 51.5072092,
                lng: -0.1282941
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 51.50912453029149,
                    lng: -0.126627519708498
                },
                southwest: {
                    lat: 51.50642656970849,
                    lng: -0.129325480291502
                }
            }
        },
        place_id: 'ChIJh6jmMs4EdkgR18V0MXQOdAY',
        types: ['postal_code']
    },
    {
        address_components: [
            {
                long_name: 'WC2N',
                short_name: 'WC2N',
                types: ['postal_code', 'postal_code_prefix']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['locality', 'political']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['postal_town']
            },
            {
                long_name: 'Greater London',
                short_name: 'Greater London',
                types: ['administrative_area_level_2', 'political']
            },
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'London WC2N, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 51.5167991,
                    lng: -0.1189894
                },
                southwest: {
                    lat: 51.50410609999999,
                    lng: -0.1294048
                }
            },
            location: {
                lat: 51.5077151,
                lng: -0.1240261
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 51.5116811,
                    lng: -0.1189894
                },
                southwest: {
                    lat: 51.50410609999999,
                    lng: -0.1294048
                }
            }
        },
        place_id: 'ChIJb9KHxsgEdkgRe82UfSxQIv0',
        types: ['postal_code', 'postal_code_prefix']
    },
    {
        address_components: [
            {
                long_name: 'City of Westminster',
                short_name: 'City of Westminster',
                types: ['administrative_area_level_3', 'locality', 'political']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['locality', 'political']
            },
            {
                long_name: 'London',
                short_name: 'London',
                types: ['postal_town']
            },
            {
                long_name: 'Greater London',
                short_name: 'Greater London',
                types: ['administrative_area_level_2', 'political']
            },
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'City of Westminster, London, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 51.5397932,
                    lng: -0.1111016
                },
                southwest: {
                    lat: 51.4838163,
                    lng: -0.2160886
                }
            },
            location: {
                lat: 51.5001754,
                lng: -0.1332326
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 51.5397932,
                    lng: -0.1111016
                },
                southwest: {
                    lat: 51.4838163,
                    lng: -0.2160886
                }
            }
        },
        place_id: 'ChIJxwN8mDUFdkgRoGfsoi2uDgQ',
        types: ['administrative_area_level_3', 'locality', 'political']
    },
    {
        address_components: [
            {
                long_name: 'London',
                short_name: 'London',
                types: ['postal_town']
            },
            {
                long_name: 'Greater London',
                short_name: 'Greater London',
                types: ['administrative_area_level_2', 'political']
            },
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'London, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 51.6723432,
                    lng: 0.148271
                },
                southwest: {
                    lat: 51.38494009999999,
                    lng: -0.3514683
                }
            },
            location: {
                lat: 51.5569879,
                lng: -0.1411791
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 51.6723432,
                    lng: 0.148271
                },
                southwest: {
                    lat: 51.38494009999999,
                    lng: -0.3514683
                }
            }
        },
        place_id: 'ChIJ8_MXt1sbdkgRCrIAOXkukUk',
        types: ['postal_town']
    },
    {
        address_components: [
            {
                long_name: 'Greater London',
                short_name: 'Greater London',
                types: ['administrative_area_level_2', 'political']
            },
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'Greater London, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 51.6918726,
                    lng: 0.3339957
                },
                southwest: {
                    lat: 51.28676,
                    lng: -0.5103751
                }
            },
            location: {
                lat: 51.4309209,
                lng: -0.0936496
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 51.6918726,
                    lng: 0.3339957
                },
                southwest: {
                    lat: 51.28676,
                    lng: -0.5103751
                }
            }
        },
        place_id: 'ChIJb-IaoQug2EcRi-m4hONz8S8',
        types: ['administrative_area_level_2', 'political']
    },
    {
        address_components: [
            {
                long_name: 'London Metropolitan Area',
                short_name: 'London Metropolitan Area',
                types: ['political']
            },
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'London Metropolitan Area, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 51.8221472,
                    lng: 0.4911679
                },
                southwest: {
                    lat: 51.1051517,
                    lng: -0.5392819999999999
                }
            },
            location: {
                lat: 51.4309209,
                lng: -0.0936496
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 51.8221472,
                    lng: 0.4911679
                },
                southwest: {
                    lat: 51.1051517,
                    lng: -0.5392819999999999
                }
            }
        },
        place_id: 'ChIJ3SIYXV0CdkgRmRTYeONPi-U',
        types: ['political']
    },
    {
        address_components: [
            {
                long_name: 'England',
                short_name: 'England',
                types: ['administrative_area_level_1', 'political']
            },
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'England, UK',
        geometry: {
            bounds: {
                northeast: {
                    lat: 55.81165979999999,
                    lng: 1.7629159
                },
                southwest: {
                    lat: 49.8647411,
                    lng: -6.4185458
                }
            },
            location: {
                lat: 52.3555177,
                lng: -1.1743197
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 55.81165979999999,
                    lng: 1.7629159
                },
                southwest: {
                    lat: 49.8647411,
                    lng: -6.4185458
                }
            }
        },
        place_id: 'ChIJ39UebIqp0EcRqI4tMyWV4fQ',
        types: ['administrative_area_level_1', 'political']
    },
    {
        address_components: [
            {
                long_name: 'United Kingdom',
                short_name: 'GB',
                types: ['country', 'political']
            }
        ],
        formatted_address: 'United Kingdom',
        geometry: {
            bounds: {
                northeast: {
                    lat: 60.91569999999999,
                    lng: 33.9165549
                },
                southwest: {
                    lat: 34.5614,
                    lng: -8.8988999
                }
            },
            location: {
                lat: 55.378051,
                lng: -3.435973
            },
            location_type: 'APPROXIMATE',
            viewport: {
                northeast: {
                    lat: 60.91569999999999,
                    lng: 33.9165549
                },
                southwest: {
                    lat: 34.5614,
                    lng: -8.8988999
                }
            }
        },
        place_id: 'ChIJqZHHQhE7WgIReiWIMkOg-MQ',
        types: ['country', 'political']
    }
    ],
    status: 'OK'
};
