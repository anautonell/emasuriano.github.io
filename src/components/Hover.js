import React from 'react';
import ReactHoverObserver from 'react-hover-observer';

const Hover = ({ children }) => (
  <ReactHoverObserver>
    {({ isHovering }) => isHovering && children}
  </ReactHoverObserver>
);

export default Hover;
