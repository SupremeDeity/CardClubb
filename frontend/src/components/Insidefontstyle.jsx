/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import ProductContext from "../contexts/productcontext";
import "../fonts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
const slides = [
    { id: 1, content: "Stylish" },
    { id: 2, content: "Broetown" },
    { id: 4, content: "Elegant" },
    { id: 5, content: "Avenus" },
    { id: 6, content: "Ballerina" },
    { id: 7, content: "Beatrix" },
    { id: 8, content: "CandyQelling" },
    { id: 9, content: "DaltonWhite" },
    { id: 10, content: "Manthoels" },
];
const InsideFontStyle = (props) => {
    const {
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        setContent,
        color,
        setColor,
    } = React.useContext(ProductContext);

    const handleFontSizeChange = (e) => {
        const size = parseInt(e.target.value);
        setFontSize(size);
    };

    const handleResetClick = () => {
        setFontSize(16);
        setColor("#282828");
    };

    const handleSaveClick = () => {
        props.edit(false);
    };

    const handleColorClick = (e) => {
        return setColor(e.target.style["background-color"]);
    };
    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleFamilyClick = (e) => {
        setFontFamily(e.target.innerText);
    };
    const scrollableRef = React.useRef(null);

    const handleScrollLeft = () => {
        scrollableRef.current.scrollTo({
          left: scrollableRef.current.scrollLeft - 200,
          behavior: 'smooth',
        });
      };
    
      const handleScrollRight = () => {
        scrollableRef.current.scrollTo({
          left: scrollableRef.current.scrollLeft + 200,
          behavior: 'smooth',
        });
      };
    return (
        <>
            <StyleDiv>
                <Buttons>
                    <Button onClick={handleResetClick}>Reset</Button>
                    <Button onClick={handleSaveClick}>Save</Button>
                </Buttons>
                <SliderContainer ref={scrollableRef}>
                    {slides.map((slide) => (
                        <Slide
                            key={slide.id}
                            onClick={handleFamilyClick}
                        >
                            {slide.content}
                        </Slide>
                    ))}
                    <LeftButton onClick={handleScrollLeft}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            size={"lg"}
                            style={{ color: "#282828" }}
                        />
                    </LeftButton>
                    <RightButton onClick={handleScrollRight}>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            size={"lg"}
                            style={{ color: "#282828" }}
                        />
                    </RightButton>
                </SliderContainer>
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
    padding: 20px;
    outline: none;
    background: 0 0 !important;
    border: none !important;
    overflow: visible;
    position: absolute;
    height: 40%;
    width: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const StyleDiv = styled.div`
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.3);
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

const FontSize = styled.input`
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid #fdc674;
    padding: 0 10px;
    width: 80%;
    height: 40px;
`;
const ColorsDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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


const Image = styled.img`
    width: 100%;
    height: 600px;
`;


const SliderContainer = styled.div`
    height: 70px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    gap: 20px;
    align-items: center;
    div:first-child{
        margin-left: 50px;
    };
    padding-right: 3rem;
`;


const Slide = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 2px solid #fdc674;
    border-radius: 8px;
    width:max-content;
    padding: 10px 20px;
    height: 40px;
    transition: transform 0.5s ease-in-out;

`;

const SliderButton = styled.button`
    text-align: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-80%);
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    @media (max-width:750px) {
        top: 40%;
    }
`;

const LeftButton = styled(SliderButton)`
    background-color: #fdc674;
    left: 10px;
`;

const RightButton = styled(SliderButton)`
    background-color: #fdc674;
    right: 10px;
`;
