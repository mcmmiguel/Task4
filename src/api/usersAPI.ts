import { isAxiosError } from "axios";
import api from "../lib/axios";
import { User } from "../types";

export async function getAllUsers() {
    try {
        const url = '/users/'
        const { data } = await api.get<User[]>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function unlockUser(userId: User['id']) {
    try {
        const url = `/users/unlock-user/${userId}`
        const { data } = await api.patch<User['isBlocked']>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function blockUser(userId: User['id']) {
    try {
        const url = `/users/block-user/${userId}`
        const { data } = await api.patch<User['isBlocked']>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteUser(userId: User['id']) {
    try {
        const url = `/users/${userId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}