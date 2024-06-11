import { createStandardAction } from 'typesafe-actions';

export const onPropertyEnter = createStandardAction('LIST_PROPERTY_MOUSEENTER')<string>();

export const onPropertyLeave = createStandardAction('LIST_PROPERTY_MOUSELEAVE')<string>();
