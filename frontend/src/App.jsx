import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Contact from "./pages/contact";
import BirthdayProduct from "./pages/birthdayproduct";
import ThankyouProduct from "./pages/thankyouproduct";
import ProductInfo from "./pages/productinfo";
import CardDesign from "./pages/design";
import SendCard from "./pages/sendcard";
import React from "react";
import UserContext from "./contexts/usercontext";
import ProductContext from "./contexts/productcontext";
import PreviewPage from "./pages/preview";

function App() {
    const [user, setUser] = React.useState({
        isLogin: false,
        username: "",
        email: "",
    });
    const [fontSize, setFontSize] = React.useState(16);
    const [fontFamily, setFontFamily] = React.useState("");
    const [color, setColor] = React.useState("#282828");
    const [content, setContent] = React.useState("");
    const [envelopeImage, setEnvelopeImage] = React.useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/birthday-product" element={<BirthdayProduct />} />
                <Route path="/thankyou-product" element={<ThankyouProduct />} />
                <Route path="/card/:category" element={<ProductInfo />} />
                <Route
                    path="/card/:category/design"
                    element={
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
                            }}
                        >
                            <CardDesign />
                        </ProductContext.Provider>
                    }
                />
                <Route
                    path="/card/:category/design/preview"
                    element={
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
                            }}
                        >
                            <PreviewPage />
                        </ProductContext.Provider>
                    }
                />
                <Route
                    path="/card/:category/design/send"
                    element={
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
                            }}
                        >
                            <SendCard />
                        </ProductContext.Provider>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
