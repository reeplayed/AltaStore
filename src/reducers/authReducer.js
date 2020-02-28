import { SET_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    username: '',
    email: '',
    image: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            const userInfo = action.data;
            return {
                isAuthenticated: true,
                username: userInfo.username,
                email: userInfo.email,
                image: userInfo.image
            };

        case LOGOUT_USER:
            return {
                isAuthenticated: false
            };

        default:
            return state;
    }
};
