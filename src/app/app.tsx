import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import styled, { ThemeProvider } from 'styled-components';

import Routes from './routes';
import { themeSelector } from '../redux/selectors/state';
import { State } from '../types/state';
import { Theme } from '../themes/default/theme';
import { siteTypeSelector } from '../redux/selectors/config/config';

const AppContainer = styled.div`
  color: ${({ theme }) => theme.colours.primaryDark};
  font-family: ${({ theme }) => theme.font.futura};
  font-size: ${({ theme }) => theme.font.size.m};
`;

interface OwnProps {
  readonly history: History;
}

interface StateProps {
  readonly siteType: string;
  readonly theme: Theme;
}

type Props = OwnProps & StateProps;

export class App extends React.Component<Props> {
  // apend class to container div to differentiate v2 from the rest of cms elements
  public componentDidMount() {
    const appDiv = document.getElementById('agency365_spa');
    let parentDiv = null;
    if (appDiv) {
      parentDiv = appDiv.parentNode;
    }
    if (parentDiv) {
      const baseElement = parentDiv.parentNode as HTMLElement;
      if (baseElement) {
        baseElement.classList.add('v2Search');
      }
    }
  }

  public render() {
    const { history, theme } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <AppContainer id="agency365_spa">
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </AppContainer>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = (state: State): StateProps => ({
  siteType: siteTypeSelector(state),
  theme: themeSelector(state),
});

export default connect(mapStateToProps)(App);
