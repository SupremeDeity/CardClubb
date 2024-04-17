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
        logoImage,
    } = React.useContext(ProductContext);
    const { state } = useLocation();
    const navigate = useNavigate();
    const { category, index, front, image, envelope, custom } = state;
    const [isRotated, setIsRotated] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClosePreview = () => {
        navigate(`/card/${category}/design/send`, {
            state: { category, index, front, image, envelope, custom },
        });
    };
    const handleOpenClick = () => {
        setIsRotated(!isRotated);
        setTimeout(() => {
            setOpen(true);
        }, 2000);
    };
    return (
        <PreviewDiv>
            <Button onClick={handleClosePreview}>Close Preview</Button>
            <OpenEnvelope>
                <OpenButton
                    onClick={handleOpenClick}
                >
                    Click here to open the envelope
                </OpenButton>
                <div
                    className="envelope"
                    style={{
                        transform: isRotated ? "translateX(-40%)" : "none",
                        transition: "transform 5s ease",
                        position: "relative",
                    }}
                >
                    <Image
                        src={
                            index
                                ? `/${category}/${index}/Image/image.png`
                                : `data:image/png;base64,${image}`
                        }
                    ></Image>
                    <CardImage src={envelopeImage} alt="Uploaded"></CardImage>
                    {logoImage && <Logo src={logoImage}></Logo>}
                </div>
                {open && (
                    <Text>
                        <Image
                            src={
                                index
                                    ? `/${category}/${index}/Custom/custom.jpg`
                                    : `data:image/png;base64,${custom}`
                            }
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
const OpenButton = styled.button`
    margin-bottom: 5rem;
    cursor: pointer;
    color: white;
    padding: 15px;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    background: #af4b2f;
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
const Logo = styled.img`
    position: absolute;
    top: 6%;
    left: 5.5%;
    width: 40%;
    height: 18%;
    border: 4px solid white;
    border-radius: 20px;
    transform: rotateX("180deg");
`;
const Text = styled.div`
    position: absolute;
    top: 20px;
    left:75%;
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
            opacity: 0.7;
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

