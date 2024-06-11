import React from 'react';
import { Provider } from 'react-redux';
import { History } from 'history';
import axios from 'axios';

import { DeepPartial } from './types/common/deep-partial';
import { State, isConfigObject } from './types/state';
import { Config } from './types/config';

import { convert } from './api/converters/config';
import ConnectedIntlProvider from './connected-intl-provider';
import buildStore from './app/createStore';

import { GlobalStyle } from './global-styles';

import ErrorBoundary from './components/error-boundary/error-boundary';
import App from './app/app';

const createApp = (config: Config, history: History) => {
  const initialStore: DeepPartial<State> = {
    entities: {
      config,
    },
  };

  const store = buildStore(initialStore, history);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <ErrorBoundary>
        <ConnectedIntlProvider>
          <App history={history} />
        </ConnectedIntlProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export const loadApp = (config: string | Config, history: History): Promise<JSX.Element> => {
  const ca = (conf: Config) => createApp(convert(conf), history);
  if (isConfigObject(config)) {
    return Promise.resolve(ca(config));
  }
  return axios.get(config).then(res => {
    return ca(res.data);
  });
};
