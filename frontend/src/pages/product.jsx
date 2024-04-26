/* eslint-disable react/jsx-key */
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import CardItems from "../components/carditems";
import CardDetails from "../components/carddetails";
import React from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [loadingPage, setLoadingPage] = React.useState(true);
  const { category } = useParams();
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    const fetchCards = async () => {
      setLoadingPage(true);
      const parameter = category.replace(/-/g, " ");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/card/get/category`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: parameter,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCards(data.data);
        } else {
          console.error("Failed to fetch cards");
        }
      } catch (error) {
        console.error("Error fetching cards:", error.message);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchCards();
  }, [category]);
  return (
    <>
      {loadingPage ? (
        <>
          <Ring>
            Loading
            <span></span>
          </Ring>
        </>
      ) : (
        <>
          <NavBar />
          <Card>
            {category == "Happy-Birthday" ? (
              <>
                <CardItems
                  index="1"
                  image="/birthday/1/Front/Front.png"
                  name="Happy Birthday"
                  category="birthday"
                />
                <CardItems
                  index="2"
                  image="/birthday/2/Front/Front.png"
                  name="Happy Birthday (1)"
                  category="birthday"
                />
              </>
            ) : (
              <></>
            )}
            {category == "Thank-You" ? (
              <>
                <CardItems
                  index="1"
                  image="/thanksyou/1/Front/Front.png"
                  name="Thank You"
                  category="thanksyou"
                />
                <CardItems
                  index="2"
                  image="/thanksyou/2/Front/Front.png"
                  name="Thank You (1)"
                  category="thanksyou"
                />
              </>
            ) : (
              <></>
            )}
            {cards &&
              cards.map((card) => {
                return <CardDetails card={card} />;
              })}
          </Card>
          <Footer />
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default Product;

const Card = styled.div`
  margin-left: 20px;
  min-height: 60vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  @media (max-width: 770px) {
    justify-content: center;
  }
`;

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
