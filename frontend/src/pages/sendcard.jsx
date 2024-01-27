import styled from "styled-components";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { useContext } from "react";
import ProductContext from "../contexts/productcontext";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/usercontext";


const SendCard = () => {
    const { state } = useLocation();
    const { category, index, front, image, envelope, custom } = state;
    const { user } =
    React.useContext(UserContext);
    const [isDisabled,setDisabled]=React.useState(false);
    const [Images, setImages] = React.useState({
        frontImage: "",
        customImage: "",
        stampUpload: "",
        envelopeImages: "",
    });
    const {
        envelopeImage,
        content,
        fontSize,
        fontFamily,
        color,
        envelopeOpenImage,
    } = useContext(ProductContext);
    const navigate = useNavigate();
    const fetchAndConvert = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            };
        });
    };
    const { register, handleSubmit } = useForm();
    React.useEffect(()=>{
        const setImagesForBackend = async ()=>{
            let frontImage, customImage, stampUpload, envelopeUploadImage;
            if (index) {
                [frontImage, customImage, stampUpload, envelopeUploadImage] =
                    await Promise.all([
                        fetchAndConvert(`/${category}/${index}/Front/Front.png`),
                        fetchAndConvert(`/${category}/${index}/Custom/custom.jpg`),
                        fetchAndConvert(`/${category}/${index}/Image/image.png`),
                        fetchAndConvert(
                            `/${category}/${index}/Envolpe/envolpe.png`
                        ),
                    ]);
            } else {
                frontImage = `data:image/png;base64,${front}`;
                customImage = `data:image/png;base64,${custom}`;
                stampUpload = `data:image/png;base64,${image}`;
                envelopeUploadImage = `data:image/png;base64,${envelope}`;
            }
            setImages({
                frontImage,
                customImage,
                stampUpload,
                envelopeImages:envelopeUploadImage,
            });
        }
        setImagesForBackend()
    },[])
    
    const onSubmit = async (data) => {
        setDisabled(true)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("receiveremail", data.email);
        formData.append("senderemail", user.email);
        formData.append("content", content);
        formData.append("size", fontSize);
        formData.append("family", fontFamily);
        formData.append("color", color);
        formData.append("front", Images.frontImage);
        formData.append("custom", Images.customImage);
        formData.append("image", Images.stampUpload);
        formData.append("envelope", Images.envelopeImages);
        formData.append("stamp", envelopeImage);
        formData.append("envelopeOpen", envelopeOpenImage);
        
        try {
            const response = await fetch(
                "https://www.cardclubb.com/api/send-email-card",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                toast.success("Email Sent Successfully", { position: 'top-right' });
                setDisabled(false)
            } else {
                toast.error("Failed to Send Email", { position: 'top-right' });
                setDisabled(false)
            }
        } catch (error) {
            toast.error("Failed to Send Email", { position: 'top-right' });
            setDisabled(false)
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
                        required
                        placeholder="Enter Name"
                    ></Input>
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        required
                        {...register("email")}
                    ></Input>
                    <Button type="submit" disabled={isDisabled} style={{opacity:isDisabled?".8":"1"}}>Send Card</Button>
                </Form>
            </MainSection>
            <Footer />
            <ToastContainer />
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
