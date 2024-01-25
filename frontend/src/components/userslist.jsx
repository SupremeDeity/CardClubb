/* eslint-disable react/prop-types */
import styled from "styled-components"

const UsersList = (props) => {
    const user=props.user
  return (
    <>
        <tr>
            {user.name && (<TableData>{user.name}</TableData>)}
            <TableData>{user.email}</TableData>
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
