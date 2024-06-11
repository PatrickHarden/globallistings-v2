import { stringify } from 'querystring';
import { Dictionary } from '../types/common/dictionary';

const generateSearchUrl = (
  type: string,
  searchResultsPage: string,
  params: Dictionary<string>,
  searchMode: string,
  currentPlaceId: string
) => {
  const searchPage = searchResultsPage;
  const newParams = { ...params };
  if (searchMode) {
    newParams.searchMode = searchMode;
  }
  if (type) {
    newParams.aspects = type;
  }
  if (params && params.radius) {
    newParams.radius = params.radius;
  }
  if (currentPlaceId) {
    newParams.placeId = currentPlaceId;
  }

  return `${searchPage}?${stringify(newParams)}`;
};

export default generateSearchUrl;
