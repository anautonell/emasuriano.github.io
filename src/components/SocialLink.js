import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, Label } from 'rebass';
import ReactHoverObserver from 'react-hover-observer';

const SocialLink = ({ page, link, color, hoverColor, ...props }) => (
  <Label {...props}>
    <ReactHoverObserver>
      {({ isHovering }) => (
        <Link
          href={link}
          target="_blank"
          color={isHovering ? hoverColor : color}
          css={{ transition: 'color 0.5s' }}
        >
          <FontAwesome name={page} />
        </Link>
      )}
    </ReactHoverObserver>
  </Label>
);

export default SocialLink;
