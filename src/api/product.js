import api from './axios';

export const getProducts = () => {
    return api.get('api/v1/categories');
};    

