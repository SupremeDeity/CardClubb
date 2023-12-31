import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";


const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
const Register = () => {
    const loginSchema = object({
        username: string().min(1, { message: "Required" }),
        firstName: string().min(1, { message: "Required" }),
        lastName: string().min(1, { message: "Required" }),
        email: string().email(),
        password: string().refine((value) => passwordRegex.test(value), {
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number, and be at least 8 characters long.",
        }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });

    const [loginErrors,setLoginError] = React.useState("")
    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://cardclub.vercel.app/api/users/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
        
            if (response.ok) {
              setLoginError('User created successfully!');
            } else {
                setLoginError("Failed to Create User")
            }
          } catch (error) {
            setLoginError("Failed to Create User")
          }
    };
    return (
        <>
            <NavBar />
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <Group>
                    {loginErrors?<Error style={{fontSize:"1rem"}}>{loginErrors}</Error>:<></>}
                    <Label>Username</Label>
                    {errors.username && (
                        <Error>{errors.username.message}</Error>
                    )}
                    <Input
                        type="text"
                        placeholder="Enter Username"
                        {...register("username")}
                    ></Input>
                </Group>
                <Group>
                    <Label>First Name</Label>
                    {errors.firstName && (
                        <Error>{errors.firstName.message}</Error>
                    )}
                    <Input
                        type="text"
                        placeholder="Enter First Name"
                        {...register("firstName")}
                    ></Input>
                </Group>
                <Group>
                    <Label>Last Name</Label>
                    {errors.lastName && (
                        <Error>{errors.lastName.message}</Error>
                    )}
                    <Input
                        type="text"
                        placeholder="Enter Last Name"
                        {...register("lastName")}
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
                <Group><Label as={Link} to="/login" style={{fontSize:".8rem"}}>Already Have an Account ? Login</Label></Group>
                <Button type="submit">Register</Button>
            </Form>
            <Footer />
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
    color: #282828;;
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
    @media (max-width:800px){
        width:60%;
    }
`;
