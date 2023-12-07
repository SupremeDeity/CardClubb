import styled from "styled-components";
import logo from "../assets/Logo.png";
import {Link} from "react-router-dom";
const NavBar = () => {

    return (
        <Nav>
            <Primary>
                <Logo src={logo} alt="logo"></Logo>
                <Account>
                    <AccountLinks as={Link} to="/login">Login</AccountLinks>
                    <AccountLinks as={Link} to="/register">SignUp</AccountLinks>
                </Account>
            </Primary>
            <Secondary>
                <NavList>
                    <li>
                        <Links as={Link} to="/shop">
                            Shop
                        </Links>
                    </li>
                    <li>
                        <Links as={Link} to="/shop">
                            Happy Birthday
                        </Links>
                    </li>
                    <li>
                        <Links as={Link} to="/shop">
                            Thank You
                        </Links>
                    </li>
                    <li>
                        <Links as={Link} to="/shop">
                            Design Editor
                        </Links>
                    </li>
                    <li>
                        <Links as={Link} to="/shop">
                            Contact Us
                        </Links>
                    </li>
                </NavList>
            </Secondary>
        </Nav>
    );
};

export default NavBar;

const Primary = styled.div`
    width:100%;
    height:50%;
    background: radial-gradient(
        70.71% 70.71% at 50% 50%,
        rgba(248, 248, 248, 0.98) 0%,
        #fff 89%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    gap:20px;
`;
const Secondary = styled.div`
    width:100%;
    background: #282828;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap:5rem;
    padding-left:1.5rem;
    height: 50%;
`;

const NavList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap:3rem;
`;
const Links = styled.a`
    color: #fff;
    font-size: 1.25rem;
    padding-bottom: 10px;
    &:hover {
        color: #fdc674;
        border-bottom: 3px solid #fdc674;
    }
`;

const Logo = styled.img`
    width: 120px;
    height: 100%;
`;

const Nav = styled.nav`
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Account = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:5px;
`
const AccountLinks = styled.a`
    font-size:1.25rem;
    color:#000;
    &:hover{
        color: #AF4B2F;
    }
    &:first-child{
        padding-right:5px;
        border-right:3px solid #AF4B2F;
    }
`