/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styled from "styled-components";
import CardList from "./cardlist";

const Cards = ({ cards,onCardDelete,}) => {

    return (
        <>
            <UsersTable>
                <table>
                    <tr>
                        <TableHeading>Name</TableHeading>
                        <TableHeading>Category</TableHeading>
                    </tr>
                    {cards && cards.length === 0? (
                        <>No User Found!</>
                    ) : (
                        cards.map((card) => {
                            return <CardList card={card} onDelete={onCardDelete}/>;
                        })
                    )}
                </table>
            </UsersTable>
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
