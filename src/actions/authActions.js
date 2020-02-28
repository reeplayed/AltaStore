import { SET_USER, LOGOUT_USER } from './types';
import axios from '../axios';

export const setUser = () => {
    axios.defaults.headers.common['Authorization'] =
    'Token ' + localStorage.token;
    const user_info = JSON.parse(localStorage.user_info || '{}');
    return {
        type: SET_USER,
        data: user_info
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];

    dispatch({
        type: LOGOUT_USER
    });
};
