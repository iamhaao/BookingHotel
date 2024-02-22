import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "./layouts/Layout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotel from "./pages/MyHotel";
import EditHotel from "./pages/EditHotel";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>Home Page</Layout>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {isLoggedIn && <Route path="/add-hotel" element={<AddHotel />} />}
        {isLoggedIn && <Route path="/my-hotels" element={<MyHotel />} />}
        {isLoggedIn && (
          <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
