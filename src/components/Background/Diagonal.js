import React from 'react';
import styled, { withTheme } from 'styled-components';

const DiagonalContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
`;

const Diagonal = ({ width, theme }) => {
  return (
    <DiagonalContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <line
          x1="120%"
          y1="25%"
          x2="-20%"
          y2="65%"
          stroke={theme.colors.background}
          stroke-width={width}
        />
      </svg>
    </DiagonalContainer>
  );
};

export default withTheme(Diagonal);
