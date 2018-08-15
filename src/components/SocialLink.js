import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, Label } from 'rebass';

const SocialLink = ({ page, link, color, ...props }) => (
  <Label {...props}>
    <Link href={link} target="_blank" color={color}>
      <FontAwesome name={page} />
    </Link>
  </Label>
);

export default SocialLink;
