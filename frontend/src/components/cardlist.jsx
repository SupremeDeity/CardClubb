/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const CardList = ({ card, onDelete }) => {
    const handleDelete = () => {
        onDelete(card._id);
    };
    return (
        <>
            <tr key={card._id}>
                <TableData>{card.name?card.name:"No Name"}</TableData>
                <TableEmail>
                  <p>{card.category}</p>
                <FontAwesomeIcon
                        icon={faTrashCan}
                        size={"lg"}
                        onClick={handleDelete}
                        style={{cursor:"pointer",color:"#fdc674"}}
                    />
                </TableEmail>

            </tr>
        </>
    );
};

export default CardList;

const TableData = styled.td`
    border: 2px solid #fdc674;
    padding: 10px;
    color: #282828;
    font-weight: 400;
`;
const TableEmail = styled.td`
    border: 1px solid #fdc674;
    padding: 10px;
    color: #282828;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
