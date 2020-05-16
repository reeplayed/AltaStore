import React from 'react';
import NavBar from '../sections/NavBar';
import styled from 'styled-components';
import Filters from '../sections/Filters';
import ProductCard from '../components/ProductCard';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProductListContent = styled.div`
  margin: 20px 0 0 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 0;
  @media (max-width:${({ theme })=>theme.breakpoints.desktop}){
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width:${({ theme })=>theme.breakpoints.md}){
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width:${({ theme })=>theme.breakpoints.mobile}){
    grid-template-columns: repeat(1, 1fr);
  }
`;
const PaginationContent = styled.div`
  margin: 40px 0 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PaginationButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 5px 10px;
  margin: 0 4px 0 4px;
  width: 40px;
  height: 40px;
  font-size: 1.3rem;
  color: ${({ theme: { colors }, activePage }) =>
        activePage ? colors.primary : colors.white};
  background: ${({ theme: { colors }, activePage }) =>
        activePage ? colors.white : colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  cursor: pointer;
`;
const Typography = styled.span`
  display: block;
  color: ${({theme})=>theme.colors.primary};
  font-size: 1.2rem;
`;
const Wrapper = styled.div`
margin-top: 100px; 
display: flex;
align-items: center;
justify-content: center;
`;
const ProductList = props => {
    const [
        loading,
        products,
        currentPage,
        totalPages,
        Filter,
        paginationHandler
    ] = Filters(props);

    let pages = [];
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <PaginationButton
                activePage={page === currentPage}
                onClick={() => paginationHandler(page)}
            >
                {page}
            </PaginationButton>
        );
    }
    return (
        <>
            <NavBar />
            {Filter}
                {loading ? (
                  <Wrapper>
                    <CircularProgress size='15rem'/>
                  </Wrapper>
                ) : products.length ? (
                  <ProductListContent>
                  {products.map(prod => (
                    <ProductCard
                        title={prod.name}
                        image={prod.card_image}
                        price={prod.price}
                        slug={prod.slug}
                        rating={prod.average_rating}
                    />
                ))}
                  </ProductListContent>
                ):(
                  <Wrapper>
                     <Typography>
                        Brak produktów z podanymi kryteriami...
                     </Typography>
                  </Wrapper>
                )}
               
            {!loading && products.length && <PaginationContent>{pages}</PaginationContent>}
        </>
    );
};
export default ProductList;
