/* eslint-disable react/jsx-key */
import styled from "styled-components"
import CardItems from "./carditems";
import Image_1 from "../assets/Happy Birthday/1/Front/Front.png"
import Image_2 from "../assets/Happy Birthday/2/Front/Front.png"
import Image_3 from "../assets/Thanksyou Cards/1/Front/Front.png"
import Image_4 from "../assets/Thanksyou Cards/1/Front/Front.png"

const ProductCart = () => {
  return (
    <Card>
        <CardItems image={Image_1} name="Happy Birthday" />
        <CardItems image={Image_2} name="Happy Birthday (1)" />
        <CardItems image={Image_3} name="Thank You" />
        <CardItems image={Image_4} name="Thank You (1)" />
    </Card>
  )
}

export default ProductCart

const Card = styled.div`
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap:3rem;
`

