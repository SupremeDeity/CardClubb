import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import styled from "styled-components";
import React from "react";
import UserContext from "../contexts/usercontext";
import { Link } from "react-router-dom";

const Login = () => {
    const { user,setLocalStorageUser,localStorageUser,setUser } = React.useContext(UserContext);
    const [loginErrors,setLoginError] = React.useState("")
    const loginSchema = object({
        email: string().email(),
        password: string().min(1, { message: "Required" }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });
    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/users/auth",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setUser({isLogin:true,username:data.name,email:data.email})
                localStorage.setItem('user', JSON.stringify(data));
                setLocalStorageUser(data)
                console.log(localStorageUser);
            } else {
                setLoginError("Invalid Credentials")
            }
        } catch (error) {
            setLoginError("Failed to Login")
        }
    };
    return (
        <>
            <NavBar />
            {user.isLogin ? (
                <Form>
                    <div style={{fontSize:"2rem"}}>Already Login</div>
                </Form>
            ) : (
                <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                    <Group>
                        {loginErrors?<Error style={{fontSize:"1rem"}}>{loginErrors}</Error>:<></>}
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
                    <Group><Label as={Link} to="/register" style={{fontSize:".8rem"}}>Don&apos;t Have an Account ? Sign up</Label></Group>
                    <Button type="submit">Login</Button>
                </Form>
            )}
            <Footer />
        </>
    );
};

export default Login;

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
