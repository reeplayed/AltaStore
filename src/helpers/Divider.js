import styled from 'styled-components';
import React from 'react';

export default styled.hr`
  background: ${({ theme }) => theme.colors.primary};
  width: 8rem;
  height: 1rem;
  border-radius: 50px;
  margin: 30px auto;
`;
