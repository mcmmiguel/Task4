import { isAxiosError } from "axios";
import api from "../lib/axios";
import { LoginForm } from "../views/LoginView";
import { RegisterForm } from "../views/RegisterView";

export async function registerAccount(formData: RegisterForm) {
    try {
        const url = '/auth/register';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function authenticateUser(formData: LoginForm) {
    try {
        const url = '/auth/login';
        const { data } = await api.post(url, formData);
        if (data.token) localStorage.setItem('AUTH_TOKEN', data.token);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
