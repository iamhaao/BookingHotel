import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotel from "./pages/MyHotel";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBooking from "./pages/MyBooking";
import Home from "./pages/Home";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        {isLoggedIn && <Route path="/add-hotel" element={<AddHotel />} />}
        {isLoggedIn && <Route path="/my-hotels" element={<MyHotel />} />}
        {isLoggedIn && (
          <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
        )}
        {isLoggedIn && (
          <Route path="/hotel/:hotelId/booking" element={<Booking />} />
        )}
        {isLoggedIn && <Route path="/my-bookings" element={<MyBooking />} />}
        <Route path="/hotel/:hotelId" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
