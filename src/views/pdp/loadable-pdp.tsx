import Loadable from 'react-loadable';
import { compose } from 'ramda';

import { fetchConfig } from '../../redux/actions/config';

import { LoadableLoader } from '../../components/loader/loader';
import { withValidation } from '../../components/validator/validator';
import { isPdpPath } from '../../redux/selectors/pdp';
import { State } from '../../types/state';

const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "PDP" */ './pdp-container'),
  loading: LoadableLoader,
});

const validatePropertyAddress = withValidation({
  isValid: () => true,
  validate: fetchConfig,
});

const doNothing = () => (_: Function, __: () => State) => Promise.resolve(undefined);

const validatePdpUrl = withValidation({
  isValid: isPdpPath,
  validate: doNothing,
});

export default compose(
  validatePropertyAddress,
  validatePdpUrl
)(LoadableComponent);
