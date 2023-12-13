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
                    <CardItems image="/birthday/1/Front/Front.png" name="Happy Birthday" category="birthday"/>
                    <CardItems image="/birthday/2/Front/Front.png" name="Happy Birthday (1)" category="birthday"/>
                </>
            ) : category == "thanksyou" ? (
                <>
                    <CardItems image="/thanksyou/1/Front/Front.png" name="Thank You" category="thankyou"/>
                    <CardItems image="/thanksyou/2/Front/Front.png" name="Thank You (1)" category="thankyou"/>
                </>
            ) : (
                <>
                    <CardItems image="/birthday/1/Front/Front.png" name="Happy Birthday" category="birthday"/>
                    <CardItems image="/birthday/2/Front/Front.png" name="Happy Birthday (1)" category="birthday"/>
                    <CardItems image="/thanksyou/1/Front/Front.png" name="Thank You" category="thankyou"/>
                    <CardItems image="/thanksyou/2/Front/Front.png" name="Thank You (1)" category="thankyou"/>
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
`;
