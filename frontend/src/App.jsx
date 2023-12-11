import "./App.css";
import { Route,Routes } from 'react-router-dom'
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Contact from "./pages/contact";
import Shop from "./pages/shop";
import BirthdayProduct from "./pages/birthdayproduct";
import ThankyouProduct from "./pages/thankyouproduct";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/birthday-product" element={<BirthdayProduct />} />
                <Route path="/thankyou-product" element={<ThankyouProduct />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </>
    );
}

export default App;

