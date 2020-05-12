import React from 'react';
import GlobalStyles from './GlobalStyled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page404 from './pages/Page404';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Register from './pages/Register';
import { connect } from 'react-redux';
import { setUser } from './actions/authActions';
import { setCart } from './actions/cartActions';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';

class App extends React.Component {
    constructor (props) {
        super(props);
        if (localStorage.token) {
            this.props.setUser();
        }
        this.props.setCart();
    }

    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/404" component={Page404} />
                    <Route exact path="/product/:slug" component={ProductDetail} />
                    <Route exact path="/:category" component={ProductList} />
                </Switch>
                <GlobalStyles />
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, { setCart, setUser })(App);
