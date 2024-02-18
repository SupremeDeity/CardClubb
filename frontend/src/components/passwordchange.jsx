import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string} from "zod";
import styled from "styled-components";
import React ,{ useContext } from "react";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/usercontext";

const PasswordChange = () => {
    const {user}=useContext(UserContext)
    const [Disabled, setIsDisabled] = React.useState(false);
    const profileSchema = object({
        old: string().min(1, { message: "Required" }),
        updated: string().min(1, { message: "Required" }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(profileSchema) });
    const onSubmit = async (data) => {
        setIsDisabled(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/users/update/password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({'old':data.old,'email':user.email,'updated':data.updated}),
                }
            );
            if (response.ok) {
                toast.success("Update Successfully", { position: 'top-right' });
                setIsDisabled(false)
            } else {
                toast.error("Incorrect Old Password", { position: 'top-right' });
                setIsDisabled(false);
            }
        } catch (error) {
            toast.error("Failed to Update Password", { position: 'top-right' });
            setIsDisabled(false);
        }
    };
    return (
        <>
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <h3>Update Your Password</h3>
                <Group>
                    <Label>Old Password</Label>
                    {errors.old && <Error>{errors.old.message}</Error>}
                    <Input
                        type="password"
                        placeholder="Enter Old Password"
                        {...register("old")}
                    ></Input>
                </Group>
                <Group>
                    <Label>New Password</Label>
                    <Input
                        type="password"
                        placeholder="Enter New Password"
                        {...register("updated")}
                    ></Input>
                </Group>
                <Button type="submit" disabled={Disabled} style={{opacity:Disabled?".8":"1"}} >
                    Update
                </Button>
            </Form>
        </>
    );
};

export default PasswordChange;

const Form = styled.form`
    margin-top: 20px;
    padding: 20px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2rem;
    align-items: center;
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
