import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const SendCard = () => {
    const { state } = useLocation();
    const { category, index } = state;
    const navigate = useNavigate();
    const emailSchema = object({
        name: string().min(1, { message: "Required" }),
        email: string().email(),
    });
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(emailSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/send-email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
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
            state: { category, index },
        });
    };
    return (
        <>
            <NavBar />
            <MainSection>
                <Info>
                    <Image
                        src={`/${state.category}/${state.index}/Front/Front.png`}
                    ></Image>
                    <PreviewButton onClick={handlePreview}>
                        Preview
                    </PreviewButton>
                </Info>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Label>Send Your Card</Label>
                    <Input
                        type="text"
                        placeholder="Enter Name"
                        {...register("name")}
                        required
                    ></Input>
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        {...register("email")}
                        required
                    ></Input>
                    <Button type="submit">Send Card</Button>
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
