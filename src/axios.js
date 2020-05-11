import axios from 'axios';

export const baseURL = 'http://initializer.herokuapp.com';

export default axios.create({
    baseURL: baseURL
});
