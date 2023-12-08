import Footer from "../components/footer";
import NavBar from "../components/navbar";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWhatsapp,
    faTwitter,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const Contact = () => {
    return (
        <>
            <NavBar />
            <TextSection>
                <div>Chat with our team!</div>
                <div>
                    If you need help with a design, have a question about your
                    account, or want to talk business, you&apos;re in the right
                    place.
                </div>
            </TextSection>
            <MainSection>
                <Info>
                    <InfoLabel>Contact Us info!</InfoLabel>
                    <div>
                        <FontAwesomeIcon
                                    icon={faEnvelope}
                                    size={"lg"}
                                />
                        {"  "}info@cardclubb.com
                    </div>
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
                    </SocialMedia>
                </Info>
                <Form>
                    <Label>What can we help with?</Label>
                    <Input
                        type="text"
                        placeholder="Enter Name"
                        required
                    ></Input>
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        required
                    ></Input>
                    <TextArea rows={10}></TextArea>
                    <Button>Send</Button>
                </Form>
            </MainSection>
            <Footer />
        </>
    );
};

export default Contact;

const TextSection = styled.div`
    padding: 10px 0;
    color: #fff;
    display: flex;
    height: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background: linear-gradient(180deg, #af4b2f 45%, #282828 100%);
`;

const MainSection = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 600px;
`;
const Info = styled.div`
    height: 100%;
    width: 50%;
    color: #000000;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`;

const Form = styled.form`
    height: 100%;
    width: 50%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
`;

const Input = styled.input`
    padding-left: 10px;
    width: 70%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #69727d;
    background: #fff;
`;
const Label = styled.div`
    color: #000;
    font-size: 3rem;
`;

const Button = styled.button`
    cursor: pointer;
    color: #fff;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 10px;
    background: #af4b2f;
    width: 70%;
`;

const TextArea = styled.textarea`
    padding: 10px;
    width: 70%;
    border-radius: 5px;
    border: 1px solid #69727d;
    background: #fff;
`;

const SocialMedia = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;
const Links = styled.a`
    display: flex;
    width: 44px;
    height: 44px;
    padding: 11px;
    justify-content: center;
    align-items: center;
    color: #fdc674;
    font-size: 1rem;
    border-radius: 50%;
    background: #af4b2f;
`;

const InfoLabel = styled.div`
    padding-top: 45px;
    color: #000;
    font-size: 3rem;
`