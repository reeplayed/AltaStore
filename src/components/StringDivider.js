import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  &:before,
  &:after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  }
  &:before {
    margin-right: 0.25em;
  }
  &:after {
    margin-left: 0.25em;
  }
`;
