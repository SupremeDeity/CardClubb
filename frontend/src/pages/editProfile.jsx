import NavBar from "../components/navbar";
import Footer from "../components/footer";
import PasswordChange from "../components/passwordchange";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Updateprofile from "../components/updateprofile";

const EditProfile = () => {

    return (
        <>
            <NavBar />
            <Updateprofile />
            <PasswordChange />
            <Footer />
            <ToastContainer />
        </>
    );
};

export default EditProfile;

