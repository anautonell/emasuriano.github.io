import React from 'react';
import Headroom from 'react-headroom';
import { Box, Flex, Link, Label } from 'rebass';
import styled, { withTheme } from 'styled-components';
import Logo from './Logo';

const RouteLink = withTheme(({ label, to, theme }) => (
  <Label ml={[2, 3]} fontSize={[2, 3]}>
    <Link color={theme.color} href={to} css={{ textDecoration: 'none' }}>
      {label}
    </Link>
  </Label>
));

const HeaderContainer = styled(Headroom)`
  .headroom {
    background: ${props => props.theme.backgroundColor}CC;
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
        <Box>
          <Logo width="50px" />
        </Box>
        <Flex>
          <RouteLink label="About" to="asdasd" />
          <RouteLink label="Projects" />
          <RouteLink label="Writing" />
          <RouteLink label="Talks" />
        </Flex>
      </Flex>
    </HeaderContainer>
  );
};

export default Header;
