/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styled from "styled-components";
import CardItems from "./carditems";

const ProductCart = (props) => {
    const { category } = props;
    return (
        <Card>
            {category == "birthday" ? (
                <>
                    <CardItems index="1" image="/birthday/1/Front/Front.png" name="Happy Birthday" category="birthday"/>
                    <CardItems index="2" image="/birthday/2/Front/Front.png" name="Happy Birthday (1)" category="birthday"/>
                </>
            ) : category == "thanksyou" ? (
                <>
                    <CardItems index="1" image="/thanksyou/1/Front/Front.png" name="Thank You" category="thanksyou"/>
                    <CardItems index="2" image="/thanksyou/2/Front/Front.png" name="Thank You (1)" category="thanksyou"/>
                </>
            ) : (
                <>
                    <CardItems index="1" image="/birthday/1/Front/Front.png" name="Happy Birthday" category="birthday"/>
                    <CardItems index="2" image="/birthday/2/Front/Front.png" name="Happy Birthday (1)" category="birthday"/>
                    <CardItems index="1" image="/thanksyou/1/Front/Front.png" name="Thank You" category="thanksyou"/>
                    <CardItems index="2" image="/thanksyou/2/Front/Front.png" name="Thank You (1)" category="thanksyou"/>
                </>
            )}
        </Card>
    );
};

export default ProductCart;

const Card = styled.div`
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 3rem;
    @media (max-width:770px){
        justify-content: center;
    }
`;
