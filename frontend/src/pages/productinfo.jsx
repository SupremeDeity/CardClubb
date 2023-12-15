import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProductInfo = () => {
    const { state } = useLocation();
    const {name,category,index}=state;
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/card/${category}/design`,{state:{category,name,index}})
    }
    return (
        <>
            <NavBar />
            <Info>
                <ImageDiv>
                    <Carousel showStatus={false} showIndicators={false} showArrows={false}>
                        <img src={`/${category}/${index}/Front/Front.png`} />
                        <img src={`/${category}/${index}/Envolpe/envolpe.png`} />
                        <img src={`/${category}/${index}/Image/image.png`} />
                    </Carousel>
                </ImageDiv>
                <Description>
                    <Name>{name}</Name>
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
    );
};

export default ProductInfo;

const Info = styled.div`
    padding: 20px 10px;
    min-height: 60vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    @media (max-width:800px){
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
    @media (max-width:800px){
        align-self: center;
        width:60%;
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
    @media (max-width:800px){
        width:60%;
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
