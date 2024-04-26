import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import React from "react";

const ProductDetails = () => {
  const [details, setDetails] = React.useState(null);
  const [loadingPage, setLoadingPage] = React.useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const getCardDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/card/specific`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDetails(data.card);
        } else {
          console.error("Failed to fetch cards");
        }
      } catch (error) {
        console.error("Failed to fetch cards");
      } finally {
        setLoadingPage(false);
      }
    };
    getCardDetails();
  }, [id]);
  const handleClick = () => {
    const { category, name, front, image, envelope, custom } = details;
    const cat = category.replace(/ /g, "-")
    navigate(`/card/${cat}/design`, {
      state: { category:cat, name , front, image, envelope, custom },
    });
  };
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
          <Info>
            <ImageDiv>
              <Carousel
                showStatus={false}
                showIndicators={false}
                showArrows={false}
              >
                <img src={`data:image/png;base64,${details.front}`} />
                <img src={`data:image/png;base64,${details.envelope}`} />
                <img src={`data:image/png;base64,${details.image}`} />
              </Carousel>
            </ImageDiv>
            <Description>
              <Name>{details.name}</Name>
              <Button onClick={handleClick}>Personalize Design</Button>
              <Features>
                <div>Add an Image</div>
                <div>Style and edit your message</div>
                <div>Customize your envelope</div>
              </Features>
            </Description>
          </Info>
          <Footer />
        </>
      )}
    </>
  );
};

export default ProductDetails;

const Info = styled.div`
  padding: 20px 10px;
  min-height: 60vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Description = styled.div`
  padding: 40px 10px 20px 10px;
  width: 20%;
  align-self: flex-start;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  @media (max-width: 800px) {
    align-self: center;
    width: 60%;
  }
`;
const Name = styled.div`
  color: #282828;
  font-size: 1.5rem;
  font-weight: 700;
`;
const Features = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  width: 100%;
  border-top: 3px solid #fdc674;
  color: #282828;
  & > div {
    font-size: 1rem;
    font-weight: 500;
    padding-bottom: 20px;
  }
`;
const ImageDiv = styled.div`
  width: 40%;
  @media (max-width: 800px) {
    width: 60%;
  }
`;

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  color: #282828;
  background: #fdc674;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  padding: 20px 0;
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
