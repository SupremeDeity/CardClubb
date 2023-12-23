/* eslint-disable react/prop-types */
import styled from "styled-components";
import ProductContext from "../contexts/productcontext";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Preview = () => {
    const {
        envelopeImage,
        content,
        fontSize,
        fontFamily,
        color,
        envelopeOpenImage,
    } = React.useContext(ProductContext);
    const { state } = useLocation();
    const navigate = useNavigate();
    const { category, index } = state;
    const [isRotated, setIsRotated] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState(false);
    const handleClosePreview = () => {
        navigate(`/card/${category}/design/send`, {
            state: { category, index },
        });
    };
    const handleOpenClick = () => {
        setIsRotated(!isRotated);
        setTimeout(() => {
            setOpen(true);
        }, 1000);
        setTimeout(() => {
            setText(true);
        }, 2000);
    };
    return (
        <PreviewDiv>
            <Button onClick={handleClosePreview}>Close Preview</Button>
            <OpenEnvelope>
                <div
                    style={{ color: "#282828", paddingBottom: "5rem" }}
                    onClick={handleOpenClick}
                >
                    Click here to open the envelope
                </div>
                <div
                    className="envelope"
                    style={{
                        transform: isRotated ? "rotateY(-180deg)" : "none",
                        transition: "transform 5s ease",
                        position:"relative",
                    }}
                >
                    <Image
                        src={`/${state.category}/${state.index}/Image/image.png`}
                    ></Image>
                    <CardImage
                        src={envelopeImage}
                        alt="Uploaded"
                    ></CardImage>
                </div>
                {open && (
                    <Envelope>
                        <Image
                            src={`/${state.category}/${state.index}/Envolpe/envolpe.png`}
                        ></Image>
                        <CardOpenImage
                            src={envelopeOpenImage}
                            alt="Uploaded"
                        ></CardOpenImage>
                        <CardInvertedOpenImage
                            src={envelopeOpenImage}
                            alt="Uploaded"
                        ></CardInvertedOpenImage>
                    </Envelope>
                )}
                {text && (
                    <Text>
                        <Image
                            src={`/${category}/${index}/Custom/custom.jpg`}
                        ></Image>
                        <TextDiv
                            style={{
                                fontSize: `${fontSize}px`,
                                color: color,
                                fontFamily: fontFamily,
                            }}
                        >
                            {content}
                        </TextDiv>
                    </Text>
                )}
            </OpenEnvelope>
        </PreviewDiv>
    );
};

export default Preview;

const PreviewDiv = styled.div`
    min-height: 60vh;
    padding: 30px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`;
const Button = styled.button`
    cursor: pointer;
    color: #fff;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 10px;
    background: #af4b2f;
    width: 20%;
    @media (max-width: 650px) {
        width: 40%;
    }
`;

const OpenEnvelope = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;
const Image = styled.img`
    width: 100%;
    height: 400px;
`;

const CardImage = styled.img`
    position: absolute;
    top: 6%;
    right: 5.5%;
    width: 80px;
    height: 80px;
    transform: rotateX("180deg");
`;

const Envelope = styled.div`
    z-index: 10;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    animation: fadeInAnimation ease 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    @keyframes fadeInAnimation {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
    & > img {
        height: 100%;
        margin-top: 30px;
    }
`;

const Text = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    height: 100%;
    transform: translate(-20%, 10%);
    & > img {
        height: 90%;
    }
    animation: fadeInAnimation ease 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    @keyframes fadeInAnimation {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
    z-index: 15;
`;
const TextDiv = styled.div`
    outline: none;
    background: 0 0 !important;
    border: none !important;
    overflow: visible;
    text-align: center;
    padding: 20px;
    position: absolute;
    width: 100%;
    height: max-content;
    top: 40%;
    left: 50%;
    word-wrap: break-word;
    transform: translate(-50%, -50%);
`;
const CardOpenImage = styled.img`
    object-fit: fill;
    position: absolute;
    top: 45px;
    left: 6px;
    width: 550px !important;
    height: 144px !important;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;
const CardInvertedOpenImage = styled.img`
    object-fit: fill;
    position: absolute;
    top: 188px;
    left: 6px;
    width: 550px !important;
    height: 179px !important;
    clip-path: polygon(-12% 0%, 114% 0%, 50% 101%);
`;
