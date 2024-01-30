import NavBar from "../components/navbar";
import Footer from "../components/footer";
import Users from "../components/users";
import React from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
    const [loadingPage, setLoadingPage] = React.useState(true);
    const [users, setUsers] = React.useState(null);
    const [receivers,setReceivers] = React.useState(null)
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/users/get`
                );
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log(error);
            }
            try {
                const receivers = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/get/receivers`
                );
                const data = await receivers.json();
                setReceivers(data.data);
                setLoadingPage(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);
    const handleUserDelete = async (userId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/users/delete/user`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ id: userId }),
                }
            );
             if(response.ok)
                toast.success("User deleted Successfully", {
                    position: "top-right",
                });
        } catch (error) {
            toast.error("User can't deleted", {
                position: "top-right",
            });
        }finally{
            navigate(0);
        }
      };
    const handleReceiverDelete = async (userId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/users/delete/receiver`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ id: userId }),
                }
            );
            if(response.ok)
                toast.success("User deleted Successfully", {
                    position: "top-right",
                });
        } catch (error) {
            toast.error("User can't deleted", {
                position: "top-right",
            });
        }
        finally{
            navigate(0);
        }
      };
    return (
        <>
            {loadingPage ? (
                <Ring>
                    Loading
                    <span></span>
                </Ring>
            ) : (
                <>
                    <NavBar />
                    <Users users={users} receivers={receivers} onUserDelete={handleUserDelete} onReceiverDelete={handleReceiverDelete}/>
                    <Footer />
                    <ToastContainer />
                </>
            )}
        </>
    );
};

export default UsersPage;
const Ring = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: transparent;
    text-align: center;
    line-height: 150px;
    font-family: sans-serif;
    font-size: 20px;
    color: #fdc674;
    letter-spacing: 4px;
    text-transform: uppercase;
    &:before {
        content: "";
        position: absolute;
        top: -3px;
        left: -3px;
        width: 100%;
        height: 100%;
        border: 3px solid transparent;
        border-top: 3px solid #fdc674;
        border-right: 3px solid #fdc674;
        border-radius: 50%;
        animation: animateC 2s linear infinite;
    }
    & > span {
        display: block;
        position: absolute;
        top: calc(50% - 2px);
        left: 50%;
        width: 50%;
        height: 4px;
        background: transparent;
        transform-origin: left;
        animation: animate 2s linear infinite;
    }
    @keyframes animateC {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes animate {
        0% {
            transform: rotate(45deg);
        }
        100% {
            transform: rotate(405deg);
        }
    }
`;
