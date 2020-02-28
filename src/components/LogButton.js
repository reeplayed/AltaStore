import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid;
  border-radius: 3px;
  padding: 1rem;
  font-size: 1.5rem;
  width: 100%;
  margin: 14px 0;
  color: white;
  font-family: ${({ theme }) => theme.fonts.heading};
`;
export const LoginButton = styled(Button)`
  background: ${({ bgcolor, theme }) =>
        bgcolor ? theme.colors.grey : theme.colors.primary};
`;
export const FacebookLoginButton = styled(Button)`
  border: 0;
  background: ${({ theme }) => theme.colors.facebook};
`;

const LogButton = ({ children }) => {
    return <Button>{children}</Button>;
};

export default LogButton;
