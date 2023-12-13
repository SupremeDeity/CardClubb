/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardItems = (props) => {
    const { image, name, category } = props;
    const navigate = useNavigate();
    function handleClick(){
        navigate(`/card/${category}`,{state:{category,name}})
    }
    return (
        <CardItem onClick={handleClick}>
            <CardImage src={image} alt="Product Image"></CardImage>
            <Name>{name}</Name>
            <Button>Customize</Button>
        </CardItem>
    );
};

export default CardItems;

const CardItem = styled.div`
    margin: 1.5rem 0px;
    padding: 10px;
    width: 350px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 25px;
`;
const CardImage = styled.img`
    width: 100%;
    height: 300px;
`;
const Name = styled.div`
    color: #282828;
    font-size: 2rem;
    font-weight: 700;
`;

const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 12px;
    width: 150px;
`;
