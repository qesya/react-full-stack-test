import * as React from 'react';
import styled from 'styled-components';
import { history } from '../helpers';

export const LinkWrap = styled.a`
  text-decoration: none;
  color: ${props => props.color};
  display: block;

  :hover {
    color: ${props => props.hover};
    text-transform: inherit;
  }
`;


const link = (props) => {

  const onClick = (event) => {
    event.preventDefault()
    history.push(props.url)
  }

  return (
    <LinkWrap href={props.url} color={props.color} hover={props.hover} onClick={onClick}>{props.title}</LinkWrap>
  )
}

export default link