import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ImageUpload from "./imageupload";

const Customization = () => {
    const { state } = useLocation();
    const { category, index } = state;
    const [image, setImage] = React.useState("Front");
    const labelClick = (e) => {
        return setImage(e.target.innerText);
    };
    return (
        <>
            <ImageNav>
                <Label onClick={labelClick}>Front</Label>
                <Label onClick={labelClick}>Inside</Label>
                <Label onClick={labelClick}>Envelope</Label>
                <Button>Save</Button>
            </ImageNav>
            <ImageContainer>
                {image == "Front" ? (
                    <Image
                        src={`/${category}/${index}/Front/Front.png`}
                    ></Image>
                ) : image == "Inside" ? (
                    <Image src={`/${category}/${index}/Middel Custom Text artwork/Text Edit Middle.jpg`}></Image>
                ) : (
                    <ImageUpload category={category} index={index}/>
                )}
            </ImageContainer>
        </>
    );
};

export default Customization;

const ImageNav = styled.div`
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
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

const Label = styled.div`
    cursor: pointer;
    color: #282828;
    font-size: 1.25rem;
    font-weight: 500;
`;

const Image = styled.img`
    width: 450px;
    height: 500px;
`;

const ImageContainer = styled.div`
    padding: 30px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
