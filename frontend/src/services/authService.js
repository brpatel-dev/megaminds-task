import axios from "axios";

const API_URL = "https://megaminds-task.vercel.app/api/auth";

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
    const res = await axios.post(`${API_URL}/login`, userData);
    localStorage.setItem("token", res.data.token);
    return res.data;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};
