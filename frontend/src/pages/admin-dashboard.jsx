import AddCategory from "../components/addcategory";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import Users from "../components/users";
import AddCards from "../components/addcards";
import { useContext } from "react";
import UserContext from "../contexts/usercontext";
const AdminDashboard = () => {
    const { user } = useContext(UserContext);
    return (
        <>
            {user.isAdmin ? (
                <>
                    <NavBar />
                    <Users />
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
