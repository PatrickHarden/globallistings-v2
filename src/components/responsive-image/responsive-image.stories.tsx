import React from 'react';
import { storiesOf } from '@storybook/react';
import { ResponsiveImage } from './responsive-image';
import styled from 'styled-components';

const ResponsiveImage100Px = styled(ResponsiveImage)`
  width: 100px;
  height: 100px;
`;

const ResponsiveImage100by200Px = styled(ResponsiveImage)`
  width: 100px;
  height: 200px;
`;

const ResponsiveImage200by100Px = styled(ResponsiveImage)`
  width: 200px;
  height: 100px;
`;

storiesOf('Responsive Image', module)
  .add('No size specified', () => (
    <ResponsiveImage src="https://images.unsplash.com/photo-1485181044355-5b94cc167214" />
  ))
  .add('100px by 100px', () => (
    <ResponsiveImage100Px src="https://images.unsplash.com/photo-1485181044355-5b94cc167214" />
  ))
  .add('100px by 200px', () => (
    <ResponsiveImage100by200Px src="https://images.unsplash.com/photo-1485181044355-5b94cc167214" />
  ))
  .add('200px by 100px', () => (
    <ResponsiveImage200by100Px src="https://images.unsplash.com/photo-1485181044355-5b94cc167214" />
  ));
