/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import ProductContext from "../contexts/productcontext";

const InsideFontStyle = (props) => {
    const {fontSize,setFontSize,fontFamily,setFontFamily,setContent,color,setColor}=React.useContext(ProductContext)

    const handleFontSizeChange = (e) => {
        const size = parseInt(e.target.value);
        setFontSize(size);
    };

    const handleResetClick = () => {
        setContent("")
        setFontSize(16)
        setColor("#282828")
    };

    const handleSaveClick = () => {
        props.edit(false)
    };

    const handleColorClick = (e) => {
        return setColor(e.target.style["background-color"]);
    };
    const handleChange = (e) => {
        return setContent(e.target.value);
    };

    const handleFamilyClick = (e) => {
        setFontFamily(e.target.innerText);
    };
    return (
        <>
            <StyleDiv>
                <Buttons>
                    <Button onClick={handleResetClick}>Reset</Button>
                    <Button onClick={handleSaveClick}>Save</Button>
                </Buttons>
                <FontFamilyDiv>
                    <Icons>{"<"}</Icons>
                    <FontStyles onClick={handleFamilyClick}>Arial</FontStyles>
                    <FontStyles onClick={handleFamilyClick}>Inter</FontStyles>
                    <Icons>{">"}</Icons>
                </FontFamilyDiv>
                <FontSize
                    type="number"
                    placeholder="Enter Font Size"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                ></FontSize>
                <ColorsDiv>
                    <ColorsCircle
                        style={{ backgroundColor: "#065c06" }}
                        onClick={handleColorClick}
                    ></ColorsCircle>
                    <ColorsCircle
                        style={{ backgroundColor: "#375a49" }}
                        onClick={handleColorClick}
                    ></ColorsCircle>
                    <ColorsCircle
                        style={{ backgroundColor: "#a21207" }}
                        onClick={handleColorClick}
                    ></ColorsCircle>
                    <ColorsCircle
                        style={{ backgroundColor: "#a3ce3a" }}
                        onClick={handleColorClick}
                    ></ColorsCircle>
                    <ColorsCircle
                        style={{ backgroundColor: "#a4b33b" }}
                        onClick={handleColorClick}
                    ></ColorsCircle>
                    <ColorsCircle
                        style={{ backgroundColor: "#ef8381" }}
                        onClick={handleColorClick}
                    ></ColorsCircle>
                    <ColorsCircle
                        style={{ backgroundColor: "#e9533c" }}
                        onClick={handleColorClick}
                    ></ColorsCircle>
                    <ColorsCircle
                        style={{ backgroundColor: "#375a49" }}
                        onClick={handleColorClick}
                    ></ColorsCircle>
                </ColorsDiv>
            </StyleDiv>
            <ImageContainer>
                <Image
                    src={`/${props.category}/${props.index}/Custom/custom.jpg`}
                ></Image>
                <TextArea
                    name="message"
                    id=""
                    onChange={handleChange}
                    style={{
                        fontSize: `${fontSize}px`,
                        color: color,
                        fontFamily: fontFamily,
                    }}
                ></TextArea>
            </ImageContainer>
        </>
    );
};

export default InsideFontStyle;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
`;
const TextArea = styled.textarea`
    resize: none; /* Disable textarea resizing */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer */
    &::-webkit-scrollbar {
        width: 0;
    }
    font-size: 20px;
    padding: 12rem 20px 20px 3rem;
    outline: none;
    background: 0 0 !important;
    border: none !important;
    overflow: visible;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
`;
const StyleDiv = styled.div`
    box-shadow: 0 5px 5px -5px rgba(0,0,0,.3);
    margin-bottom: 20px;
    /* position: absolute;
    top: 0;
    left: 0; */
    padding: 10px 10px 20px 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: transform 0.5s ease-out;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.3);
    transform: translate(0);
`;
const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #fdc674;
`;
const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    border: none;
    border-radius: 12px;
    padding: 15px 40px;
`;

const FontFamilyDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;
const FontSize = styled.input`
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid #fdc674;
    padding-left: 10px;
    width: 80%;
    height: 40px;
`;
const ColorsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;
const ColorsCircle = styled.div`
    width: 38px;
    height: 38px;
    background: #007bb6;
    border-radius: 38px;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        box-shadow: 0 0 8px -1px #138d97;
    }
`;
const FontStyles = styled.div`
    cursor: pointer;
    border: 2px solid #fdc674;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 40px;
`;

const Image = styled.img`
    width: 100%;
    height: 600px;
`;

const Icons = styled(FontStyles)`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;