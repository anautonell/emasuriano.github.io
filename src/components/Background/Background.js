import React, { Component } from 'react';
import ScrollListener from 'react-scroll-listen';
import styled, { withTheme } from 'styled-components';
import Triangle from './Triangle';
import Diagonal from './Diagonal';

class Background extends Component {
  state = {
    scrollPosition: 0,
  };

  updateScroll = scrollPosition => this.setState({ scrollPosition });

  render() {
    const { scrollPosition } = this.state;

    return (
      <React.Fragment>
        <ScrollListener onScroll={this.updateScroll} />

        {/* <Triangle
          color="#4b007d"
          top="25vh"
          right="75vw"
          topMobile="40vh"
          rightMobile="60vw"
          invert
        />

        <Triangle
          color="#cecdfe"
          top="25vh"
          right="75vw"
          topMobile="120vh"
          rightMobile="40vw"
        />

        <Triangle
          color="#ff4081"
          top="28vh"
          right="40vw"
          topMobile="120vh"
          rightMobile="35vw"
        /> */}

        {/* <Diagonal width={`${40 + scrollPosition / 10}%`} /> */}
      </React.Fragment>
    );
  }
}

export default Background;
