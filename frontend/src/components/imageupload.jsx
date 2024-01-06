/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import ProductContext from "../contexts/productcontext";
// import Crop from "./crop";

const ImageUpload = (props) => {
    const { category, index, imageUpload, envelope } = props;
    const {
        envelopeImage,
        setEnvelopeImage,
        envelopeOpenImage,
        setEnvelopeOpenImage,
    } = React.useContext(ProductContext);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setEnvelopeImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };
    const handleOpenImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setEnvelopeOpenImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };
    return (
        <Canvas>
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

const Canvas = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15rem;
    padding: 1rem;
    position: relative;
    width: 550px;
`;
const Image = styled.img`
    margin-top: 4rem;
    width: 90%;
    height: 400px;
    z-index: 100;
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
    right: 162px;
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
    top: 108px;
    left: 76%;
    width: 11%;
    height: 72px;
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
    left: 33px;
    width: 89%;
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
