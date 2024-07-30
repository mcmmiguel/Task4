import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blockUser, deleteUser, getAllUsers, unlockUser } from '../api/usersAPI';
import { calculateDaysDifference } from '../utils';
import { useAuth } from '../hooks/useAuth';
import { useUserActions } from '../hooks/useUserActions';
import { User } from '../types';

const UsersView = () => {

    const { userData, isLoading: authLoading } = useAuth();
    const [fetchedUsersList, setFetchedUsersList] = useState<User[]>([]);

    const navigate = useNavigate()

    const [selectedUsers, setSelectedUsers] = useState<User['id'][]>([]);
    const [, setIsLoading] = useState(false);
    const { isFetching, processUsers } = useUserActions();

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const data = await getAllUsers();
                if (data) setFetchedUsersList(data);
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
            setSelectedUsers(fetchedUsersList.map(user => user.id));
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

    const handleBlockUser = () => {
        processUsers('Are you sure you want to block this user(s)?', selectedUsers, blockUser);
    }
    const handleUnlockUser = () => {
        processUsers('Are you sure you want to unlock this user(s)?', selectedUsers, unlockUser);
    }
    const handleDeleteUser = () => {
        processUsers('Are you sure you want to delete this user(s)?', selectedUsers, deleteUser);
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
                    <button
                        type='button'
                        className='btn btn-outline-primary d-flex align-items-center'
                        onClick={handleLogout}
                        style={{ gap: 5 }}
                    >
                        Logout
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                        </svg>
                    </button>
                </div>
            </div>

            <hr />

            <div className="d-flex" style={{ gap: 20 }}>
                <button className="btn btn-outline-warning d-flex align-items-center" onClick={handleBlockUser} style={{ gap: 5 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-slash" viewBox="0 0 16 16">
                        <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>
                    Block
                </button>
                <button className="btn btn-outline-success d-flex align-items-center" onClick={handleUnlockUser} style={{ gap: 5 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-unlock-fill" viewBox="0 0 16 16">
                        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2" />
                    </svg>
                    Unlock
                </button>
                <button className="btn btn-danger d-flex align-items-center" onClick={handleDeleteUser} style={{ gap: 5 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                    Delete
                </button>
            </div>

            <main className='table-responsive'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>
                                <input
                                    className='mx-5 my-2'
                                    type="checkbox"
                                    id='masterCheckbox'
                                    onChange={handleSelectAll}
                                    checked={fetchedUsersList.length === selectedUsers.length}
                                />
                            </td>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col" className='text-center'>Last login</th>
                            <th scope="col" className='text-center'>Time since register</th>
                            <th scope="col" className='text-center'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedUsersList.map(user => (
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
                                <td >{user.email}</td>
                                <td className='text-center'>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '-'}</td>
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