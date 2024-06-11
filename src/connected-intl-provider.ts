import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import de from 'react-intl/locale-data/de';
import it from 'react-intl/locale-data/it';
import fr from 'react-intl/locale-data/fr';
import no from 'react-intl/locale-data/no';
import pt from 'react-intl/locale-data/pt';
import es from 'react-intl/locale-data/es';
import sr from 'react-intl/locale-data/sr';
import he from 'react-intl/locale-data/he';
import fi from 'react-intl/locale-data/fi';
import zh from 'react-intl/locale-data/zh';
import nb from 'react-intl/locale-data/nb';
import pl from 'react-intl/locale-data/pl';

import { State } from './types/state';
import { messagesSelector, localeSelector } from './redux/selectors/state';

addLocaleData([...de, ...it, ...fr, ...no, ...nb, ...pt, ...es, ...sr, ...he, ...fi, ...zh, ...pl]); // TODO: Dynamically load locale data

const mapStateToProps = (state: State) => ({
  locale: localeSelector(state),
  messages: messagesSelector(state),
});

export default connect(mapStateToProps)(IntlProvider);
