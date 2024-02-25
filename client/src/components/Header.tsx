import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOut from "./SignOut";

function Header() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">TetsHolidays.com</Link>
        </span>
        <span className="flex space-x-2 gap-5">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold  hover:bg-blue-500"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold  hover:bg-blue-500"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOut />
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="flex items-center mx-4 bg-white text-blue-600 px-3 font-bold hover:bg-gray-300"
              >
                Sign In
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
