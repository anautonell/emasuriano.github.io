import React from 'react';
import Headroom from 'react-headroom';
import { Flex } from 'rebass';
import styled, { withTheme } from 'styled-components';
import RouteLink from './RouteLink';
import withLocation from '../utils/withLocation';
import Logo from './Logo';

const HeaderContainer = styled(Headroom)`
  .headroom--pinned {
    background: ${props => props.theme.colors.primaryDark};
  }

  position: absolute;
  width: 100%;
`;

const LogoHeader = withTheme(
  withLocation(({ location, theme }) => (
    <a href="#home">
      <Logo width="50px" />
    </a>
  )),
);

const Header = props => {
  return (
    <HeaderContainer>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <LogoHeader />
        <Flex mr={[0, 3, 5]}>
          <RouteLink label="About" to="about" />
          <RouteLink label="Projects" to="projects" />
          <RouteLink label="Writing" to="writing" />
        </Flex>
      </Flex>
    </HeaderContainer>
  );
};

export default Header;
