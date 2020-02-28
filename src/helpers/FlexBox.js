import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
`;
