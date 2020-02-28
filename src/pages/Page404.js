import React from 'react';
import NavBar from '../sections/NavBar';
import styled from 'styled-components';

const Banner404 = styled.h1`
  margin: 200px 0 0 0;
  font-size: 3rem;
  color: black;
`;

const Page404 = () => {
    return (
        <>
            <NavBar />
            <Banner404>404 Not Found</Banner404>
        </>
    );
};
export default Page404;
