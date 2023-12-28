import { useLocation } from "react-router-dom";
import Footer from "../components/footer"
import NavBar from "../components/navbar"
import ProductCart from "../components/productcart"

const Product = () => {
    const {state} = useLocation();
    const {category}=state;

    return (
        <>
            <NavBar />
            <ProductCart category={category}/>
            <Footer />
        </>
    );
};

export default Product;

