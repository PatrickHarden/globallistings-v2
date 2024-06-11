import { FilterModifier } from '../../types/config';
import { updateQueryParams, updatePath } from './navigation';
import { isPlpPathValue } from '../../types/plp';

export const handleFilterChange = (param: string, value: string, modifier: FilterModifier) => (
  dispatch: Function
) => {
  if (modifier === FilterModifier.url) {
    if (!isPlpPathValue(param)) {
      throw new Error(
        `Can only modify path for predefined values. Value ${param} is not supported`
      );
    }
    dispatch(updatePath(param, value));
  } else {
    dispatch(updateQueryParams({ [param]: value }));
  }
};
