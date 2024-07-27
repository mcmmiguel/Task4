import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getAllUsers } from '../api/usersAPI';
import { calculateDaysDifference } from '../utils';

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
    const [, setIsLoading] = useState(false);

    const [selectedUsers, setSelectedUsers] = useState<User['id'][]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const data = await getAllUsers();
                if (data) setUsersList(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        if (userData) fetchUsers();
    }, [userData]);

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


    if (authLoading) return 'Loading...';

    if (userData) return (
        <div className='container' style={{ marginTop: 20 }}>
            <div className='d-flex justify-content-between align-items-center'>
                <h1 className="text-center m-0">Users</h1>
                <div className='d-flex justify-content-between align-items-center' style={{ gap: 30 }}>
                    <p className='m-0'>Welcome, {userData.name}!</p>
                    <button type='button' className='btn btn-outline-danger'>Logout</button>
                </div>
            </div>

            <hr />

            <div className="d-flex" style={{ gap: 20 }}>
                <button className="btn btn-outline-warning">Block</button>
                <button className="btn btn-outline-success">Unlock</button>
                <button className="btn btn-danger">Delete</button>
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
                                <td className='text-center'>{`${calculateDaysDifference(user.createdAt)}d`}</td>
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