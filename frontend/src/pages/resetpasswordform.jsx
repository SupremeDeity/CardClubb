import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import styled from "styled-components";
import React from "react";
import { useNavigate, useParams, } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [isDisabled, setDisabled] = React.useState(false);
    const { token } = useParams();
    const loginSchema = object({
        password: string().min(1, { message: "Required" }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });
    const onSubmit = async (data) => {
        console.log(data);
        setDisabled(true);
        try {
            const response = await fetch(
                `http://localhost:5000/api/users/reset/password/${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                toast.success("Password Reset Successfully", { position: 'top-right' });
                navigate('/login')
                setDisabled(false)
            } else {
                toast.error("Invalid or Expire Token", { position: 'top-right' });
                setDisabled(false);
            }
        } catch (error) {
            toast.error("Failed to Process Request", { position: 'top-right' });
            setDisabled(false);
        }
    };
    return (
        <>
            <NavBar />
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <h3>Update Your Password</h3>
                <Group>
                    <Label>Enter Your New Password</Label>
                    {errors.password && <Error>{errors.password.message}</Error>}
                    <Input
                        type="password"
                        placeholder="Enter Password"
                        {...register("password")}
                    ></Input>
                </Group>
                <Button type="submit" disabled={isDisabled} style={{opacity:isDisabled?".8":"1"}} >
                    Submit
                </Button>
            </Form>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default ResetPasswordForm;

const Form = styled.form`
    padding: 20px 0px;
    width: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    align-items: center;
    @media (max-width: 800px) {
        min-height: 50vh;
    }
`;
const Error = styled.div`
    color: red;
    font-size: 0.75rem;
`;
const Input = styled.input`
    padding-left: 10px;
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #ddd;
    background: #fff;
`;
const Label = styled.label`
    color: #282828;
    font-size: 1rem;
`;

const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    height: 50px;
    border: none;
    border-radius: 4px;
    width: 200px;
`;
const Group = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    @media (max-width: 800px) {
        width: 60%;
    }
`;
