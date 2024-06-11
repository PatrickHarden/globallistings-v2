import Loadable from 'react-loadable';
import { LoadableLoader } from '../../components/loader/loader';
import { withValidation } from '../../components/validator/validator';
import { validateUrl } from '../../redux/actions/geocode';
import {
  isPlpLocationGeocoded,
  isUsageTypeConfigLoaded,
  isPlpPath,
} from '../../redux/selectors/plp';
import { fetchConfig } from '../../redux/actions/config';
import { compose } from 'ramda';

const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "PLP" */ './plp-container'),
  loading: LoadableLoader,
});

const validateLocationName = withValidation({
  isValid: isPlpLocationGeocoded,
  validate: validateUrl,
});

const validatePropertyType = withValidation({
  isValid: isUsageTypeConfigLoaded,
  validate: fetchConfig,
});

const validatePlpUrl = withValidation({
  isValid: isPlpPath,
  validate: () => () => undefined,
});

export default compose(
  validatePlpUrl,
  validatePropertyType,
  validateLocationName
)(LoadableComponent);
