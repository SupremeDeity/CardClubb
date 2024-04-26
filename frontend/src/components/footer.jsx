import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  const navigate = useNavigate();
  const handleCategory = (e) => {
    const categoryData = e.target.innerText;
    const parameter = categoryData.replace(/ /g, "-");
    navigate(`/cards/${parameter}`);
  };
  return (
    <Nav>
      <NavList>
        <li>
          <Links as={Link} to="/home">
            Home
          </Links>
        </li>
        <li>
          <Links onClick={handleCategory} style={{ cursor: "pointer" }}>
            Happy Birthday
          </Links>
        </li>
        <li>
          <Links onClick={handleCategory} style={{ cursor: "pointer" }}>
            Thank You
          </Links>
        </li>
        <li>
          <Links as={Link} to="/contact">
            Contact Us
          </Links>
        </li>
      </NavList>
      <SocialMedia>
        <li>
          <Links href="">
            <FontAwesomeIcon
              icon={faWhatsapp}
              size={"lg"}
              style={{ color: "#fdc674" }}
            />
          </Links>
        </li>
        <li>
          <Links href="">
            <FontAwesomeIcon
              icon={faFacebook}
              size={"lg"}
              style={{ color: "#fdc674" }}
            />
          </Links>
        </li>
        <li>
          <Links href="">
            <FontAwesomeIcon
              icon={faTwitter}
              size={"lg"}
              style={{ color: "#fdc674" }}
            />
          </Links>
        </li>
        <li>
          <Links href="">
            <FontAwesomeIcon
              icon={faEnvelope}
              size={"lg"}
              style={{ color: "#fdc674" }}
            />
          </Links>
        </li>
      </SocialMedia>
      <CopyRight>
        Copyright &copy; 2023 <Links href="">CardClubb</Links> All Rights
        Reserved
      </CopyRight>
    </Nav>
  );
};

export default Footer;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    padding: 0 5px;
  }
  li:nth-child(n + 1):nth-child(-n + 3) {
    border-right: 3px solid #fdc674;
  }
  @media (max-width: 980px) {
    li {
      padding: 0 16px;
    }
  }
`;
const Links = styled.a`
  color: #d8c7b6;
  font-size: 1rem;
`;

const Nav = styled.nav`
  padding: 10px 20px;
  width: 100%;
  min-height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #282828;
  @media (max-width: 980px) {
    gap: 1.5rem;
    flex-direction: column;
  }
`;

const SocialMedia = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const CopyRight = styled.div`
  color: #fff;
  a {
    color: #fdc674;
  }
`;
