/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styled from "styled-components";
import CardItems from "./carditems";
import React from "react";
import CardDetails from "../components/carddetails";

const ProductCart = (props) => {
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/card/get"
                );
                if (response.ok) {
                    const data = await response.json();
                    const cards = [];
                    data.data.forEach((element) => {
                        if (element.category == props.category)
                            cards.push(element);
                    });
                    setCards(cards);
                } else {
                    console.error("Failed to fetch cards");
                }
            } catch (error) {
                console.error("Error fetching cards:", error.message);
            }
        };

        fetchCards();
    }, []);
    const { category } = props;
    return (
        <Card>
            {category == "Happy Birthday" ? (
                <>
                    <CardItems
                        index="1"
                        image="/birthday/1/Front/Front.png"
                        name="Happy Birthday"
                        category="birthday"
                    />
                    <CardItems
                        index="2"
                        image="/birthday/2/Front/Front.png"
                        name="Happy Birthday (1)"
                        category="birthday"
                    />
                </>
            ) : <></>}
            {category == "Thank You" ? (
                <>
                    <CardItems
                        index="1"
                        image="/thanksyou/1/Front/Front.png"
                        name="Thank You"
                        category="thanksyou"
                    />
                    <CardItems
                        index="2"
                        image="/thanksyou/2/Front/Front.png"
                        name="Thank You (1)"
                        category="thanksyou"
                    />
                </>
            ) : <></>}
            {cards &&
                cards.map((card) => {
                    return <CardDetails card={card} />;
                })}
        </Card>
    );
};

export default ProductCart;

const Card = styled.div`
    margin-left: 20px;
    min-height: 60vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 3rem;
    @media (max-width: 770px) {
        justify-content: center;
    }
`;
