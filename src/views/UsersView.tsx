import { useEffect, useState } from 'react';
import { users } from '../data/userData';
import { isAxiosError } from 'axios';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';

type User = {
    id: number;
    name: string;
    email: string;
    lastLogin?: string;
    registrationTime?: string;
    isBlocked: boolean;
}

const UsersView = () => {

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
        if (isError) {
            navigate('/auth/login');
        }
    }, [isError, navigate]);

    if (isLoading) return 'Loading...';

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
            <div className="d-flex justify-content-end">
                <section className="w-25 d-flex justify-content-between">
                    <button className="btn btn-warning">Block</button>
                    <button className="btn btn-info">Unlock</button>
                    <button className="btn btn-danger">Delete</button>
                </section>
            </div>

            <main>
                <table className="table">
                    <thead>
                        <tr>
                            <td>
                                <input className='mx-5 my-2' type="checkbox" />
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
                        {users.map(user => (
                            <tr className='table-row' key={user.id}>
                                <td>
                                    <input className='mx-5 my-2' type="checkbox" />
                                </td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '-'}</td>
                                <td>{user.registrationTime ? new Date(user.registrationTime).toLocaleString() : '-'}</td>
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