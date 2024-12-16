import axios from 'axios';
import { LoginRequestProps } from '@/types/user';
const baseUrl = 'api/auth';

export const login = async (data: LoginRequestProps) => {
    const response = await axios.post(`${baseUrl}/login`, data);
    console.log(data);
    return response.data;
};

export const logout = async () => {

};
