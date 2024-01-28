import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Contact from "./pages/contact";
import Product from "./pages/product";
import ProductInfo from "./pages/productinfo";
import CardDesign from "./pages/design";
import SendCard from "./pages/sendcard";
import PreviewPage from "./pages/preview";
import AdminLogin from "./pages/admin-login";
import AdminDashboard from "./pages/admin-dashboard";
import AdminRegister from "./pages/adminregister";
import UserContext from "./contexts/usercontext";
import ProductContext from "./contexts/productcontext";
import OpenCard from "./pages/opencard";
import UsersPage from "./pages/usersPage";
import ResetPasswordRequest from "./pages/resetpassword";
import ResetPasswordForm from "./pages/resetpasswordform";

function App() {
    const localuser = localStorage.getItem("user");
    const [localStorageUser, setLocalStorageUser] = React.useState(
        localuser ? JSON.parse(localuser) : ""
    );
    const [user, setUser] = React.useState({
        isAdmin: localStorageUser ? true : false,
        isLogin: localStorageUser ? true : false,
        name: localStorageUser ? localStorageUser["name"] : "",
        email: localStorageUser ? localStorageUser["email"] : "",
    });
    const [fontSize, setFontSize] = React.useState(16);
    const [fontFamily, setFontFamily] = React.useState("Inter");
    const [color, setColor] = React.useState("#282828");
    const [content, setContent] = React.useState("");
    const [envelopeImage, setEnvelopeImage] = React.useState(null);
    const [envelopeText, setEnvelopeText] = React.useState("");
    const [envelopeOpenImage, setEnvelopeOpenImage] = React.useState(null);

    return (
        <UserContext.Provider
            value={{ user, setUser, localStorageUser, setLocalStorageUser }}
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/open/card/:id" element={<OpenCard />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/reset/password" element={<ResetPasswordRequest />} />
                <Route path="/reset/password/:token" element={<ResetPasswordForm />} />
                <Route path="/admin-register" element={<AdminRegister />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/dashboard/users" element={<UsersPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/:category/product" element={<Product />} />
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
                                envelopeText,
                                setEnvelopeText,
                                envelopeOpenImage,
                                setEnvelopeOpenImage,
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
                                envelopeText,
                                setEnvelopeText,
                                envelopeOpenImage,
                                setEnvelopeOpenImage,
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
                                envelopeOpenImage,
                                setEnvelopeOpenImage,
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
