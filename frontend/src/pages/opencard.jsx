import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NavBarPrimary from "../components/navbarprimary";


const OpenCard = () => {
    const [loadingPage, setLoadingPage] = React.useState(true);
    const { id } = useParams();
    const [parameters, setParameters] = React.useState({
        color: "",
        family: "",
        size: 16,
        text: "",
        front: "",
        image: "",
        custom: "",
        envelope: "",
        envelopeImage: "",
        envelopeOpenImage: "",
        logo:null,
    });
    const [isRotated, setIsRotated] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpenClick = () => {
        setIsRotated(!isRotated);
        setTimeout(() => {
            setOpen(true);
        }, 2000);
    };
    React.useEffect(() => {
        const fetchCards = async (id) => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/get/cards/${id}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    const {
                        color,
                        family,
                        size,
                        text,
                        front,
                        image,
                        custom,
                        envelope,
                        stamp,
                        envelopeOpen,
                        logo,
                    } = result;
                    setParameters({
                        color,
                        family,
                        size,
                        text,
                        front,
                        image,
                        custom,
                        envelope,
                        envelopeImage:stamp,
                        envelopeOpenImage:envelopeOpen,
                        logo,
                    });
                    
                    setLoadingPage(false);
                } else {
                    console.error("Failed to send email.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchCards(id);
    }, [id]);
    
    return (
        <>
            {loadingPage ? (
                <>
                    <Ring>
                        Loading
                        <span></span>
                    </Ring>
                </>
            ) : (
                <>
                    <NavBarPrimary />
                    <PreviewDiv>
                        <OpenEnvelope>
                            <OpenButton
                                onClick={handleOpenClick}
                            >
                                Click here to open the envelope
                            </OpenButton>
                            <div
                                className="envelope"
                                style={{
                                    transform: isRotated
                                        ? "translateX(-40%)"
                                        : "none",
                                    transition: "transform 5s ease",
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src={`${parameters.image.mime_type},${parameters.image.content}`}
                                ></Image>
                                <CardImage
                                    src={`${parameters.envelopeImage.mime_type},${parameters.envelopeImage.content}`}
                                    alt="Uploaded"
                                ></CardImage>
                                {parameters.logo && <Logo src={`${parameters.logo.mime_type},${parameters.logo.content}`} alt="logo"></Logo>}
                            </div>
                            {open && (
                                <Text>
                                    <Image
                                        src={`${parameters.custom.mime_type},${parameters.custom.content}`}
                                    ></Image>
                                    <TextDiv
                                        style={{
                                            fontSize: `${parameters.size}px`,
                                            color: parameters.color,
                                            fontFamily: parameters.family,
                                        }}
                                    >
                                        {parameters.text}
                                    </TextDiv>
                                </Text>
                            )}
                        </OpenEnvelope>
                    </PreviewDiv>
                </>
            )}
        </>
    );
};

export default OpenCard;
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
const Ring = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: transparent;
    text-align: center;
    line-height: 150px;
    font-family: sans-serif;
    font-size: 20px;
    color: #fdc674;
    letter-spacing: 4px;
    text-transform: uppercase;
    &:before {
        content: "";
        position: absolute;
        top: -3px;
        left: -3px;
        width: 100%;
        height: 100%;
        border: 3px solid transparent;
        border-top: 3px solid #fdc674;
        border-right: 3px solid #fdc674;
        border-radius: 50%;
        animation: animateC 2s linear infinite;
    }
    & > span {
        display: block;
        position: absolute;
        top: calc(50% - 2px);
        left: 50%;
        width: 50%;
        height: 4px;
        background: transparent;
        transform-origin: left;
        animation: animate 2s linear infinite;
    }
    @keyframes animateC {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes animate {
        0% {
            transform: rotate(45deg);
        }
        100% {
            transform: rotate(405deg);
        }
    }
`;

const PreviewDiv = styled.div`
    min-height: 60vh;
    padding: 30px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
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
z-index: 111;
    position: absolute;
    top: 147px;
    left: 30.5%;
    width: 38%;
    height: 53%;
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

