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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([
    "Happy Birthday",
    "Thank You",
  ]);
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/category/get?limit=0&skipImages=true`
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
    // No cleanup needed
    return () => {};
  }, []);
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((v) => !v);
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

  // Responsive navbar with hamburger menu for mobile
  // Close menu on navigation
  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  // Close menu when clicking outside (mobile only)
  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      setMenuOpen(false);
      setDropdownOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  return (
    <HeroNav>
      <HeroInner>
        <NavLink to="/home">
          <Logo src={logo} alt="logo" />
        </NavLink>
        <Hamburger
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          $open={menuOpen}
        >
          <span />
          <span />
          <span />
        </Hamburger>
        <HeroMenu $open={menuOpen} onClick={(e) => e.stopPropagation()}>
          <li>
            <NavLink to="/home" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <DropdownContainer>
              <Button onClick={toggleDropdown}>Categories</Button>
              <DropdownContent
                style={{ display: dropdownOpen ? "flex" : "none" }}
              >
                {categories.map((item) => (
                  <Category
                    key={item}
                    category={item}
                    setIsOpen={setDropdownOpen}
                  />
                ))}
              </DropdownContent>
            </DropdownContainer>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact Us
            </NavLink>
          </li>
          <MobileAccount>
            {user.isLogin ? (
              <>
                <HeroLink
                  as="button"
                  onClick={() => {
                    closeMenu();
                    handleNameClick();
                  }}
                  $variant="ghost"
                >
                  {user.name}
                </HeroLink>
                <HeroLink
                  as="button"
                  onClick={() => {
                    closeMenu();
                    handleLogoutClick();
                  }}
                  $variant="primary"
                >
                  Logout
                </HeroLink>
              </>
            ) : (
              <>
                <HeroLink
                  as="button"
                  to="/login"
                  $variant="primary"
                  onClick={closeMenu}
                >
                  Log in
                </HeroLink>
                <HeroLink
                  as="button"
                  to="/register"
                  $variant="primary"
                  onClick={closeMenu}
                >
                  Sign up
                </HeroLink>
              </>
            )}
          </MobileAccount>
        </HeroMenu>
        <DesktopAccount>
          {user.isLogin ? (
            <>
              <HeroLink as="button" onClick={handleNameClick} $variant="ghost">
                {user.name}
              </HeroLink>
              <HeroLink
                as="button"
                onClick={handleLogoutClick}
                $variant="primary"
              >
                Logout
              </HeroLink>
            </>
          ) : (
            <>
              <HeroLink as={Link} to="/login" $variant="primary">
                Log in
              </HeroLink>
              <HeroLink as={Link} to="/register" $variant="primary">
                Sign up
              </HeroLink>
            </>
          )}
        </DesktopAccount>
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
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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
  position: relative;

  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: #fff;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 0;
    padding: 80px 24px 32px 24px;
    z-index: 100;
    transform: ${(p) => (p.$open ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease-in-out;
    box-shadow: ${(p) => (p.$open ? "0 0 50px rgba(0,0,0,0.3)" : "none")};
    overflow-y: auto;
  }

  & li {
    @media (max-width: 900px) {
      width: 100%;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  & a {
    color: #2c4a34;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-decoration: none;
    font-size: 18px;
    transition: color 0.2s ease;

    @media (max-width: 900px) {
      font-size: 18px;
      font-weight: 600;
      padding: 16px 0;
      width: 100%;
      display: block;
      text-align: left;
      border-radius: 0;
    }
  }

  & a.active,
  & a:hover {
    color: #1a5d3a;
    @media (max-width: 900px) {
      background: #f8f9fa;
      padding-left: 8px;
    }
  }
`;

const Hamburger = styled.button`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 201;
    position: relative;

    span {
      display: block;
      width: 25px;
      height: 3px;
      margin: 2px 0;
      background: #355e3b;
      border-radius: 2px;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    ${(props) =>
      props.$open &&
      css`
        span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        span:nth-child(2) {
          opacity: 0;
        }
        span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
      `}
  }
`;

const DesktopAccount = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }
`;
const MobileAccount = styled.div`
  display: none;
  width: 100%;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 900px) {
    display: flex;
  }
`;
const HeroLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-align: center !important;
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
  max-width: 200px;

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
  font-size: 18px;
  padding: 0;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  transition: color 0.2s ease;

  @media (max-width: 900px) {
    font-size: 18px;
    font-weight: 600;
    padding: 16px 0;
    width: 100%;
    text-align: left;
  }

  &:hover {
    color: #1a5d3a;
    @media (max-width: 900px) {
      background: #f8f9fa;
      padding-left: 8px;
    }
  }
`;

const DropdownContent = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    left: 0;
    transform: none;
    border: none;
    border-radius: 0;
    box-shadow: none;
    margin-top: 8px;
    padding: 0;
    background: #f8f9fa;
  }

  & > a {
    cursor: pointer;
    color: #2c4a34;
    padding: 12px 16px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: background-color 0.2s ease;

    @media (max-width: 900px) {
      font-size: 16px;
      padding: 12px 16px 12px 24px;
      border-bottom: 1px solid #e9ecef;
    }
  }

  & > a:hover {
    background-color: #f5f5f5;
    color: #1a5d3a;
    @media (max-width: 900px) {
      background-color: #e9ecef;
    }
  }
`;
