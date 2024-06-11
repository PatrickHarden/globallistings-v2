# agency-v2

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This project uses [yarn](https://yarnpkg.com/en/). Its it recommended to install this globally. Instructions for your platform are behind the link

Running `yarn` from your command shell will initialise the project

## Table of Contents

[Available Scripts](#available-scripts) - How to lint/test/start

[Coding Standards](#code/naming-standards) - Brief description of the standards used

[Deployment](#deployment) - How to deploy

---


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn lint`

Runs eslint over the code in the `/src` folder <br>
Note that linting is automatically carried out before commiting any code

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Code/naming standards

### Naming

Component folder names: mixed case eg `ContactSearch`

Container folder names: mixed case eg `ContactSearch`

Folder names: lower case 'snake' eg `contact-search`

js file names: camel case eg `contactSearch.js`

jsx file names: camel case eg `contactSearch.jsx`

### Containers

- are connected components
- index should not contain any component code

### Components

- should not contain any logic other than for presentation

#### Selectors

- should not contain any presentation logic

## Deployment

## Debug pipeline

Debug Bitbucket pipeline locally with `docker run -it --volume=/Users/<user>/<...>/agency365.spa.v2:/spa --workdir="/spa" --memory=4g --memory-swap=4g --memory-swappiness=0 --entrypoint=/bin/bash agency365/bitbucket-python-pip-yarn`

# CMS Config

We have introduced new config values in v2, mostly to be able to modify url path. Currently the template for url structure is `/:usageType/:transactionType/:location/results'` check `src/constants/routePaths.ts` file in the repo for a most up to date version.

## Usage Type

Usage type (e.g. office, retails, other) allow to dynamically change the config without doing a full page refresh. To use this feature we need to setup a config options:

```json
{
  "currentConfig": "office", // name of the current config, this has to match the name defined in one of the filters.options
  "filters": [
    {
      "name": "usageType", // A part of the URL which will be changed, check url structure above for supported segments
      "type": "select", // Has to be `select`
      "modifier": "url", // Has to be `url`, supports `url` and `query`.
      "placement": "lm_primaryFilter", // Position of the filter
      "label": "Property Type", // A label which will be displayed in the UI as a header for the dropdown (can be anything)
      "options": [
        { "value": "office", "label": "Office", "default": false }, // None of the options ca be default
        { "value": "industrial", "label": "Industrial", "default": false }, // value has to correspond to the `otherConfigs.name`
        { "value": "retail", "label": "Retail", "default": false }
      ] // All options defined, must include the current config (`office`) in the list as well
    }
  ],
  "otherConfigs": [
    {
      "endpoint": "https://uat.immobiliare.cbre.it/it-IT/api/spaconfig/145",
      "name": "retail" // Name must correspond to the name defined in the config 145 under property `currentConfig`
    },
    {
      "endpoint": "https://uat.immobiliare.cbre.it/it-IT/api/spaconfig/142",
      "name": "other" // Name also has to correspond to the `filters.options`
    }
  ]
}
```

## Transaction Type

Transaction type defines if the property is for sale to let.

```json
{
  "filters": [
    {
      "name": "transactionType", // Part of the url it will modify
      "type": "select", // Has to be select
      "modifier": "url", // Has to be url
      "label": "TransType", // Can be anything defines what label is shown in the UI
      "placement": "lm_primaryFilter", // Filter placement
      "options": [
        { "value": "letting", "label": "To Let", "default": true }, // A default one has to be specified
        { "value": "sale", "label": "To Buy", "default": false } // only letting and sale is allowed
      ]
    }
  ]
}
```

If want to support more types we will have to modify SPA to add additional mappings
