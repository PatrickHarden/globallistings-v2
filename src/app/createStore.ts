import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../redux/reducers';
import { identity } from 'ramda';
import { History } from 'history';
import { DeepPartial } from '../types/common/deep-partial';
import { State } from '../types/state';

const createReducers = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

/* istanbul ignore next */
const allowDebugging =
  process.env.NODE_ENV !== 'production' ||
  (localStorage && localStorage.getItem('reactDebug') === 'yes');

const analytics = ({ getState }: any) => (next: any) => (action: any) => {
  if (action.analytics) {
    const state = getState().app;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action.type,
      data: action.analytics,
      siteInfo: {
        locale: state.language ? state.language.locale : '',
        siteId: state.params ? state.params.params.Site : '',
        siteType: state.siteType,
      },
    });
  }

  return next(action);
};

const buildStore = (initialState: DeepPartial<State>, history: History) => {
  /*  eslint-disable no-underscore-dangle */
  const devToolsExt =
    allowDebugging && window.devToolsExtension
      ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      : identity;

  const middleWare = allowDebugging
    ? applyMiddleware(routerMiddleware(history), analytics, thunkMiddleware, createLogger())
    : applyMiddleware(routerMiddleware(history), analytics, thunkMiddleware);

  const store = createStore(
    createReducers(history),
    initialState as any,
    compose(
      middleWare,
      devToolsExt
    )
  );

  return store;
};
export default buildStore;
