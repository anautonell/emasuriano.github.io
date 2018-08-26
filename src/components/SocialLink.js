import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, Label } from 'rebass';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';
import { hover } from 'glamor';

const IconLink = styled(Link)`
  transition: color 0.5s;
  color: ${props => props.theme.colors[props.color]};

  &:hover {
    color: ${props => props.theme.colors[props.hover]};
  }
`;

const SocialLink = ({ page, name, link, color, hoverColor, ...props }) => (
  <Label {...props}>
    <Tooltip title={name} position="bottom" trigger="mouseenter">
      <IconLink href={link} target="_blank" color={color} hover={hoverColor}>
        <FontAwesome name={page} />
      </IconLink>
    </Tooltip>
  </Label>
);

export default SocialLink;
