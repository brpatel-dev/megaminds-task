import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/books`;

const getAuthHeaders = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `${token}` } : {};
    }
    return {};
};

export const fetchBooks = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error fetching books";
    }
};

export const addBook = async (bookData) => {
    try {
        const response = await axios.post(API_URL, bookData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error adding book";
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, bookData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error updating book";
    }
};

export const deleteBook = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    } catch (error) {
        throw error.response?.data || "Error deleting book";
    }
};
