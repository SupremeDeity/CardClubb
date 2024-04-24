/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const CardList = ({ card, onDelete, onEdit, setSelectedCard }) => {
  const handleDelete = () => {
    onDelete(card._id);
  };
  const handleEdit = ()=>{
    setSelectedCard(card)
    onEdit(pre=>!pre)
  }
  return (
    <>
      <tr key={card._id}>
        <TableData>{card.name ? card.name : "No Name"}</TableData>
        <TableEmail>
          <p>{card.category}</p>
        </TableEmail>
        <Action>
          <Div>
            <Button onClick={handleEdit}>Edit</Button>
            <FontAwesomeIcon
              icon={faTrashCan}
              size={"lg"}
              onClick={handleDelete}
              style={{ cursor: "pointer", color: "#fdc674" }}
            />
          </Div>
        </Action>
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
  border: 2px solid #fdc674;
  padding: 10px;
  color: #282828;
  font-weight: 400;
`;

const Action = styled.td`
  border: 2px solid #fdc674;
  padding: 10px;
  color: #282828;
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  cursor: pointer;
  color: #282828;
  background: #fdc674;
  font-size: 1rem;
  height: 30px;
  border: none;
  border-radius: 8px;
  width: 70px;
`;
