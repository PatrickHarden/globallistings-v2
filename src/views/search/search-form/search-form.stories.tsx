import React from 'react';
import { storiesOf, RenderFunction } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import SearchForm from './search-form';

const ResidentialDecorator = (story: RenderFunction) => (
  <div className="residential">{story()}</div>
);

const searchPathSelectors = [
  {
    value: '/listmap/office',
    label: 'Offices in',
    default: false,
  },
  {
    value: '/listmap/industrial',
    label: 'Industrial in',
    default: true,
  },
];

const buyButtonInfo = {
  url: '/buyButtonInfo',
  text: 'buyButtonInfo',
  visible: true,
};

const letButtonInfo = {
  url: '/letButtonInfo',
  text: 'letButtonInfo',
  visible: true,
};

const props = {
  biasRadius: 10,
  buyButtonInfo,
  language: {
    SearchLocationPlaceholder: 'Placeholder Text',
  },
  letButtonInfo,
  locationTypeDefinitions: [],
  resetSearchLocation: action('resetSearchLocation'),
  restrictToCountry: 'uk',
  searchBias: {
    lat: '51.48',
    lon: '0',
  },
  suggestions: [],
  changePlaceSearch: action('changePlaceSearch'),
  changePropertySearch: action('changePropertySearch'),
  setSearchLocation: action('setSearchLocation'),
  updateSearchPath: action('updateSearchPath'),
};

storiesOf('views/search/search-form', module)
  .add('default props', withInfo()(() => <SearchForm {...props} />))
  .add(
    'hide buy button',
    withInfo()(() => <SearchForm {...props} buyButtonInfo={{ ...buyButtonInfo, visible: false }} />)
  )
  .add(
    'hide let button',
    withInfo()(() => <SearchForm {...props} letButtonInfo={{ ...letButtonInfo, visible: false }} />)
  )
  .add(
    'with searchPathSelectors',
    withInfo()(() => <SearchForm {...props} searchPathSelectors={searchPathSelectors} />)
  )
  .add(
    'with searchPathSelectors and searchPath set',
    withInfo()(() => (
      <SearchForm
        {...props}
        searchPathSelectors={searchPathSelectors}
        searchPath="/listmap/industrial"
      />
    ))
  );
storiesOf('Themes/Residential/views/search/search-form', module)
  .addDecorator(ResidentialDecorator)
  .add('default props', withInfo()(() => <SearchForm {...props} />))
  .add(
    'hide buy button',
    withInfo()(() => <SearchForm {...props} buyButtonInfo={{ ...buyButtonInfo, visible: false }} />)
  )
  .add(
    'hide let button',
    withInfo()(() => <SearchForm {...props} letButtonInfo={{ ...letButtonInfo, visible: false }} />)
  )
  .add(
    'with searchPathSelectors',
    withInfo()(() => <SearchForm {...props} searchPathSelectors={searchPathSelectors} />)
  )
  .add(
    'with searchPathSelectors and searchPath set',
    withInfo()(() => (
      <SearchForm
        {...props}
        searchPathSelectors={searchPathSelectors}
        searchPath="/listmap/industrial"
      />
    ))
  );
