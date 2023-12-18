import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Contact from "./pages/contact";
import Shop from "./pages/shop";
import BirthdayProduct from "./pages/birthdayproduct";
import ThankyouProduct from "./pages/thankyouproduct";
import ProductInfo from "./pages/productinfo";
import CardDesign from "./pages/design";
import SendCard from "./pages/sendcard";
import React from "react";
import UserContext from "./contexts/usercontext";

function App() {
    const [user, setUser] = React.useState({
        isLogin: false,
        username: "",
        email: "",
    });
    return (
        <UserContext.Provider value={{user, setUser}}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/birthday-product" element={<BirthdayProduct />} />
                <Route path="/thankyou-product" element={<ThankyouProduct />} />
                <Route path="/card/:category" element={<ProductInfo />} />
                <Route path="/card/:category/design" element={<CardDesign />} />
                <Route
                    path="/card/:category/design/send"
                    element={<SendCard />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
