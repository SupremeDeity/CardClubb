import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";

const AddCategory = () => {
    const [status,setStatus]=React.useState("");
    const categorySchema = object({
        category: string().min(1, { message: "Required" }),
    });
    const {
        register,
        handleSubmit,
    } = useForm({ resolver: zodResolver(categorySchema) });
    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                "http://localhost:5000/category/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                setStatus("Successfully Added")
            } else {
                setStatus("Failed to Add")
            }
        } catch (error) {
            setStatus("Failed to Add")
        }
    };
    return (
        <CategoryDiv>
            <Title>Add New Category</Title>
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <Group>
                    {status && <Status>{status}</Status> }
                    <Input
                        type="text"
                        placeholder="Enter New Category Name"
                        {...register('category')}
                    ></Input>
                </Group>
                <Button>Add</Button>
            </Form>
        </CategoryDiv>
    );
};

export default AddCategory;

const CategoryDiv = styled.div`
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
`;
const Form = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
`;
const Title = styled.div`
    color: #fdc674;
    font-size: 2rem;
    font-weight: 700;
`;
const Group = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
`;
const Input = styled.input`
    padding-left: 10px;
    width: 400px;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #ddd;
    background: #fff;
`;
const Status = styled.div`
    color: #282828;
    font-size: 0.8rem;
`;
const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 4px;
    width: 100px;
`;