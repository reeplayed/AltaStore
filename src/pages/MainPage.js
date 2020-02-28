import React, { Component } from 'react';
import Header from '../sections/Header';
import NavBar from '../sections/NavBar';
import ProductsSlideShow from '../sections/ProductsSlideShow';
import Info from '../sections/Info';
import Footer from '../sections/Footer';
import SimpleSnackbar from '../components/Snackbar';

class MainPage extends Component {
    render () {
        return (
            <>
                <NavBar scroll />
                <Header key="2" />
                <ProductsSlideShow title="Najczęściej kupywane produkty" type="sell" />
                <Info />
                <ProductsSlideShow title="Najlepiej ocenione produkty" type="rating" />
                <Footer />
                <SimpleSnackbar />
            </>
        );
    }
}

export default MainPage;
