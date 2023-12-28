import React, { useContext } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, } from "react-router-dom";
import ImageUpload from "./imageupload";
import Inside from "./Inside";
import UserContext from "../contexts/usercontext";

const Customization = () => {
    const { state } = useLocation();
    const { category, index, front, image, envelope, custom } = state;
    const [imageTab, setImage] = React.useState("Front");
    const navigate = useNavigate();
    const {user}=useContext(UserContext)

    const labelClick = (e) => {
        const Front = document.getElementById("Front")
        const inside = document.getElementById("Inside")
        const Envelope = document.getElementById("Envelope")
        if(e.target.innerText=="Front"){
            Front.classList.add("active")
            inside.classList.remove("active")
            Envelope.classList.remove("active")
        }
        else if(e.target.innerText=="Inside"){
            inside.classList.add("active")
            Front.classList.remove("active")
            Envelope.classList.remove("active")
        }
        else if(e.target.innerText=="Envelope"){
            Envelope.classList.add("active")
            Front.classList.remove("active")
            inside.classList.remove("active")
        }
        return setImage(e.target.innerText);
    };
    const handleSaveClick = () => {
        const Front = document.getElementById("Front")
        const inside = document.getElementById("Inside")
        const Envelope = document.getElementById("Envelope")

        if (imageTab == "Front") {
            setImage("Inside");
            inside.classList.add("active")
            Front.classList.remove("active")
            Envelope.classList.remove("active")
        } else if (imageTab == "Inside") {
            Envelope.classList.add("active")
            Front.classList.remove("active")
            inside.classList.remove("active")
            setImage("Envelope");
        }else {
            if(user.isLogin)
                navigate(`/card/${category}/design/send`,{state:{category,index, front, image, envelope, custom}})
            else   
                navigate('/login')
        }
    };
    return (
        <CustomContainer>
            <ImageNav>
                <Label onClick={labelClick} id="Front" className="active">Front</Label>
                <Label onClick={labelClick} id="Inside">Inside</Label>
                <Label onClick={labelClick} id="Envelope">Envelope</Label>
                <Button onClick={handleSaveClick}>Save</Button>
            </ImageNav>

            {imageTab == "Front" ? (
                <ImageContainer>
                    <Image
                        src={index?`/${category}/${index}/Front/Front.png`:`data:image/png;base64,${front}`}
                    ></Image>
                </ImageContainer>
            ) : imageTab == "Inside" ? (
                <ImageContainer>
                    <Inside category={category} index={index} custom={custom}/>
                </ImageContainer>
            ) : (
                <ImageUploadContainer>
                    <ImageUpload category={category} index={index} imageUpload={image} envelope={envelope}/>
                </ImageUploadContainer>
            )}
        </CustomContainer>
    );
};

export default Customization;

const CustomContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ImageNav = styled.div`
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.3);
    @media (max-width: 650px) {
        padding: 1px 10px;
        gap: 10px;
    }
`;

const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 12px;
    width: 150px;
`;

const Label = styled.div`
    cursor: pointer;
    color: #282828;
    font-size: 1.25rem;
    font-weight: 500;
    height: 40px;
    width: 110px;
    display: flex;
    justify-content:center;
    align-items: center;
    &.active{
        color:#fdc674;
    }
`;

const Image = styled.img`
    width: 450px;
    height: 500px;
`;

const ImageContainer = styled.div`
    padding: 30px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 750px) {
        width: 60%;
    }
    @media (max-width: 550px) {
        width: 50%;
    }
`;

const ImageUploadContainer = styled.div`
    padding: 30px 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
