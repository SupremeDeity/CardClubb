import AddCategory from "../components/addcategory"
import Footer from "../components/footer"
import NavBar from "../components/navbar"
import Users from "../components/users"
import AddCards from "../components/addcards"
const AdminDashboard = () => {
  return (
    <>
        <NavBar />
        <Users />
        <AddCategory />
        <AddCards />
        <Footer />
    </>    
  )
}

export default AdminDashboard