import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import styled from "styled-components";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/usercontext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Updateprofile = () => {
    const navigate = useNavigate();
    const { user, setUser, setLocalStorageUser } = useContext(UserContext);
    const [isDisabled, setDisabled] = React.useState(false);
    const profileSchema = object({
        name: string(),
        email: string(),
    });
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(profileSchema),
    });
    const onSubmit = async (data) => {
        if (data.email || data.name) {
            setDisabled(true);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/users/update/profile`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: data.name,
                            previous: user.email,
                            updated: data.email,
                        }),
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        isAdmin: false,
                        isLogin: true,
                        name: data.name,
                        email: data.email,
                    });
                    Cookies.set("user", JSON.stringify(data), {
                        expires: 1 / 24,
                    });
                    setLocalStorageUser(data);
                    setDisabled(false);
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                } else {
                    toast.error("New Email Already Exists", {
                        position: "top-right",
                    });
                    setDisabled(false);
                }
            } catch (error) {
                toast.error("Failed to update", { position: "top-right" });
                setDisabled(false);
            }
        }
    };
    return (
        <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
            <h3>Update Your Profile</h3>
            <Group>
                <Label>Name </Label>
                <Input
                    type="text"
                    placeholder="Enter Name"
                    {...register("name")}
                ></Input>
            </Group>
            <Group>
                <Label>Email </Label>
                <Input
                    type="text"
                    placeholder="Enter Email"
                    {...register("email")}
                ></Input>
            </Group>
            <Button
                type="submit"
                disabled={isDisabled}
                style={{ opacity: isDisabled ? ".8" : "1" }}
            >
                Save
            </Button>
        </Form>
    );
};

export default Updateprofile;

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
