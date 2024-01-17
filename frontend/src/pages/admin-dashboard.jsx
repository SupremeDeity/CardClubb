import AddCategory from "../components/addcategory";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import AddCards from "../components/addcards";
import { useContext } from "react";
import UserContext from "../contexts/usercontext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const usersList = ()=>{
        navigate("/admin/dashboard/users")
    }
    return (
        <>
            {user.isAdmin ? (
                <>
                    <NavBar />
                    <UsersSection>
                        <Title>Users</Title>
                        <Button onClick={usersList}>
                            List of Users
                        </Button>
                    </UsersSection>
                    <AddCategory />
                    <AddCards />
                    <Footer />
                </>
            ) : (
                <div>Not Authorized User</div>
            )}
        </>
    );
};

export default AdminDashboard;

const UsersSection = styled.section`
    width:100%;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Button = styled.button`
    cursor: pointer;
    color: #282828;
    background: #fdc674;
    font-size: 1rem;
    height: 40px;
    border: none;
    border-radius: 4px;
    width: 200px;
`;

const Title = styled.div`
    align-self: flex-start;
    color: #fdc674;
    font-size: 2rem;
    font-weight: 700;
`;