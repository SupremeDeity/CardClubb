/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import ProductContext from "../contexts/productcontext";

const ImageUpload = (props) => {
    const { category, index } = props;
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
            <Image src={`/${category}/${index}/Image/image.png`}></Image>
            <EnvelopeUploadImage
                src={`/${category}/${index}/Envolpe/envolpe.png`}
            ></EnvelopeUploadImage>
            {envelopeOpenImage == null ? (
                <EnvelopeOpenImage>
                    <label htmlFor="uploadOpen">Change Envelope Liner</label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleOpenImageUpload}
                        id="uploadOpen"
                    />
                </EnvelopeOpenImage>
            ) : (
                <>
                <CardOpenImage src={envelopeOpenImage} alt="Uploaded"></CardOpenImage>
                <CardInvertedOpenImage src={envelopeOpenImage} alt="Uploaded"></CardInvertedOpenImage>
                </>
            )}
            {envelopeImage == null ? (
                <UploadImage>
                    <label htmlFor="upload">Upload File</label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageUpload}
                        id="upload"
                    />
                </UploadImage>
            ) : (
                <CardImage src={envelopeImage} alt="Uploaded"></CardImage>
            )}
        </Canvas>
    );
};

export default ImageUpload;

const Canvas = styled.div`
    margin-top: 15rem;
    position: relative;
    width: 550px;
`;
const Image = styled.img`
    width: 100%;
    height: 400px;
    z-index: 100;
`;
const EnvelopeUploadImage = styled(Image)`
    position: absolute;
    top: -210px;
    left: -200px;
    z-index: -2;
    height: 500px;
`;
const UploadImage = styled.div`
    margin: -4.5rem 15px 0 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    text-align: center;
    background-color: rgba(40, 40, 40, 0.9);
    box-shadow: 0 0 10px 3px hsla(0, 0%, 100%, 0.5);
    border-radius: 15px 85px 85px;
    transform: rotate(230deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > label {
        font-size: 1rem;
        width: 100%;
        outline: none;
        border: none;
        transform: rotate(-230deg);
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
        transform: rotate(-230deg);
    }
`;

const CardImage = styled.img`
    margin: 25px 30px 0 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
`;

const EnvelopeOpenImage = styled(UploadImage)`
    top: 10px;
    left: -280px;
    transform: rotate(135deg);
    & > label {
        transform: rotate(-135deg);
    }
    & > input {
        transform: rotate(-135deg);
    }
`
const CardOpenImage = styled.img`
    object-fit: fill;
    position: absolute;
    top: -167px;
    left: -196px;
    width: 541px;
    height: 144px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`
const CardInvertedOpenImage = styled.img`
    z-index: -2;
    object-fit: fill;
    position: absolute;
    top: -24px;
    left: -194px;
    width: 538px;
    height: 191px;
    clip-path: polygon(-10% 0%, 117% 0%, 47% 101%);
`