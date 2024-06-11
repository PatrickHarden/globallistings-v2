import { combineReducers } from 'redux';
import search from './search';
import autocomplete from './autocomplete';
import render from './render';
import map from './map';
import list from './list';

export default combineReducers({ search, autocomplete, render, map, list });
