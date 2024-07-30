import { User } from "../types";
import { calculateDaysDifference } from "../utils";

type UsersTableProps = {
    fetchedUsersList: User[];
    selectedUsers: User['id'][];
    setSelectedUsers: React.Dispatch<React.SetStateAction<User['id'][]>>;
}

const UsersTable = ({ fetchedUsersList, selectedUsers, setSelectedUsers }: UsersTableProps) => {

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
    return (
        <div className='table-responsive'>
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
        </div>
    )
}
export default UsersTable




