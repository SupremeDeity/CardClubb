/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import InsideFontStyle from "./Insidefontstyle";
import ProductContext from "../contexts/productcontext";

const Inside = (props) => {
    const [edit, setEdit] = React.useState(false);
    const { fontSize, fontFamily, color, content } =
        React.useContext(ProductContext);
    const { category, index, custom } = props;
    const handleEditClick = () => {
        setEdit(true);
    };
    return (
        <Canvas>
            {!edit ? (
                <ImageDiv>
                    <Image
                        src={
                            index
                                ? `/${category}/${index}/Custom/custom.jpg`
                                : `data:image/png;base64,${custom}`
                        }
                    ></Image>
                    <EditLabel onClick={handleEditClick}>
                        <span>Edit</span>
                    </EditLabel>
                    <TextDiv
                        style={{
                            fontSize: `${fontSize}px`,
                            color: color,
                            fontFamily: fontFamily,
                        }}
                    >
                        {content}
                    </TextDiv>
                </ImageDiv>
            ) : (
                <InsideFontStyle
                    edit={setEdit}
                    category={category}
                    index={index}
                    custom={custom}
                />
            )}
        </Canvas>
    );
};

export default Inside;

const Canvas = styled.div`
    margin-top: 20px;
    position: relative;
    width: 500px;
    @media (max-width: 750px) {
        width: 400px;
    }
    @media (max-width: 650px) {
        width: 350px;
    }
`;
const ImageDiv = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 600px;
    @media (max-width: 750px) {
        width: 80%;
        height: 500px;
    }
`;

const EditLabel = styled.div`
    cursor: pointer;
    margin-left: -123%;
    color: white;
    position: absolute;
    top: 40%;
    bottom: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    text-align: center;
    background-color: rgba(40, 40, 40, 0.9);
    box-shadow: 0 0 10px 3px hsla(0, 0%, 100%, 0.5);
    border-radius: 15px 85px 85px;
    transform: scale(1) rotate(135deg);
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
        transform: scale(1) rotate(-135deg);
        width: 100;
    }
    @media (max-width: 550px) {
        margin-left: -105%;
        width: 70px;
        height: 70px;
    }
`;
const TextDiv = styled.p`
    padding: 12rem 20px 20px 20px;
    outline: none;
    background: 0 0 !important;
    border: none !important;
    overflow: visible;
    text-align: center;
    padding: 20px;
    position: absolute;
    height: max-content;
    width: 60%;
    top: 50%;
    left: 50%;
    word-wrap: break-word;
    transform: translate(-50%, -50%);
`;
