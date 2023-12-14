/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const ImageUpload = (props) => {
    const { category, index } = props;
    const [uploadImage, setUploadImage] = React.useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setUploadImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };
    console.log(uploadImage);
    return (
        <Canvas>
            <Image
                src={`/${category}/${index}/Image Upload/Image Upload.png`}
            ></Image>
            {uploadImage==null ? (
                <UploadImage>
                    <label htmlFor="upload">Upload File</label>
                    <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageUpload} id="upload"/>
                </UploadImage>
            ) : (
                <CardImage
                    src={uploadImage}
                    alt="Uploaded"
                ></CardImage>
            )}
        </Canvas>
    );
};

export default ImageUpload;

const Canvas = styled.div`
    margin-top: 3rem;
    position: relative;
    width: 550px;
`;
const Image = styled.img`
    width: 100%;
    height: 400px;
`;

const UploadImage = styled.div`
    margin: -5rem 15px 0 0;
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

`