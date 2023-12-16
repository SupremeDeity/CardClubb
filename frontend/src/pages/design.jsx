import Customization from "../components/customization";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import React from "react";
import ProductContext from "../contexts/productcontext";
import SendCard from "./sendcard";

const CardDesign = () => {
    const [fontSize, setFontSize] = React.useState(16);
    const [fontFamily, setFontFamily] = React.useState("");
    const [color, setColor] = React.useState("#282828");
    const [content, setContent] = React.useState("");
    const [envelopeImage, setEnvelopeImage] = React.useState(null);
    const [customization, setCustomization] = React.useState(true);
    return (
        <>
            <NavBar />
            <ProductContext.Provider
                value={{
                    fontSize,
                    setFontSize,
                    color,
                    setColor,
                    content,
                    setContent,
                    envelopeImage,
                    setEnvelopeImage,
                    fontFamily,
                    setFontFamily,
                    setCustomization
                }}
            >
                {customization ? <Customization /> : <SendCard />}
            </ProductContext.Provider>
            <Footer />
        </>
    );
};

export default CardDesign;
