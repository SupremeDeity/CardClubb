import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import styled from "styled-components";
const Login = () => {
    const loginSchema = object({
        username: string().min(1, { message: "Required" }),
        password: string().min(1, { message: "Required" }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <NavBar />
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <Group>
                    <Label>Username or Email</Label>
                    {errors.username && (
                        <Error>{errors.username.message}</Error>
                    )}
                    <Input
                        type="text"
                        placeholder="Enter username or email"
                        {...register("username")}
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
                <Button type="submit">Login</Button>
            </Form>
            <Footer />
        </>
    );
};

export default Login;

const Form = styled.form`
    width: 100%;
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;
    align-items: center;
`;
const Error = styled.div`
    color: red;
    font-size: 0.75rem;
`;
const Input = styled.input`
    padding-left: 10px;
    width:100%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #DDD;
    background: #FFF;
`;
const Label = styled.label`
    color: #282828;;
    font-size: 1rem;
`;

const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #FDC674;
    font-size: 1rem;
    height: 50px;
    border:none;
    border-radius: 4px;
    width:200px
`;
const Group = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap:10px;
    @media (max-width:800px){
        width:60%;
    }
`;
