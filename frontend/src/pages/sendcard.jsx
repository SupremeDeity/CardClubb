import styled from "styled-components";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { useContext } from "react";
import ProductContext from "../contexts/productcontext";
import { useForm } from "react-hook-form";

const SendCard = () => {
    const { state } = useLocation();
    const { category, index, front, image, envelope, custom } = state;
    // const { envelopeImage } = useContext(ProductContext);
    const navigate = useNavigate();
    // var frontImage = "";
    // if (index) {
    //     frontImage = `${category}/${index}/Front/Front.png`;
    // } else {
    //     frontImage = `data:image/png;base64,${front}`;
    // }
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('front', data.front[0]);
        formData.append('envelope', data.envelope[0]);
        
        try {
            const response = await fetch(   
                "http://localhost:5000/api/send-email-card",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                console.log("Email sent successfully!");
            } else {
                console.error("Failed to send email.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handlePreview = () => {
        navigate(`/card/${category}/design/preview`, {
            state: { category, index, front, image, envelope, custom },
        });
    };
    return (
        <>
            <NavBar />
            <MainSection>
                <Info>
                    <Image
                        src={
                            index
                                ? `/${category}/${index}/Front/Front.png`
                                : `data:image/png;base64,${front}`
                        }
                    ></Image>
                    <PreviewButton onClick={handlePreview}>
                        Preview
                    </PreviewButton>
                </Info>
                <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                    <Label>Send Your Card</Label>
                    <Input
                        type="text"
                        {...register("name")}
                        placeholder="Enter Name"
                    ></Input>
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        {...register("email")}
                    ></Input>
                    <input type="file" {...register("front")} />
                    <input type="file" {...register("envelope")} />
                    <Button type="submit">
                        Send Card
                    </Button>
                </Form>
            </MainSection>
            <Footer />
        </>
    );
};

export default SendCard;

const Form = styled.form`
    height: 100%;
    width: 50%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    @media (max-width: 850px) {
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`;

const Input = styled.input`
    padding-left: 10px;
    width: 70%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #69727d;
    background: #fff;
    @media (max-width: 850px) {
        width: 60%;
    }
`;

const Button = styled.button`
    cursor: pointer;
    color: #fff;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 10px;
    background: #af4b2f;
    width: 70%;
    @media (max-width: 850px) {
        width: 40%;
    }
`;

const MainSection = styled.div`
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    min-height: 60vh;
    @media (max-width: 850px) {
        align-items: center;
        width: 100%;
        flex-direction: column;
    }
`;
const Info = styled.div`
    height: 100%;
    width: 50%;
    color: #000000;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    @media (max-width: 850px) {
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`;

const Label = styled.div`
    color: #000;
    font-size: 3rem;
    @media (max-width: 850px) {
        font-size: 2rem;
    }
`;

const Image = styled.img`
    width: 40%;
    height: 40%;
    @media (max-width: 850px) {
        width: 60%;
        height: 60%;
    }
`;

const PreviewButton = styled.button`
    cursor: pointer;
    color: #fff;
    font-size: 1rem;
    height: 50px;
    border: none;
    border-radius: 10px;
    background: #af4b2f;
    width: 40%;
`;
