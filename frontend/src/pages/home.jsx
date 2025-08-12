import Footer from "../components/footer";
import NavBar from "../components/navbar";
import styled from "styled-components";
import image_1 from "../assets/showcase1.svg";
import image_2 from "../assets/showcase2.svg";
import image_3 from "../assets/showcase3.svg";
import image_4 from "../assets/showcase4.svg";
import image_5 from "../assets/showcase5.svg";
import step1 from "../assets/step1.svg";
import step2 from "../assets/step2.svg";
import step3 from "../assets/step3.svg";
import step4 from "../assets/step4.svg";
import step5 from "../assets/step5.svg";
import React from "react";
import HeroBg from "../assets/hero_bg.png";
import ArrowCurve from "../assets/arrow.svg";
import EnvelopeImg from "../assets/envelope.svg";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/usercontext";
import { useRef } from "react";

const Home = () => {
  const [loadingPage, setLoadingPage] = React.useState(false);
  const categoriesRef = useRef(null);
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
          `${import.meta.env.VITE_BASE_URL}/category/get?page=${page}&limit=6`
        );
        const data = await response.json();
        const newCategories = data.data.map((item) => ({
          name: item.category,
          image: item.image ?? "/thanksyou/1/Custom/custom.jpg",
        }));

        setCategories((prevCategories) => {
          const uniqueNewCategories = newCategories.filter(
            (newCat) =>
              !prevCategories.some((prevCat) => prevCat.name === newCat.name)
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
            {/* Hero Section */}
            <Hero $bg={HeroBg}>
              <HeroContent>
                <Headline>
                  SEND FREE E-CARDS TO FRIENDS, FAMILY,
                  <br /> OR BUSINESS NETWORKS!
                </Headline>
                <Subheadline>
                  Easy as 1–2–3 — Choose a card, add your message,
                  <br /> send it by email or text
                </Subheadline>
                <CTAHero
                  onClick={() =>
                    window.scrollTo({
                      top: categoriesRef.current.offsetTop - 92,
                      behavior: "smooth",
                    })
                  }
                >
                  Start Now
                </CTAHero>
              </HeroContent>
              <HeroImage>
                <img src={EnvelopeImg} alt="E-card envelope" />
              </HeroImage>
            </Hero>

            {/* How it works */}
            <SectionTitle style={{ marginTop: 48, marginInline: 12 }}>
              How it works — just follow simple steps !
            </SectionTitle>
            <StepsRow>
              <StepCard>
                <StepIcon src={step1} alt="Pick a Card" />
                <StepHeading>Pick a Card</StepHeading>
                <StepText>
                  Login or Signup — then pick your card from categories
                </StepText>
              </StepCard>
              <StepArrow src={ArrowCurve} alt="arrow" />
              <StepCard>
                <StepIcon
                  src={step2}
                  alt="Customize Inside"
                />
                <StepHeading>Customize Card Inside</StepHeading>
                <StepText>
                  Add your message, then save and send to your loved ones!
                </StepText>
              </StepCard>
              <StepArrow src={ArrowCurve} alt="arrow" />
              <StepCard>
                <StepIcon src={step3} alt="Customize Envelope" />
                <StepHeading>Customize Envelope</StepHeading>
                <StepText>
                  Upload custom liner design, add your logo and upload your
                  photo
                </StepText>
              </StepCard>
            </StepsRow>
            <MobileOnlyArrow src={ArrowCurve} alt="arrow" />
            <StepsRow $columns="repeat(3, 1fr)">
              <StepCard>
                <StepIcon src={step4} alt="Preview" />
                <StepHeading>Preview your E‑card</StepHeading>
                <StepText>
                  Preview before sending — make edits instantly
                </StepText>
              </StepCard>
              <StepArrow src={ArrowCurve} alt="arrow" />
              <StepCard>
                <StepIcon src={step5} alt="Send" />
                <StepHeading>Send Your E‑Card</StepHeading>
                <StepText>
                  Enter email and name and send. It’s totally free!
                </StepText>
              </StepCard>
            </StepsRow>

            {/* Categories */}
            <CategoriesBanner ref={categoriesRef}>
              <SectionTitle>Choose from categories</SectionTitle>
              <SectionSubtitle>
                Select & create your free perfect e‑card
              </SectionSubtitle>
              <CategoryGrid>
                {categories.map((category) => {
                  const routeLink = category.name.trim().split(" ").join("-");
                  const imageLink =
                    category.name === "Happy Birthday" ||
                    category.name === "Thank You" ||
                    category.image?.startsWith("/")
                      ? category.image
                      : null;
                  return (
                    <CategoryTile
                      to={`/cards/${routeLink}`}
                      key={category.name}
                    >
                      <img
                        src={
                          imageLink
                            ? imageLink
                            : `data:image/jpeg;base64,${category.image}`
                        }
                        alt={category.name}
                      />
                      <span>{category.name}</span>
                    </CategoryTile>
                  );
                })}
              </CategoryGrid>
              {loadingMore && <CenterNote>Loading...</CenterNote>}
              {hasMore && (
                <PrimaryButton onClick={loadMoreCategories}>
                  Load More
                </PrimaryButton>
              )}
            </CategoriesBanner>

            {/* Feature banner */}
            <FeatureBanner>
              <SectionTitle>The Easiest Way to Send Your E‑Cards</SectionTitle>
              <FeatureText>
                Custom online birthday cards for kids, adults & everyone in
                between
              </FeatureText>
              <BrowseLink
                onClick={() => {
                  window.scrollTo({
                    top: categoriesRef.current.offsetTop - 92,
                    behavior: "smooth",
                  });
                }}
              >
                Browse All Invitations
              </BrowseLink>
              <FeatureImage>
                <img src={EnvelopeImg} alt="E-card envelope" />
              </FeatureImage>
            </FeatureBanner>

            {/* Showcase shelf */}
            <Shelf>
              <ShelfRow>
                <ShowcaseCard
                  onClick={() => handleCardClick("6631024b8211e98e0de50704")}
                >
                  <img src={image_1} alt="Card 1" />
                </ShowcaseCard>
                <ShowcaseCard
                  onClick={() => handleCardClick("67221246d8b6bbacb79f6ce5")}
                >
                  <img src={image_2} alt="Card 2" />
                </ShowcaseCard>
                <ShowcaseCard
                  onClick={() => handleCardClick("67220d6dd8b6bbacb79f6cd0")}
                >
                  <img src={image_3} alt="Card 3" />
                </ShowcaseCard>
                <ShowcaseCard
                  onClick={() => handleCardClick("661ed2689213caefcf396190")}
                >
                  <img src={image_4} alt="Card 4" />
                </ShowcaseCard>
                <ShowcaseCard
                  onClick={() => handleCardClick("6722128ed8b6bbacb79f6cec")}
                >
                  <img src={image_5} alt="Card 5" />
                </ShowcaseCard>
              </ShelfRow>
              <ShelfBase />
            </Shelf>

            {/* FAQ */}
            <FAQWrapper>
              <FAQImage>
                <img src={EnvelopeImg} alt="E-card envelope" />
              </FAQImage>
              <FAQSection>
                <SectionTitle>FAQ</SectionTitle>
                <FAQList>
                  <li>
                    <h4>1. What are the uses for these e‑cards?</h4>
                    <p>
                      Use our custom cards for all occasions — perfect for
                      business, birthdays, and more.
                    </p>
                  </li>
                  <li>
                    <h4>2. Do I need to create an account to send a card?</h4>
                    <p>
                      Creating an account is optional but recommended. It helps
                      you save cards, access past sends, and personalize more
                      easily. You can still try it out without signing up.
                    </p>
                  </li>
                  <li>
                    <h4>3. Can I personalize the message and add branding?</h4>
                    <p>
                      Yes. Add a custom message and upload images like photos or
                      your business logo.
                    </p>
                  </li>
                  <li>
                    <h4>4. Is it really free to send a card?</h4>
                    <p>
                      Yes — no fees, no payment, no subscription. Just create,
                      customize, and send.
                    </p>
                  </li>
                  <li>
                    <h4>5. How do recipients get the card?</h4>
                    <p>
                      Enter their email address and the card is sent instantly.
                      No downloads or apps required.
                    </p>
                  </li>
                </FAQList>
              </FAQSection>
            </FAQWrapper>
          </LandingPage>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;

const CategoriesBanner = styled.section`
  background: #2a4e301c;
  width: 100%;
  padding: 30px 0px;
`;
// Layout
const LandingPage = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
`;

// Hero styles
const Hero = styled.header`
  position: relative;
  width: 100%;
  min-height: 65vh;
  background: linear-gradient(135deg, #2d5a41 0%, #1e4832 100%);
  background-image: url(${(p) => p.$bg});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  @media (max-width: 768px) {
    min-height: 60vh;
    padding: 40px 20px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: #ffffff;
  max-width: 850px;
  z-index: 2;
  position: relative;
`;

const HeroImage = styled.div`
  position: absolute;
  bottom: -52px;
  right: 20px;
  z-index: 1;

  img {
    width: 160px;
    height: auto;
    max-width: 100%;
    object-fit: contain;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
  }

  @media (max-width: 768px) {
    right: 10px;
    bottom: -35px;
    img {
      width: 130px;
    }
  }

  @media (max-width: 480px) {
    right: 5px;
    bottom: -30px;
    img {
      width: 120px;
    }
  }
`;

const Headline = styled.h1`
  font-size: clamp(24px, 4.5vw, 40px);
  line-height: 1.4;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 14px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subheadline = styled.p`
  font-size: clamp(16px, 2.2vw, 20px);
  line-height: 1.4;
  margin: 0 0 24px 0;
  opacity: 0.95;
  font-weight: 400;
`;

const CTAHero = styled.button`
  display: inline-block;
  padding: 14px 28px;
  background: #ffffff;
  color: #2d5a41;
  border-radius: 6px;
  font-weight: 800;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 0 rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
  }
`;

// Steps
const SectionTitle = styled.h2`
  margin: 24px 0 8px;
  letter-spacing: 0.2px;
  font-size: clamp(40px, 3vw, 28px);
  font-weight: 800;
  text-align: center;
  color: #2c4a34;
  text-transform: uppercase;
`;
const SectionSubtitle = styled.p`
  margin: 0 0 12px;
  text-align: center;
  color: #4c6b57;
`;
const StepsRow = styled.div`
  display: grid;
  grid-template-columns: ${(p) => p.$columns || "repeat(5, 1fr)"};
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 1100px;
  padding: 12px 20px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
const StepCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  padding: 18px;
  text-align: center;
`;
const StepIcon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 0 auto 10px;
`;
const StepHeading = styled.h4`
  margin: 4px 0 6px;
  color: #2f513d;
`;
const StepText = styled.p`
  margin: 0;
  color: #567a67;
  font-size: 14px;
`;
const StepArrow = styled.img`
  width: 200px;
  display: block;
  justify-self: center;
  align-self: center;
  transform: rotate(90deg);
  
  @media (min-width: 901px) {
    display: block;
    width: 100%;
    transform: rotate(0deg);
  }
`;

const MobileOnlyArrow = styled.img`
  width: 200px;
  transform: rotate(90deg);
  
  @media (min-width: 901px) {
    display: none;
  }
`;

// Categories
const Anchor = styled.span`
  display: block;
  position: relative;
  top: -64px;
`;
const CategoryGrid = styled.div`
  width: 100%;
  padding: 24px 20px 8px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  justify-items: center; /* Centers items horizontally */
  align-items: start; /* Ensures top alignment */

  @media (min-width: 640px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
`;

const CategoryTile = styled(Link)`
  background: #f8f8f8;
  color: black;
  min-height: 200px;
  border-radius: 8px;
  padding: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%; /* Fill grid column */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.15);
  }

  & > img {
    width: 100%;
    aspect-ratio: 1 / 1; /* Keeps images square */
    object-fit: cover; /* Keeps proportions */
    border-radius: 6px;
  }
`;

const PrimaryButton = styled.button`
  background: #355e3b;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 16px auto 24px;
  display: block;
  &:hover {
    background: #2a4a2f;
  }
`;
const CenterNote = styled.p`
  text-align: center;
`;

// Feature banner
const FeatureBanner = styled.section`
  position: relative;
  width: 100%;
  padding: 36px 16px;
  text-align: center;
`;
const FeatureText = styled.p`
  margin: 6px 0 12px;
  color: #567a67;
`;
const BrowseLink = styled.button`
  color: #1a5d3a;
  font-weight: 700;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
`;

const FeatureImage = styled.div`
  position: absolute;
  top: -80px;
  right: -40px;
  z-index: 1;

  img {
    width: 160px;
    height: auto;
    object-fit: contain;
    transform: rotate(-50deg);
  }

  @media (max-width: 768px) {
    top: -40px;
    right: -20px;
    img {
      width: 100px;
    }
  }
`;

// Shelf showcase
const Shelf = styled.section`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 24px auto 48px;
  padding: 0 16px;
`;
const ShelfRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 4px;
    transform: translateY(-8px);
  }
`;
const ShowcaseCard = styled.button`
  background: none;
  border: none;
  border-radius: 10px;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  width: 16%;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  & > img {
    max-width: 186px;
    max-height: 160px;
    width: 100%;
    height: auto;
  }
  
  @media (max-width: 768px) {
    width: 19%;
    border-radius: 6px;
    height: 80px;
    
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const ShelfBase = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(90% - 40px);
  height: 30px;
  background: #2c4a34;
  border-radius: 6px;
  z-index: -1;
  
  @media (max-width: 768px) {
    bottom: -5px;
    height: 20px;
    width: calc(95%);
  }
`;

// FAQ
const FAQWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;
const FAQSection = styled.section`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 16px 56px;
`;
const FAQImage = styled.div`
  position: absolute;
  left: -55px;
  top: 26px;
  z-index: -2;
  img {
    width: 150px;
    height: auto;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    left: -50px;
    top: 24px;
    img {
      width: 100px;
      height: auto;
      object-fit: contain;
    }
  }
`;
const FAQList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
  & li {
    background: #fff;
    border: 1px solid #e8efe9;
    border-radius: 8px;
    padding: 12px 14px;
  }
  & h4 {
    margin: 0 0 6px;
    color: #2f513d;
  }
  & p {
    margin: 0;
    color: #567a67;
  }
`;

// Loader
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
