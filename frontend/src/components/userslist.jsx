/* eslint-disable react/prop-types */
import styled from "styled-components"

const UsersList = (props) => {
    const {username,firstname,lastname,email}=props.user
  return (
    <>
        <tr>
            <TableData>{firstname} {lastname}</TableData>
            <TableData>{username}</TableData>
            <TableData>{email}</TableData>
        </tr>
    </>
  )
}

export default UsersList
const TableData = styled.td`
    border: 2px solid #fdc674;
    padding: 10px;
    color: #282828;
    font-weight: 400;
`;
