/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import InsideFontStyle from "./Insidefontstyle";
import ProductContext from "../contexts/productcontext";

const Inside = (props) => {
    const [edit,setEdit]=React.useState(false);
    const {content}=React.useContext(ProductContext)
    const { category, index } = props;
    const handleEditClick =()=>{
        setEdit(true)
    }
    return (
        <Canvas>
            {!edit?(
                <>
                <Image src={`/${category}/${index}/Custom/custom.jpg`}></Image>
                <EditLabel onClick={handleEditClick}><span>Edit</span></EditLabel>
                <TextDiv>{content}</TextDiv>
                </>
            ):(
                <InsideFontStyle edit={setEdit} category={category} index={index}/>
            )}
        </Canvas>
    );
};

export default Inside;


const Canvas = styled.div`
    margin-top: 20px;
    position: relative;
    width: 500px;
`;
const Image = styled.img`
    width: 100%;
    height: 600px;
`;

const EditLabel = styled.div`
    cursor:pointer;
    margin-left:-6rem;
    color: white;
    position: absolute;
    top: 40%;
    bottom: 50%;
    transform: translate(-50%,-50%);
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
    &>span{
        transform: scale(1) rotate(-135deg);
        width:100;
    }

`
const TextDiv =styled.div`
    padding: 12rem 20px 20px 20px;
    outline:none;
    background: 0 0!important;
    border: none!important;
    overflow: visible;
    text-align: center;
    padding: 20px;
    position: absolute;
    height: 40%;
    width: 60%;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%)
`