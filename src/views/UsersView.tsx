import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { blockUser, deleteUser, getAllUsers, unlockUser } from '../api/usersAPI';
import { calculateDaysDifference } from '../utils';
import { useNavigate } from 'react-router-dom';

export type User = {
    id: number;
    name: string;
    email: string;
    lastLogin?: string;
    createdAt: string;
    isBlocked: boolean;
}

const UsersView = () => {

    const { userData, isLoading: authLoading } = useAuth();
    const [usersList, setUsersList] = useState<User[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const [selectedUsers, setSelectedUsers] = useState<User['id'][]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const data = await getAllUsers();
                if (data) setUsersList(data);
            } catch (error) {
                if (!userData) navigate('/auth/login');
            } finally {
                setIsLoading(false);
            }
        }

        if (userData) fetchUsers();
    }, [userData, isFetching, navigate]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedUsers(usersList.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId: User['id']) => {
        setSelectedUsers(prevSelectedUsers => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter(id => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const processUsers = async (userIds: User['id'][], action: (userId: User['id']) => Promise<string>) => {

        if (userIds.length === 0) return;

        setIsFetching(true);

        try {
            await Promise.all(userIds.map(async userId => {
                await action(userId);
            }));
        } catch (error) {
            console.log('Error processing users:', error);
        } finally {
            setIsFetching(false);
        }
    }

    const handleBlockUser = async () => {
        if (confirm('Are you sure to block this user(s)?')) {
            processUsers(selectedUsers, blockUser);
        }

    }

    const handleUnlockUser = async () => {
        if (confirm('Are you sure to unlock this user(s)?')) {
            processUsers(selectedUsers, unlockUser);
        }

    }

    const handleDeleteUser = async () => {
        if (confirm('Are you sure to delete this user(s)?')) {
            processUsers(selectedUsers, deleteUser);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        navigate('/auth/login');
    }

    if (authLoading) return 'Loading...';

    if (userData) return (
        <div className='container' style={{ marginTop: 20 }}>
            <div className='d-flex justify-content-between align-items-center'>
                <h1 className="text-center m-0">Users</h1>
                <div className='d-flex justify-content-between align-items-center' style={{ gap: 30 }}>
                    <p className='m-0'>Welcome, {userData.name}!</p>
                    <button type='button' className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <hr />

            <div className="d-flex" style={{ gap: 20 }}>
                <button className="btn btn-outline-warning" onClick={handleBlockUser}>Block</button>
                <button className="btn btn-outline-success" onClick={handleUnlockUser}>Unlock</button>
                <button className="btn btn-danger" onClick={handleDeleteUser}>Delete</button>
            </div>

            <main>
                <table className="table">
                    <thead>
                        <tr>
                            <td>
                                <input
                                    className='mx-5 my-2'
                                    type="checkbox"
                                    id='masterCheckbox'
                                    onChange={handleSelectAll}
                                    checked={usersList.length === selectedUsers.length}
                                />
                            </td>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Last login</th>
                            <th scope="col">Time since register</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map(user => (
                            <tr className='table-row' key={user.id}>
                                <td>
                                    <input
                                        className='mx-5 my-2'
                                        type="checkbox"
                                        name={user.id.toString()}
                                        id={user.id.toString()}
                                        onChange={() => handleSelectUser(user.id)}
                                        checked={selectedUsers.includes(user.id)}
                                    />
                                </td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '-'}</td>
                                <td className='text-center'>{calculateDaysDifference(user.createdAt)}</td>
                                <td className={`text-center rounded ${user.isBlocked ? 'text-danger  ' : 'text-success'}`}>{user.isBlocked ? 'Blocked' : 'Active'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}
export default UsersView