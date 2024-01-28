import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const loginSchema = object({
        name: string().min(1, { message: "Required" }),
        email: string().email(),
        password: string().min(1, { message: "Required" }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });
    const [isDisabled, setDisabled] = React.useState(false);
    const onSubmit = async (data) => {
        setDisabled(true);
        try {
            const response = await fetch(
                "http://31.220.107.144/api/users/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                toast.success("User Created Successfully", {
                    position: "top-right",
                });
                setDisabled(false);
            } else {
                toast.error("User Already Exists", {
                    position: "top-right",
                });
                setDisabled(false);
            }
        } catch (error) {
            toast.error("Failed to Create User", { position: "top-right" });
            setDisabled(false);
        }
    };
    return (
        <>
            <NavBar />
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <Group>
                    <Label>Name</Label>
                    {errors.name && (
                        <Error>{errors.name.message}</Error>
                    )}
                    <Input
                        type="text"
                        placeholder="Enter Name"
                        {...register("name")}
                    ></Input>
                </Group>
                <Group>
                    <Label>Email</Label>
                    {errors.email && <Error>{errors.email.message}</Error>}
                    <Input
                        type="text"
                        placeholder="Enter Email"
                        {...register("email")}
                    ></Input>
                </Group>
                <Group>
                    <Label>Password</Label>
                    {errors.password && (
                        <Error>{errors.password.message}</Error>
                    )}
                    <Input
                        type="password"
                        placeholder="Enter Password"
                        {...register("password")}
                    ></Input>
                </Group>
                <Group>
                    <Label as={Link} to="/login" style={{ fontSize: ".8rem" }}>
                        Already Have an Account ? Login
                    </Label>
                </Group>
                <Button type="submit" disabled={isDisabled} style={{opacity:isDisabled?".8":"1"}}>
                    Register
                </Button>
            </Form>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default Register;

const Form = styled.form`
    padding: 40px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
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
    height: 40px;
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
