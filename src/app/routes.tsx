import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { LoadableLoader } from '../components/loader/loader';
import LoadablePlp from '../views/plp/loadable-plp';
import LoadablePdp from '../views/pdp/loadable-pdp';
import RoutePaths from '../constants/routePaths';

const LoadableSearch = Loadable({
  loader: () => import(/* webpackChunkName: "Search" */ '../views/search/search-container'),
  loading: LoadableLoader,
});

const Routes: React.SFC = () => (
  <Switch>
    <Route
      exact={true}
      path={RoutePaths.search}
      render={props => <LoadableSearch {...props as any} />}
    />
    <Route path={RoutePaths.plp} render={props => <LoadablePlp {...props} />} />
    <Route path={RoutePaths.pdp} render={props => <LoadablePdp {...props} />} />
    <Route
      path="*"
      // component={ErrorPageComponent}
      render={() => <div>404 page or redirect</div>}
      key="errorRoute"
    />
  </Switch>
);

export default Routes;
