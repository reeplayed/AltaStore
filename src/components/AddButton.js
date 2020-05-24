import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.md};
  padding: 5px;
  background: ${({ theme }) => theme.colors.primary};
`;
const ButtonContent = styled.span`
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.md};
  height: 23px;
  max-width: 23px;
  width: 23px;
`;
const InnerButton = styled.span`
  display: inline-block;
  width: 100%;
  height: 3px;
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.circle};
  position: relative;
  margin: auto;
  &,
  &:after {
    border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.xxl};
    background: ${({ theme }) => theme.colors.white};
  }
  &:after {
    content: '';
    background: ${({ add }) => (add ? 'transparent' : '')};
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    transform: rotate(90deg);
  }
`;
const AddButton = ({ add, onclick }) => {
  return (
    <Button onClick={onclick}>
      <ButtonContent>
        <InnerButton add={add} />
      </ButtonContent>
    </Button>
  );
};

export default AddButton;
