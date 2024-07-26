import api from "../lib/axios";
import { RegisterForm } from "../views/RegisterView";

export async function registerAccount(formData: RegisterForm) {
    try {
        const url = '/auth/register';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        console.log(error);
    }
}