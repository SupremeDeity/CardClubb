/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import ProductContext from "../contexts/productcontext";
import Compressor from "compressorjs";

const ImageUpload = (props) => {
    const { category, index, imageUpload, envelope } = props;
    const {
        envelopeImage,
        setEnvelopeImage,
        envelopeOpenImage,
        setEnvelopeOpenImage,
        logoImage,
        setLogoImage,
    } = React.useContext(ProductContext);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        new Compressor(file, {
            quality: 0.8,
            maxWidth: 600, 
            maxHeight: 600,
            mimeType: "image/jpeg",
            success: (compressedResult) => {
                const reader = new FileReader();
                reader.onload = () => {
                    setEnvelopeImage(reader.result);
                };
                reader.readAsDataURL(compressedResult);
            },
        });
    };
    const handleOpenImageUpload = (e) => {
        const file = e.target.files[0];
        new Compressor(file, {
            quality: 0.8,
            maxWidth: 800, 
            maxHeight: 800,
            mimeType: "image/jpeg",
            success: (compressedResult) => {
                const reader = new FileReader();
                reader.onload = () => {
                    setEnvelopeOpenImage(reader.result);
                };
                reader.readAsDataURL(compressedResult);
            },
        });
    };
    const handleLogoImageUpload = (e) => {
        const file = e.target.files[0];

        new Compressor(file, {
            quality: 0.6,
            maxWidth: 400, 
            maxHeight: 400,
            mimeType: "image/jpeg", 
            success: (compressedResult) => {
                const reader = new FileReader();
                reader.onload = () => {
                    setLogoImage(reader.result);
                };
                reader.readAsDataURL(compressedResult);
            },
        });
    };
    return (
        <Canvas>
            <LogoImageDiv>
                <label htmlFor="uploadLogo">Add Logo Image</label>
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleLogoImageUpload}
                    id="uploadLogo"
                />
            </LogoImageDiv>
            <Image
                src={
                    index
                        ? `/${category}/${index}/Image/image.png`
                        : `data:image/png;base64,${imageUpload}`
                }
            ></Image>
            {envelopeImage && (
                <CardImage src={envelopeImage} alt="Uploaded"></CardImage>
            )}
            {logoImage && <Logo src={logoImage} alt="Uploaded"></Logo>}
            <EnvelopeUploadImage
                src={
                    index
                        ? `/${category}/${index}/Envolpe/envolpe.png`
                        : `data:image/png;base64,${envelope}`
                }
            ></EnvelopeUploadImage>
            <EnvelopeOpenImage>
                <label htmlFor="uploadOpen">Change Envelope Liner</label>
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleOpenImageUpload}
                    id="uploadOpen"
                />
            </EnvelopeOpenImage>
            {envelopeOpenImage && (
                <>
                    <CardOpenImage
                        src={envelopeOpenImage}
                        alt="Uploaded"
                    ></CardOpenImage>
                    <CardInvertedOpenImage
                        src={envelopeOpenImage}
                        alt="Uploaded"
                    ></CardInvertedOpenImage>
                </>
            )}
            <UploadImage>
                <label htmlFor="upload">Upload</label>
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageUpload}
                    id="upload"
                />
            </UploadImage>
        </Canvas>
    );
};

export default ImageUpload;
const LogoImageDiv = styled.div`
    z-index: 1000;
    position: absolute;
    top: 20%;
    left:-19%;
    cursor: pointer;
    width: 100px;
    height: 100px;
    text-align: center;
    background-color: rgba(40, 40, 40, 0.9);
    box-shadow: 0 0 10px 3px hsla(0, 0%, 100%, 0.5);
    border-radius: 15px 85px 85px;
    transform: rotate(135deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > label {
        font-size: 1rem;
        width: 100%;
        outline: none;
        border: none;
        color: white;
        transform: rotate(-135deg);
    }
    & > input {
        position: absolute;
        width: 100%;
        height: 10px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
        transform: rotate(-135deg);
    }
    @media (max-width: 700px) {
        transform: rotate(45deg);
        top: 40%;
        left: 5%;
        &>label , &>input{
            transform: rotate(-45deg);
        }
    }
`;
const Canvas = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 300px;
    padding: 1rem;
    position: relative;
    width: 580px;
    @media (max-width: 800px) {
        width: 500px;
    }
`;
const Image = styled.img`
    margin-top: 4rem;
    height: 380px;
    z-index: 100;
    @media (max-width: 800px) {
        width: 100%;
    }
    @media (max-width: 500px) {
        height: 400px;
    }
`;
const EnvelopeUploadImage = styled.img`
    width: 90%;
    position: absolute;
    top: -210px;
    left: 30px;
    z-index: -2;
    height: 500px;
`;
const UploadImage = styled.div`
    z-index: 1000;
    position: absolute;
    top: 90px;
    right: 28%;
    width: 100px;
    height: 100px;
    text-align: center;
    background-color: rgba(40, 40, 40, 0.9);
    box-shadow: 0 0 10px 3px hsla(0, 0%, 100%, 0.5);
    border-radius: 15px 85px 85px;
    transform: rotate(135deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > label {
        font-size: 1rem;
        width: 100%;
        outline: none;
        border: none;
        transform: rotate(-135deg);
        color: white;
    }
    & > input {
        position: absolute;
        width: 100%;
        height: 10px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
        transform: rotate(-135deg);
    }
`;

const CardImage = styled.img`
    z-index: 111;
    position: absolute;
    top: 106px;
    left: 78.3%;
    width: 12%;
    height: 14.8%;
    @media (max-width: 500px) {
        top: 99px;
        left: 78.5%;
        width: 12%;
        height: 15%;
    }
`;
const Logo = styled.img`
    z-index: 111;
    position: absolute;
    border: 4px solid white;
    border-radius: 20px;
    top: 100px;
    left: 8%;
    width: 40%;
    height: 13%;
`;

const EnvelopeOpenImage = styled(UploadImage)`
    top: -210px;
    left: 35px;
    transform: rotate(225deg);
    & > label {
        transform: rotate(-225deg);
    }
    & > input {
        transform: rotate(-225deg);
    }
`;
const CardOpenImage = styled.img`
    object-fit: fill;
    position: absolute;
    top: -166px;
    left: 38px;
    width: 87%;
    height: 144px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;
const CardInvertedOpenImage = styled.img`
    z-index: -2;
    object-fit: fill;
    position: absolute;
    top: -23px;
    left: 33px;
    width: 89%;
    height: 191px;
    clip-path: polygon(-10% 0%, 117% 0%, 47% 101%);
`;
