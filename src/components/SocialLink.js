import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, Label } from 'rebass';
import { withTheme } from 'styled-components';

const SocialLink = ({ page, link, size, theme, ...props }) => (
  <Label {...props}>
    <Link href={link} target="_blank" color={theme.color}>
      <FontAwesome name={page} />
    </Link>
  </Label>
);

export default withTheme(SocialLink);
