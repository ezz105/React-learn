import axios from "axios";

const API_BASE_URL = 'https://dummyjson.com';

export const getProduct = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const getProductById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
};
