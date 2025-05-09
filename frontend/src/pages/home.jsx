import Footer from "../components/footer";
import NavBar from "../components/navbar";
import styled from "styled-components";
import image_1 from "../assets/home1.png";
import image_2 from "../assets/home2.png";
import image_3 from "../assets/home4.png";
import image_4 from "../assets/home5.png";
import React from "react";
import HomeImage from "../assets/home.jpg";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/usercontext";

const Home = () => {
  const [loadingPage, setLoadingPage] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const [categories, setCategories] = React.useState([
    { name: "Happy Birthday", image: "/birthday/1/Front/Front.png" },
    { name: "Thank You", image: "/thanksyou/1/Front/Front.png" },
  ]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);

  const navigate = useNavigate();

  const getCardDetails = async (id) => {
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
        handleClick(data.card);
      } else {
        console.error("Failed to fetch cards");
      }
    } catch (error) {
      console.error("Failed to fetch cards");
    } finally {
      setLoadingPage(false);
    }
  };

  const handleClick = async (details) => {
    const { category, name, front, image, envelope, custom } = details;
    const cat = category.replace(/ /g, "-");
    navigate(`/card/${cat}/design`, {
      state: { category: cat, name, front, image, envelope, custom },
    });
  };

  const handleCardClick = async (id) => {
    setLoadingPage(true);
    await getCardDetails(id);
    setLoadingPage(false);
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingMore(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/category/get?page=${page}&limit=4`
        );
        const data = await response.json();
        const newCategories = data.data.map((item) => ({
          name: item.category,
          image: item.image ?? "/thanksyou/1/Custom/custom.jpg",
        }));

        setCategories((prevCategories) => {
          const uniqueNewCategories = newCategories.filter(
            (newCat) => !prevCategories.some((prevCat) => prevCat.name === newCat.name)
          );
          
          return [...prevCategories, ...uniqueNewCategories];
        });

        setHasMore(data.hasMore);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMore(false);
      }
    };

    fetchCategories();
  }, [page]);

  const loadMoreCategories = () => {
    setPage((prevPage) => prevPage + 1);
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
          <LandingPage>
            <HeaderSection>
              <HeaderLabel>ONLINE GREETING CARDS</HeaderLabel>
              <HeaderPara>
                Create Greeting Cards for Free-For Our Mobo-Friends!
              </HeaderPara>
            </HeaderSection>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                background: "#355e3b",
                width: "100%",
                textAlign: "center",
                padding: "32px",
                color: "white",
              }}
            >
              Categories
            </span>
            <CategorySection>
              {categories.map((category) => {
                const routeLink = category.name.trim().split(" ").join("-");
                const imageLink =
                  category.name === "Happy Birthday" ||
                  category.name === "Thank You" || category.image?.startsWith("/")
                    ? category.image
                    : null;
                return (
                  <CategoryCard to={`/cards/${routeLink}`} key={category.name}>
                    <img
                      src={
                        imageLink
                          ? imageLink
                          : `data:image/jpeg;base64,${category.image}`
                      }
                      alt={category.name}
                      style={{
                        width: "100%",
                        borderRadius: "4px",
                        marginBottom: "8px",
                      }}
                    />
                    {category.name}
                  </CategoryCard>
                );
              })}
            </CategorySection>
            {loadingMore && <p>Loading...</p>}
            {hasMore && (
              <LoadMoreButton onClick={loadMoreCategories}>
                Load More
              </LoadMoreButton>
            )}
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                background: "#355e3b",
                width: "100%",
                textAlign: "center",
                padding: "32px",
                color: "white",
              }}
            >
              Trending
            </span>
            <MainSection>
              <Image
                onClick={() => handleCardClick("6631029d8211e98e0de50718")}
                src={image_1}
                style={{ cursor: "pointer" }}
              ></Image>
              <Image
                onClick={() => handleCardClick("663102138211e98e0de50702")}
                src={image_2}
                style={{ cursor: "pointer" }}
              ></Image>
              <Image
                onClick={() => handleCardClick("663102bc8211e98e0de5071a")}
                src={image_3}
                style={{ cursor: "pointer" }}
              ></Image>
              <Image
                onClick={() => handleCardClick("6631024b8211e98e0de50704")}
                src={image_4}
                style={{ cursor: "pointer" }}
              ></Image>
            </MainSection>
            {!user.isLogin && (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#355e3b",
                  width: "100%",
                  padding: "64px",
                  gap: "32px",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "32px",
                  }}
                >
                  Get Started Now!
                </span>
                <div style={{ display: "flex", gap: "12px", padding: "4px" }}>
                  <Button to="/login">Login</Button>
                  <Button to="/register">Sign up</Button>
                </div>
              </section>
            )}
          </LandingPage>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;

const LandingPage = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const HeaderSection = styled.section`
  padding: 20px;
  background-image: url(${HomeImage});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.5rem;
  & > button {
    background: #355e3b;
    color: white;
    text-align: center;
    width: 150px;
    height: 50px;
    border: none;
    outline: none;
  }
  @media (max-width: 850px) {
    height: 50vh;
  }
  @media (max-width: 650px) {
    height: 40vh;
  }
`;
const HeaderLabel = styled.h3`
  color: #355e3b;
  font-size: 2.3rem;
  text-align: center;
  @media (max-width: 850px) {
    font-size: 1.8rem;
  }
  @media (max-width: 650px) {
    font-size: 1.2rem;
  }
`;
const HeaderPara = styled.p`
  color: gray;
  font-size: 2rem;
  text-align: center;
  @media (max-width: 850px) {
    font-size: 1.5rem;
  }
  @media (max-width: 650px) {
    font-size: 1rem;
  }
`;
const Image = styled.img`
  width: 460px;
  height: 460px;
  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: 420px) {
    width: 270px;
    height: 270px;
  }
`;
const MainSection = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 4rem;
  @media (max-width: 800px) {
    & > div {
      width: 50%;
    }
    flex-direction: column;
  }
  border-radius: 10px;
  gap: 5rem;
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: #355e3b;
  background: white;
  border: none;
  border-radius: 10px;
  width: 180px;
  height: 51px;
`;

const CategorySection = styled.div`
  display: grid;
  padding: 64px;
  gap: 1rem;
  color: white;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(8, 1fr);
  }
`;

const CategoryCard = styled(Link)`
  background: #355e3b;
  color: white;
  padding: 32px;
  text-align: center;
  border-radius: 4px;
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
const LoadMoreButton = styled.button`
  background: #355e3b;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 16px auto;
  display: block;

  &:hover {
    background: #2a4a2f;
  }
`;
