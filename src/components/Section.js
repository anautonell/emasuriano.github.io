import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  max-width: 1366px;
  display: flex;
  margin: auto;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  background: ${props => props.theme.colors.backgroundColor};
`;

export default Section;
