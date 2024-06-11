import { AutocompleteConfig } from '../../redux/selectors/config/autocomplete-config';
import { Autocomplete } from '../../types/autocomplete';
import { Geocode } from '../../types/state';
import { googleBoundsToBounds } from '../../utils/bounds';
import { convertGoogleLatLng } from '../../utils/latLng';

const geocode = async (
  request: google.maps.GeocoderRequest
): Promise<google.maps.GeocoderResult[]> => {
  const geocoder: google.maps.Geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
};

const convertGeocode = (geocodeResults: google.maps.GeocoderResult): Geocode => {
  const { bounds, viewport } = geocodeResults.geometry;
  // Use viewport if bounds property does not exist to suport legacy locations
  const googleBounds = bounds || viewport;
  return {
    bounds: googleBoundsToBounds(googleBounds),
    center: convertGoogleLatLng(googleBounds.getCenter()),
  };
};

export const placeGeocode = async (
  address: string,
  restrictions: google.maps.GeocoderComponentRestrictions
): Promise<Geocode> => {
  const addresses = await geocode({
    address,
    componentRestrictions: restrictions,
  });
  if (addresses.length === 0) {
    throw new Error('No matching location');
  }
  return convertGeocode(addresses[0]);
};

const convertAutocomplete = (
  autocomplete: google.maps.places.AutocompletePrediction
): Autocomplete => ({ description: autocomplete.description, placeId: autocomplete.place_id });

export const placesAutocomplete = async (
  input: string,
  config: AutocompleteConfig
): Promise<Autocomplete[]> => {
  if (input === '') {
    return [];
  }

  const service = new google.maps.places.AutocompleteService();

  const countryConfig = config.country
    ? {
        componentRestrictions: { country: config.country },
      }
    : {};

  const biasConfig = config.bias
    ? {
        radius: config.bias.radius,
        location: new google.maps.LatLng(config.bias.lat, config.bias.lng),
      }
    : {};

  // if we have 4 - 5 digits and all are numeric=and the config tells us to assume zip code, check to see if it's an assumed zip code
  let zipCode: boolean = false;
  if (
    config.allowAssumeZipCode &&
    (input.length === 4 || input.length === 5) &&
    !isNaN(Number(input))
  ) {
    zipCode = true;
  }

  // if we assume this is a zip code, we need to modify the types array
  const typesArray = config.types ? config.types.slice(0, config.types.length) : [];
  if (zipCode === true) {
    if (typesArray.indexOf('(regions)') === -1) {
      typesArray.push('(regions)');
    }
  }
  const typesConfig = {
    types: typesArray,
  };

  return new Promise((resolve, reject) => {
    service.getPlacePredictions(
      {
        input,
        ...countryConfig,
        ...biasConfig,
        ...typesConfig,
      },
      (predictions, status) => {
        if (
          status !== google.maps.places.PlacesServiceStatus.OK ||
          predictions == null ||
          predictions === undefined
        ) {
          reject(status);
        } else {
          resolve(predictions.map(convertAutocomplete));
        }

        if (predictions != null) {
          resolve(predictions.map(convertAutocomplete));
        }
      }
    );
  });
};

export const placeGeocodeById = async (placeId: string): Promise<google.maps.LatLngLiteral> => {
  const result = await geocode({ placeId });
  return result[0].geometry.location.toJSON();
};
