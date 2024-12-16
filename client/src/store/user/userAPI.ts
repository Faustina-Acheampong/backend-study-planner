import axios from 'axios';
import { LoginRequestProps, RegisterRequestProps } from '@/types/user';
const baseUrl = 'api/auth';

export const login = async (data: LoginRequestProps) => {
    const response = await axios.post(`${baseUrl}/login`, data);
    return response.data;
};

export const register = async (data: RegisterRequestProps) => {
    const response = await axios.post(`${baseUrl}/register`, data);
    console.log(response.data);
    return response.data;
}

export const logout = async () => {

};
