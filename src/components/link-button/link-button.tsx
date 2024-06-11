import React, { FC } from 'react';
import styled from 'styled-components';

const BaseLinkButton = styled.a`
  text-align: center;
  padding: ${props => `${props.theme.gutter.s} ${props.theme.gutter.l}`};
  color: ${props => props.theme.colours.light};
  background-color: ${props => props.theme.colours.primary};
  text-decoration: none;
  outline: 0;
  border: 0;
  text-transform: uppercase;
  display: block;

  svg {
    margin-left: ${props => props.theme.gutter.s};
    vertical-align: middle;
  }

  &:hover {
    background-color: ${props => props.theme.colours.primaryDark};
    color: ${props => props.theme.colours.light};
    text-decoration: none;
  }
`;

interface Props {
  readonly href: string;
  readonly icon?: React.ReactElement<any>;
}

const LinkButton: FC<Props> = ({ children, icon, ...props }) => (
  <BaseLinkButton {...props}>
    {children}
    {icon}
  </BaseLinkButton>
);

export default LinkButton;
