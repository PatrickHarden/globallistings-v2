import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';

import { Config } from './types/config';
import { loadApp } from './root';

const renderApp = (elementId: string, config: string | Config, basePath: string) => {
  const el = document.getElementById(elementId);
  if (!el) {
    console.error(`failed getting element ${elementId}`);
    return;
  }

  const history = createBrowserHistory({
    basename: basePath,
  });

  loadApp(config, history)
    .then(app => {
      render(app, el);
    })
    .catch(ex => {
      console.error('Failed rendering SPA');
      console.error(ex);
    });
};

class Agency365Search {
  public renderSearch = renderApp;

  constructor() {
    // TODO what is this???
    if (!(this instanceof Agency365Search)) {
      return new Agency365Search();
    }
  }
}

(global as any).Agency365Search = Agency365Search;

export default Agency365Search;
