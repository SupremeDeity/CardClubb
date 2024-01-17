import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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
    });
    const [isRotated, setIsRotated] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState(false);
    const handleOpenClick = () => {
        setIsRotated(!isRotated);
        setTimeout(() => {
            setOpen(true);
        }, 1000);
        setTimeout(() => {
            setText(true);
        }, 2000);
    };
    React.useEffect(() => {
        const fetchCards = async (id) => {
            try {
                const response = await fetch(
                    `https://cardclub.vercel.app/api/get/cards/${id}`,
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
                    <PreviewDiv>
                        <OpenEnvelope>
                            <div
                                style={{
                                    color: "#282828",
                                    paddingBottom: "5rem",
                                }}
                                onClick={handleOpenClick}
                            >
                                Click here to open the envelope
                            </div>
                            <div
                                className="envelope"
                                style={{
                                    transform: isRotated
                                        ? "rotateY(-180deg)"
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
                            </div>
                            {open && (
                                <Envelope>
                                    <Image
                                        src={`${parameters.envelope.mime_type},${parameters.envelope.content}`}
                                    ></Image>
                                    <CardOpenImage
                                        src={`${parameters.envelopeOpenImage.mime_type},${parameters.envelopeOpenImage.content}`}
                                        alt="Uploaded"
                                    ></CardOpenImage>
                                    <CardInvertedOpenImage
                                        src={`${parameters.envelopeOpenImage.mime_type},${parameters.envelopeOpenImage.content}`}
                                        alt="Uploaded"
                                    ></CardInvertedOpenImage>
                                </Envelope>
                            )}
                            {text && (
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
