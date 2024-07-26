import { users } from '../data/userData';

const UsersView = () => {

    return (
        <>
            <div>
                <h1 className="text-center my-10">Users</h1>
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
        </>
    )
}
export default UsersView