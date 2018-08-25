import React from 'react';
import { withTheme } from 'styled-components';
import './styles.css';

const MouseIcon = ({ theme }) => (
  <a class="scroll-link" href="#about">
    <svg class="mouse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 130">
      <g fill="none" fill-rule="evenodd">
        <rect
          width="70"
          height="118"
          x="1.5"
          y="1.5"
          stroke={theme.colors.primary}
          stroke-width="3"
          rx="36"
        />
        <circle
          class="scroll"
          cx="36.5"
          cy="31.5"
          r="4.5"
          fill={theme.colors.primary}
        />
      </g>
    </svg>
  </a>
);

export default withTheme(MouseIcon);
