import styled from 'styled-components';

export default styled.section`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  display: ${({ display }) => display};
  background: ${({ bcolor }) => bcolor};
`;
