import axios from "axios";

import { encryptUser } from '../../utils/userEncryptor';

const userUrl = "/api/users";

export const login = async (username, password) => {
    const { data } = await axios.post(`${userUrl}/login`, {
        username,
        password,
    });

    if(data) {
        const encryptedUser = encryptUser(data);
        localStorage.setItem('user', encryptedUser);
    }

    return data;
}

export const register = async (userData) => {
    const { data } = await axios.post(`${userUrl}/register`, userData);
    return data;
}

export const logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('key');
}

const authService = {
    login,
    register,
    logout,
};

export default authService;