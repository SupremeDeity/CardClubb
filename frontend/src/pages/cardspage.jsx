import NavBar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Cards from "../components/cards";

const CardsPage = () => {
    const [loadingPage, setLoadingPage] = React.useState(true);
    const [cards, setCards] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchCards= async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/card/get/few`
                );
                const data = await response.json();
                console.log(data);
                setCards(data.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoadingPage(false)
            }
        };
        fetchCards();
    }, []);
    const handleUserDelete = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/card/del`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ id: id }),
                }
            );
             if(response.ok)
                toast.success("Card deleted Successfully", {
                    position: "top-right",
                });
        } catch (error) {
            toast.error("Card can't deleted", {
                position: "top-right",
            });
        }finally{
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
                    <Cards cards={cards} onCardDelete={handleUserDelete} />
                    <Footer />
                    <ToastContainer />
                </>
            )}
        </>
    );
};

export default CardsPage;

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
