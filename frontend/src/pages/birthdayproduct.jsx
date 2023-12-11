import Footer from "../components/footer"
import NavBar from "../components/navbar"
import styled from "styled-components"
import ProductCart from "../components/productcart"

const BirthdayProduct = () => {
    return (
        <>
            <NavBar />
            <Label>Birthday Products</Label>
            <ProductCart category="birthday"/>
            <Footer />
        </>
    );
};

export default BirthdayProduct;

const Label = styled.div`
    padding: 20px;
    text-align: center;
    color: #282828;
    font-size: 3rem;
    font-weight: 700;
`