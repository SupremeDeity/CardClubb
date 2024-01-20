/* eslint-disable react/jsx-key */
import React from "react";
import styled from "styled-components";
import { useForm,useController } from "react-hook-form";
import CategoriesOptions from "./categoriesoptions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
    const [isDisabled, setDisabled] = React.useState(false);
    const { register, handleSubmit,control } = useForm();
    const { field } = useController({
        name: 'category',
        control,
        defaultValue: 'Happy Birthday',
      });
    const [categories, setCategories] = React.useState([
        "Happy Birthday",
        "Thank You",
    ]);
    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "https://cardclub.vercel.app/category/get"
                );
                const data = await response.json();
                const categories = data.data;
                const newData = [];
                categories.forEach((element) => {
                    newData.push(element.category);
                });
                setCategories(() => {
                    return ["Happy Birthday", "Thank You", ...newData];
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);
    const onSubmit = async (data) => {
        setDisabled(true)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('front', data.front[0]);
        formData.append('image', data.image[0]);
        formData.append('envelope', data.envelope[0]);
        formData.append('custom', data.custom[0]);
        try {
            const response = await fetch("https://cardclub.vercel.app/api/card/add", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("Successfully add Category", { position: 'top-right' });
                setDisabled(false)
            } else {
                toast.error("Failed to Add Card", { position: 'top-right' });
                setDisabled(false)
            }
        } catch (error) {
            toast.error("Failed to Add Card", { position: 'top-right' });
            setDisabled(false)
        }
    };
    return (
        <CategoryDiv>
            <Title>Add New Card</Title>
            <Form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <Group>
                    <Label>Enter Name of Card</Label>
                    <Input
                        type="text"
                        placeholder="Enter Card Name"
                        {...register("name")}
                    ></Input>
                </Group>
                <Group>
                    <Label>Select Category</Label>
                    <select name="category" {...field} style={{width:"400px",height:"40px"}}>
                        {categories &&
                            categories.map((item) => {
                                return <CategoriesOptions item={item} />;
                            })}
                    </select>
                </Group>
                <Group>
                    <Label>Choose Front side of Card</Label>
                    <InputFile type="file" {...register("front")}></InputFile>
                </Group>
                <Group>
                    <Label>Choose Image Upload Side</Label>
                    <InputFile type="file" {...register('image')}></InputFile>
                </Group>
                <Group>
                    <Label>Choose Envelope</Label>
                    <InputFile type="file" {...register('envelope')}></InputFile>
                </Group>
                <Group>
                    <Label>Choose Custom</Label>
                    <InputFile type="file" {...register('custom')}></InputFile>
                </Group>
                <Button type="submit" disabled={isDisabled} style={{opacity:isDisabled?".8":"1"}}>Add Card</Button>
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
    flex-direction: column;
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

const InputFile = styled.input`
    padding: 10px 0;
    width: 400px;
    border-radius: 2px;
    border: 1px solid #ddd;
    background: #fff;
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
const Label = styled.label`
    color: #282828;
    font-size: 1rem;
`;
