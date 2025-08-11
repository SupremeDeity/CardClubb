/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styled, { css } from "styled-components";
import logo from "../assets/Logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import React from "react";
import userContext from "../contexts/usercontext";
import Category from "./category";
import Cookies from "js-cookie";

const NavBar = ({ variant = "default" }) => {
  const { user, setLocalStorageUser, setUser } = React.useContext(userContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([
    "Happy Birthday",
    "Thank You",
  ]);
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/category/get?limit=0&skipImages=true`
        );
        const data = await response.json();
        const categories = data.data;
        const newData = [];
        categories.forEach((element) => {
          newData.push(element.category);
        });
        setCategories(() => {
          return ["Happy Birthday", "Thank You", ...newData];
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    return () => {
      setIsOpen(false);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameClick = () => {
    user.isAdmin ? navigate("/admin/dashboard") : navigate("/edit/profile");
  };

  // Single row navbar for all pages
  return (
    <HeroNav>
      <HeroInner>
        <NavLink to="/home">
          <Logo src={logo} alt="logo" />
        </NavLink>
        <HeroMenu>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <DropdownContainer>
              <Button onClick={toggleDropdown}>Categories</Button>
              <DropdownContent style={{ display: isOpen ? "flex" : "none" }}>
                {categories.map((item) => (
                  <Category key={item} category={item} setIsOpen={setIsOpen} />
                ))}
              </DropdownContent>
            </DropdownContainer>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </HeroMenu>

        {user.isLogin ? (
          <HeroAccount>
            <HeroLink as="button" onClick={handleNameClick} $variant="ghost">
              {user.name}
            </HeroLink>
            <HeroLink as="button" onClick={handleLogoutClick} $variant="primary">
              Logout
            </HeroLink>
          </HeroAccount>
        ) : (
          <HeroAccount>
            <HeroLink as={Link} to="/login" $variant="primary">
              Log in
            </HeroLink>
            <HeroLink as={Link} to="/register" $variant="primary">
              Sign up
            </HeroLink>
          </HeroAccount>
        )}
      </HeroInner>
    </HeroNav>
  );
};

export default NavBar;

// Navbar styles
const HeroNav = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
`;
const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;
const HeroMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex: 1;
  @media (max-width: 768px) {
    gap: 20px;
  }
  & a { 
    color: #2c4a34; 
    font-weight: 700; 
    text-transform: uppercase; 
    letter-spacing: 0.5px;
    text-decoration: none;
    font-size: 18px;
    transition: color 0.2s ease;
  }
  & a.active, & a:hover { 
    color: #1a5d3a; 
  }
`;
const HeroAccount = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
const HeroLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
  line-height: 1;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-transform: uppercase;
  
  ${(p) =>
    p.$variant === "primary"
      ? css`
          background: #355e3b;
          color: #ffffff;
          border: 2px solid #355e3b;
          &:hover {
            background: #2a4a2f;
            border-color: #2a4a2f;
          }
        `
      : css`
          background: transparent;
          color: #355e3b;
          border: 2px solid #355e3b;
          &:hover {
            background: #355e3b;
            color: #ffffff;
          }
        `}
`;

const Logo = styled.img`
  width: 140px;
  height: auto;
  max-height: 60px;
  object-fit: contain;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  color: #2c4a34;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 16px;
  padding: 8px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: transparent;
  transition: color 0.2s ease;
  &:hover {
    color: #1a5d3a;
  }
`;

const DropdownContent = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 180px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  padding: 8px 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
  & > a {
    cursor: pointer;
    color: #2c4a34;
    padding: 8px 16px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: background-color 0.2s ease;
  }
  & > a:hover {
    background-color: #f5f5f5;
    color: #1a5d3a;
  }
`;
