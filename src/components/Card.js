import React from 'react';
import styled from 'styled-components';
import { Box, Card as CardRebass } from 'rebass';

export const CardContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-items: center;
`;

export const Card = ({ children, ...props }) => {
  return (
    <Box>
      <CardRebass {...props}>{children}</CardRebass>
    </Box>
  );
};

export default Card;
