import { isAxiosError } from "axios";
import api from "../lib/axios";
import { User } from "../views/UsersView";

export async function getAllUsers() {
    try {
        const { data } = await api.get<User[]>('/users');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function unlockUser(userId: User['id']) {
    try {
        const { data } = await api.patch(`/users/unlock-user/${userId}`);
        console.log(data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function blockUser(userId: User['id']) {
    try {
        const { data } = await api.patch(`/users/block-user/${userId}`);
        console.log(data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}