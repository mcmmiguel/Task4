import { useState } from "react";
import { User } from "../types";

export const useUserActions = () => {

    const [isFetching, setIsFetching] = useState(false);

    const processUsers = async (message: string, userIds: User['id'][], action: (userId: User['id']) => Promise<boolean | string | undefined>) => {
        if (confirm(message)) {
            if (userIds.length === 0) return;

            setIsFetching(true);

            try {
                await Promise.all(userIds.map(userId => action(userId)));
            } catch (error) {
                console.log('Error processing users:', error);
            } finally {
                setIsFetching(false);
            }
        }
    }

    return {
        isFetching,
        processUsers,
    }
}