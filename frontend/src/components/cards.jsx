/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styled from "styled-components";
import CardList from "./cardlist";
import React from "react";
import UpdateCard from "./updatecard";

const Cards = ({ cards, onCardDelete }) => {
  const [edit, setEdit] = React.useState(false);
  const [selectedCard,setSelectedCard] = React.useState(null)
  const handleEdit = () => {
    setEdit((pre) => !pre);
  };
  return (
    <>
      <UsersTable>
        <table>
          <tr>
            <TableHeading>Name</TableHeading>
            <TableHeading>Category</TableHeading>
            <TableHeading>Actions</TableHeading>
          </tr>
          {cards && cards.length === 0 ? (
            <>No Card Found!</>
          ) : (
            cards.map((card) => {
              return (
                <CardList
                  card={card}
                  onDelete={onCardDelete}
                  onEdit={handleEdit}
                  setSelectedCard={setSelectedCard}
                />
              );
            })
          )}
        </table>
      </UsersTable>
      {!!edit && (
        <>
          <UpdateCard card={selectedCard}/>
        </>
      )}
    </>
  );
};

export default Cards;

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

const TableHeading = styled.th`
  border: 2px solid #fdc674;
  padding: 10px;
  text-align: left;
  color: #282828;
  font-weight: 700;
`;
