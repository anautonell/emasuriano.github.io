import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';

const FooterContainer = styled.footer`
  padding: 1em;
  background: ${props => props.theme.colors.primaryDark};
  color: ${props => props.theme.colors.background};
  text-align: right;
`;

const Footer = () => (
  <FooterContainer>
    <Text>
      Built with Gatsby and Contentful
      <span role="img" aria-label="heart">
        ❤️
      </span>
      - 2018
    </Text>
  </FooterContainer>
);

export default Footer;
