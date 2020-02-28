import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from '../axios';
import CategoryFilterComponent from '../components/CategoryFilter';
import OrderFilterComponent from '../components/OrderFilter';
import PriceFilterComponent from '../components/PriceFilter';
import ColorFilterComponent from '../components/ColorFilter';
import ClothFilterComponent from '../components/ClothFilter';
import _ from 'lodash';

const FiltersContent = styled.section`
  // display:flex;
  // flex-direction: column;
  // align-items:center;
  max-width: 700px;
  margin: 80px auto 0 auto;
  padding: 0 10px;
`;
const OtherFilters = styled.div`
  // background:#ddd;

  justify-content: center;
  display: flex;

  flex-wrap: wrap;
`;
const FilterButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;
const FilterButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 5px 30px;
  width: 100%;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Filters = props => {
    const queryString = require('query-string');
    const urlParse = queryString.parse(props.location.search);

    const initialFilterURLParams = {
        category: props.match.params.category,
        page: urlParse.page,
        price_from: urlParse.price_from,
        price_to: urlParse.price_to,
        colors: urlParse.colors,
        order: urlParse.order,
        cloth: urlParse.cloth
    };

    const [category, CategoryFilter] = CategoryFilterComponent(
        props.match.params.category
    );
    const [order, setOrder, OrderFilter] = OrderFilterComponent();
    const [cloth, setCloth, ClothFilter] = ClothFilterComponent();
    const [
        price,
        priceRange,
        setPrice,
        setPriceRange,
        PriceFilter
    ] = PriceFilterComponent();
    const [colors, setColors, setAllColors, ColorFilter] = ColorFilterComponent();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [products, setProducts] = useState([]);

    const isInitialMount = useRef(true);

    const [flag, setFlag] = useState(true);

    const submitFilterHandler = () => {
        axios
            .get('productfilterlist/', {
                params: {
                    category: category,
                    price_from: price[0],
                    price_to: price[1],
                    cloth: cloth,
                    colors: colors.join(),
                    order: order
                }
            })
            .then(res => {
                setTotalPages(res.data.total_pages);
                setProducts(res.data.results);
                setQueryString();
            })
            .catch(() => props.history.push('/404'));
    };

    const setQueryString = () => {
        let params = {
            page: page === 1 ? false : page,
            price_from: price[0] === priceRange[0] ? false : price[0],
            price_to: price[1] === priceRange[1] ? false : price[1],
            colors: colors.join(),
            cloth: cloth,
            order: order
        };

        let queryString = Object.keys(params)
            .map(key => (params[key] ? key + '=' + params[key] : undefined))
            .filter(notUndefined => notUndefined !== undefined)
            .join('&');

        props.history.push({ search: '?' + queryString });
    };
    const paginationHandler = page => {
        axios
            .get('productfilterlist/', {
                params: {
                    category: category,
                    price_from: price[0],
                    price_to: price[1],
                    cloth: cloth,
                    colors: colors.join(),
                    order: order,
                    page: page
                }
            })
            .then(res => {
                setProducts(res.data.results);
                setPage(page);
                setFlag(!flag);
            })
            .catch(() => props.history.push('/404'));
    };

    useEffect(() => {
        setQueryString();
    }, [flag]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;

            axios
                .post('/url_filters_cleaner/', initialFilterURLParams)
                .then(({ data }) => {
                    setAllColors(data.allColors);
                    setPriceRange(data.price_range);
                    setColors(
                        data.clean_params.colors ?
                            _.split(data.clean_params.colors, ',') :
                            []
                    );
                    setPrice([
                        data.clean_params.price_from ?
                            data.clean_params.price_from :
                            data.price_range[0],
                        data.clean_params.price_to ?
                            data.clean_params.price_to :
                            data.price_range[1]
                    ]);
                    setCloth(data.clean_params.cloth);
                    setOrder(data.clean_params.order);
                    setPage(data.clean_params.page);
                    setFlag(!flag);

                    axios
                        .get('productfilterlist/', { params: data.clean_params })
                        .then(res => {
                            setProducts(res.data.results);
                            setTotalPages(res.data.total_pages);
                        })
                        .catch(() => props.history.push('/404'));
                })
                .catch(() => props.history.push('/404'));
        } else {
            axios
                .get('productfilterlist/', { params: { category: category } })
                .then(res => {
                    setTotalPages(res.data.total_pages);
                    setProducts(res.data.results);
                    props.history.push(category);
                })
                .catch(() => props.history.push('/404'));
            axios
                .get('filtersparams/', { params: { filterType: category } })
                .then(res => {
                    setPriceRange(res.data.price);
                    setPrice(res.data.price);
                    setColors([]);
                    setCloth('');
                    setOrder('');
                })
                .catch(() => props.history.push('/404'));
        }
    }, [category]);

    const FiltersComponent = (
        <FiltersContent>
            <CategoryFilter />
            <OtherFilters>
                <OrderFilter />
                {PriceFilter}
                <ColorFilter />
                <ClothFilter />
            </OtherFilters>
            <FilterButtonWrapper>
                <FilterButton onClick={() => submitFilterHandler()}>
          Filtruj
                </FilterButton>
            </FilterButtonWrapper>
        </FiltersContent>
    );

    return [products, page, totalPages, FiltersComponent, paginationHandler];
};
export default Filters;
