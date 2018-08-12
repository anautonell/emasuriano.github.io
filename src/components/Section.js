import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  background: ${props => props.theme.backgroundColor};
`;

export default Section;
