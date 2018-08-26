import React from 'react';
import styled from 'styled-components';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Heading, Flex } from 'rebass';
import Triangle from './Background/Triangle';

const SectionContainer = styled.section`
  min-height: 100vh;
  min-width: 400px;
  max-width: 1366px;
  display: flex;
  margin: auto;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  /* background: ${props => props.theme.colors.backgroundColor}; */
  /* background-image: linear-gradient(to top, #845ec2, #a086d4, #bdaee4, #ddd6f2, #ffffff); */
  /* background: #FBEAFF */
  padding: 5em 1em;
`;

const defaultBackground = () => <div />;

const Container = ({ id, children, Background = defaultBackground }) => (
  <div style={{ position: 'relative' }}>
    <Background />
    <ScrollableAnchor id={id}>
      <SectionContainer>{children}</SectionContainer>
    </ScrollableAnchor>
  </div>
);

const Header = ({ name, icon, label }) => (
  <Heading color="secondaryDark" mb={4}>
    {name}
    <span role="img" aria-label={label} style={{ marginLeft: '10px' }}>
      {icon}
    </span>
  </Heading>
);

export default {
  Container,
  Header,
};
