import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useQuery } from "react-query";
import { fetchMyHotel } from "../api";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

function MyHotel() {
  const { data: hotelData } = useQuery("fetchMyHotels", fetchMyHotel, {
    onError: () => {},
  });
  return (
    <Layout>
      <div className="space-y-5">
        <span className="flex justify-between">
          <span className="text-3xl font-bold">My Hotels</span>
          <Link
            to="/add-hotel"
            className="flex bg-blue-600 border rounded-lg text-white text-sm font-bold p-2 hover:bg-blue-300"
          >
            Add Hotel
          </Link>
        </span>
        {!hotelData ? (
          <span>Not hotels found</span>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {hotelData.map((hotel) => (
              <div
                className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
                key={hotel._id}
              >
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="grid grid-cols-5 gap-2">
                  <div className="border border-slate-300 rounded-sm gap-4 p-3 flex items-center">
                    <BsMap />
                    {hotel.city},{hotel.country}
                  </div>
                  <div className="border border-slate-300 rounded-sm gap-4 p-3 flex items-center">
                    <BsBuilding />
                    {hotel.type}
                  </div>
                  <div className="border border-slate-300 rounded-sm gap-4 p-3 flex items-center">
                    <BiMoney />${hotel.pricePerNight} per night
                  </div>
                  <div className="border border-slate-300 rounded-sm gap-4 p-3 flex items-center">
                    <BiHotel />
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </div>
                  <div className="border border-slate-300 rounded-sm gap-4 p-3 flex items-center">
                    <BiStar />
                    {hotel.startRating} Start Rating
                  </div>
                </div>
                <span className="flex justify-end">
                  <Link
                    className="flex bg-blue-600 border rounded-lg text-white text-sm font-bold p-2 hover:bg-blue-400"
                    to={`/edit-hotel/${hotel._id}`}
                  >
                    View Details
                  </Link>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyHotel;
