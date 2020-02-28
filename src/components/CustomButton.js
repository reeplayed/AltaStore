import styled from 'styled-components';

export default styled.button`
  margin: 10px 0;
  padding: 6px 20px;
  background: ${({ theme: { colors }, primary }) =>
        primary ? colors.primary : colors.white};
  color: ${({ theme: { colors }, primary }) =>
        primary ? colors.white : colors.primary};
  border: 1px solid ${({ theme: { colors } }) => colors.primary};
  border-radius: 5px;
  font-size: 1.9rem;
  display: block;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: ${({ theme: { colors }, primary }) =>
        primary ? colors.white : colors.primary};
    color: ${({ theme: { colors }, primary }) =>
        primary ? colors.primary : colors.white};
  }
`;
