/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import styled from "styled-components";
import UsersList from "./userslist";

const Users = () => {
    const [users, setUsers] = useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/users/get");
                const data = await response.json()
                setUsers(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        };

        fetchUsers();
    }, []);
    return (
        <UsersTable>
            <Title>Users</Title>
            <table>
                <tr>
                    <TableHeading>Name</TableHeading>
                    <TableHeading>User Name</TableHeading>
                    <TableHeading>Email</TableHeading>
                </tr>
            {loading?<></>:(
                users.map((user)=>{
                    return <UsersList user={user}/>
                })
            )}
            </table>
        </UsersTable>
    );
};

export default Users;

const UsersTable = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    align-items: flex-start;
    & > table {
        border-collapse: collapse;
        width: 100%;
    }
    padding: 3rem;
    min-height: 20vh;
`;
const Title = styled.div`
    color: #fdc674;
    font-size: 2rem;
    font-weight: 700;
`;

const TableHeading = styled.th`
    border: 2px solid #fdc674;
    padding: 10px;
    text-align: left;
    color: #282828;
    font-weight: 700;
`;
