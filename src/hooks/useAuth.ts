import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {

    const [userData, setUserData] = useState<User | null>(null);
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const getUser = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get('/auth/user');
            setUserData(data);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                setIsError(error.response.data.error);
                setUserData(null);
                throw new Error(error.response.data.error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (isError) navigate('/auth/login');
    }, [isError, navigate])

    return {
        userData,
        isLoading,
        isError,
    }
}