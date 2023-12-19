/* eslint-disable react/prop-types */
import styled from "styled-components"
import ProductContext from "../contexts/productcontext"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Preview = () => {
    const {envelopeImage}=React.useContext(ProductContext)
    const { state } = useLocation();
    const navigate = useNavigate();
    const {category,index}=state;
    const handleClosePreview=()=>{
        navigate(`/card/${category}/design/send`,{state:{category,index}})
    }
  return (
    <PreviewDiv>
        <Button onClick={handleClosePreview}>Close Preview</Button>
        <OpenEnvelope>
            <div style={{color:"#282828"}}>Click here to open the envelope</div>
            <Image
                src={`/${state.category}/${state.index}/Image/image.png`}
            ></Image>
            <CardImage
                    src={envelopeImage}
                    alt="Uploaded"
            ></CardImage>
        </OpenEnvelope>
    </PreviewDiv>
  )
}

export default Preview

const PreviewDiv = styled.div`
    min-height: 60vh;
    padding: 30px 10px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`
const Button = styled.button`
    cursor: pointer;
    color: #fff;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 10px;
    background: #af4b2f;
    width: 20%;
`;

const OpenEnvelope=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 400px;
`;

const CardImage = styled.img`
    margin: 4.65rem 2rem 0 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;

`