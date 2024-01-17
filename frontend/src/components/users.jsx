/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styled from "styled-components";
import UsersList from "./userslist";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Users = ({ users,receivers }) => {
    const downloadUsers = () => {
        const fieldsToInclude = ["firstname", "lastname", "username", "email"];

        const filteredUsers = users.map((user) => {
            const filteredUser = {};
            fieldsToInclude.forEach((field) => {
                filteredUser[field] = user[field];
            });
            return filteredUser;
        });
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(filteredUsers);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        saveAs(blob, "users.xlsx");
    };
    const downloadReceivers = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(receivers);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        saveAs(blob, "receivers.xlsx");
    };
    return (
        <>
            <UsersTable>
                <div className="header">
                    <Title>Users</Title>
                    <Button onClick={downloadUsers} disabled={users.length===0}>Export</Button>
                </div>
                <table>
                    <tr>
                        <TableHeading>Name</TableHeading>
                        <TableHeading>User Name</TableHeading>
                        <TableHeading>Email</TableHeading>
                    </tr>
                    {users && users.length === 0? (
                        <>No User Found!</>
                    ) : (
                        users.map((user) => {
                            return <UsersList user={user} />;
                        })
                    )}
                </table>
            </UsersTable>
            <UsersTable>
                <div className="header">
                    <Title>Receivers Data</Title>
                    <Button onClick={downloadReceivers} disabled={receivers.length===0}>Export</Button>
                </div>
                <table>
                    <tr>
                        <TableHeading>Name</TableHeading>
                        <TableHeading>Email</TableHeading>
                    </tr>
                    {receivers && receivers.length === 0? (
                        <Error>No User Found!</Error>
                    ) : (
                        receivers && receivers.map((user) => {
                            return <UsersList user={user} />;
                        })
                    )}
                </table>
            </UsersTable>
        </>
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
    min-height: 60vh;
    & .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
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
const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 4px;
    width: 200px;
`;

const Error = styled.div`
padding-top: 10px;
color: #000;
font-weight: 600;
`