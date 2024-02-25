import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "./layouts/Layout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotel from "./pages/MyHotel";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>Home Page</Layout>} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        {isLoggedIn && <Route path="/add-hotel" element={<AddHotel />} />}
        {isLoggedIn && <Route path="/my-hotels" element={<MyHotel />} />}
        {isLoggedIn && (
          <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
        )}
        <Route path="/hotel/:hotelId" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
