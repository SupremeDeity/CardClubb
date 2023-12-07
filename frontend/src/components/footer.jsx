import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp,faTwitter,faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
const Footer = () => {
    return (
        <Nav>
            <NavList>
                <li>
                    <Links as={Link} to="/shop">
                        Shop
                    </Links>
                </li>
                <li>
                    <Links as={Link} to="/happybirthday">
                        Happy Birthday
                    </Links>
                </li>
                <li>
                    <Links as={Link} to="/thankyou">
                        Thank You
                    </Links>
                </li>
                <li>
                    <Links as={Link} to="/designeditor">
                        Design Editor
                    </Links>
                </li>
                <li>
                    <Links as={Link} to="/contact">
                        Contact Us
                    </Links>
                </li>
            </NavList>
            <SocialMedia>
                <li><Links href=""><FontAwesomeIcon icon={faWhatsapp} size={"lg"} style={{color: "#fdc674",}} /></Links></li>
                <li><Links href=""><FontAwesomeIcon icon={faFacebook} size={"lg"} style={{color: "#fdc674",}} /></Links></li>
                <li><Links href=""><FontAwesomeIcon icon={faTwitter}  size={"lg"} style={{color: "#fdc674",}} /></Links></li>
                <li><Links href=""><FontAwesomeIcon icon={faEnvelope} size={"lg"} style={{color: "#fdc674",}} /></Links></li>
            </SocialMedia>
            <CopyRight>Copyright &copy; 2023 <Links href="">CardClubb</Links> All Rights Reserved</CopyRight>
        </Nav>
    );
};

export default Footer;

const NavList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    li{
        padding:0 5px;
    }
    li:nth-child(n+1):nth-child(-n+4){
        border-right: 3px solid #FDC674;
    }
`;
const Links = styled.a`
    color: #D8C7B6;
    font-size: 1rem;
`;

const Nav = styled.nav`
    padding: 0 20px;
    width:100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #282828;
`;

const SocialMedia = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap:20px;
    
`
const CopyRight = styled.div`
    color: #FFF;
    a{
        color:#fdc674;
    }
`