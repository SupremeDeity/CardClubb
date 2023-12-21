import Footer from "../components/footer"
import NavBar from "../components/navbar"
import ProductCart from "../components/productcart"

const BirthdayProduct = () => {
    return (
        <>
            <NavBar />
            <ProductCart category="birthday"/>
            <Footer />
        </>
    );
};

export default BirthdayProduct;
