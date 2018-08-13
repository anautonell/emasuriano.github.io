import React from 'react';
import Headroom from 'react-headroom';
import { Box, Flex, Label } from 'rebass';
import styled from 'styled-components';
import Logo from './Logo';
import { Link } from 'react-scroll';

const RouteLink = ({ label, to }) => (
  <Label
    ml={[2, 3]}
    color="primary"
    fontSize={[2, 3]}
    css={{ cursor: 'pointer' }}
  >
    <Link smooth to={to}>
      {label}
    </Link>
  </Label>
);

const HeaderContainer = styled(Headroom)`
  .headroom {
    background: ${props => props.theme.colors.background}CC;
  }

  position: absolute;
  width: 100%;
`;

const Header = props => {
  return (
    <HeaderContainer>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Box css={{ cursor: 'pointer' }}>
          <Link smooth to="landing">
            <Logo width="50px" />
          </Link>
        </Box>
        <Flex>
          <RouteLink label="About" to="about" />
          <RouteLink label="Projects" to="projects" />
          <RouteLink label="Writing" to="writing" />
          <RouteLink label="Talks" to="talks" />
        </Flex>
      </Flex>
    </HeaderContainer>
  );
};

export default Header;
