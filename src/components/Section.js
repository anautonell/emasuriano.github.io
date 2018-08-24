import React from 'react';
import styled from 'styled-components';
import ScrollableAnchor from 'react-scrollable-anchor';

const SectionContainer = styled.section`
  min-height: 100vh;
  max-width: 1366px;
  display: flex;
  margin: auto;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  background: ${props => props.theme.colors.backgroundColor};
  padding: 5em 1em;
  border: 5px solid black;
`;

const Section = ({ id, children }) => (
  <div>
    <ScrollableAnchor id={id}>
      <SectionContainer>{children}</SectionContainer>
    </ScrollableAnchor>
  </div>
);

export default Section;
