import React from 'react';
import { storiesOf } from '@storybook/react';
import LinkButton from './link-button';
import { ArrowRight } from '../icons/arrow-right';

storiesOf('LinkButton', module)
  .add('Default props', () => <LinkButton href="http://www.google.com">Buy</LinkButton>)
  .add('With icon', () => (
    <LinkButton href="http://www.google.com" icon={<ArrowRight />}>
      buy
    </LinkButton>
  ));
