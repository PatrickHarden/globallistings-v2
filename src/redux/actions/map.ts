import { createStandardAction } from 'typesafe-actions';

export const onPinClicked = createStandardAction('MAP_PIN_CLICKED')<string>();
