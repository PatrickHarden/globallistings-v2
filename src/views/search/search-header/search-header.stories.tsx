import React from 'react';
import { storiesOf, RenderFunction } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import SearchHeader from './search-header';

const ResidentialDecorator = (story: RenderFunction) => (
  <div className="residential">{story()}</div>
);

const props = {
  searchHeaderTitleText: 'Search for properties',
  searchHeaderLinkText: 'Interested in looking a properties?',
  searchHeaderLinkUrl: 'http://www.google.com',
};
const propsNoLink = {
  searchHeaderTitleText: 'Search for properties',
};

storiesOf('SearchComponents/SearchHeader', module)
  .add('with link', withInfo()(() => <SearchHeader {...props} />))
  .add('without link', withInfo()(() => <SearchHeader {...propsNoLink} />));
storiesOf('Themes/Residential/SearchComponents/SearchHeader', module)
  .addDecorator(ResidentialDecorator)
  .add(
    'with link',
    withInfo()(() => (
      <React.Fragment>
        <div>Residential Sites do not use SearchHeader</div>
        <SearchHeader {...props} />
      </React.Fragment>
    ))
  );
