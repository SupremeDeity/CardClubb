/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styled from "styled-components";
import logo from "../assets/Logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import React from "react";
import userContext from "../contexts/usercontext";
import Cookies from 'js-cookie';

const NavBarPrimary = () => {
    const { user, setLocalStorageUser, setUser } =
        React.useContext(userContext);
    const navigate = useNavigate();
    const handleLogoutClick = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/users/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                Cookies.remove("user");
                setUser({
                    isAdmin: false,
                    isLogin: false,
                    name: "",
                    email: "",
                });
                setLocalStorageUser(null);
                navigate("/home")
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleNameClick = ()=>{
        user.isAdmin ? navigate("/admin/dashboard"):  navigate("/edit/profile")
    }
    return (
        <Nav>
            <Primary>
                <NavLink to="/home">
                    <Logo src={logo} alt="logo"></Logo>
                </NavLink>
                {user.isLogin ? (
                    <Account>
                        <AccountLinks onClick={handleNameClick}>{user.name}</AccountLinks>
                        <AccountLinks onClick={handleLogoutClick}>
                            Logout
                        </AccountLinks>
                    </Account>
                ) : (
                    <Account>
                        <AccountLinks as={Link} to="/login">
                            Login
                        </AccountLinks>
                        <AccountLinks as={Link} to="/register">
                            SignUp
                        </AccountLinks>
                    </Account>
                )}
            </Primary>
        </Nav>
    );
};

export default NavBarPrimary;

const Primary = styled.div`
    width: 100%;
    height: 100%;
    background: radial-gradient(
        70.71% 70.71% at 50% 50%,
        rgba(248, 248, 248, 0.98) 0%,
        #fff 89%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    @media (max-width: 700px) {
        padding: 0 20px;
        justify-content: space-between;
    }
`;

const Logo = styled.img`
    width: 120px;
    height: 100%;
`;

const Nav = styled.nav`
    height: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid black;
`;
const Account = styled.div`
    position: absolute;
    right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;
const AccountLinks = styled.a`
    font-size: 1.25rem;
    cursor: pointer;
    color: #000;
    &:hover {
        color: #af4b2f;
    }
    &:first-child {
        padding-right: 5px;
        border-right: 3px solid #af4b2f;
    }
`;

