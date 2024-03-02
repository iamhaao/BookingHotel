import { useQuery } from "react-query";
import Layout from "../layouts/Layout";
import { fetchMyBookings } from "../api";

function MyBooking() {
  const { data: hotels } = useQuery("fetchMyBookings", fetchMyBookings);
  if (!hotels || hotels.length === 0) {
    return (
      <Layout>
        <div>No Bookings Found</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="space-y-5">
        <h1 className="text-xl font-bold">My Bookings</h1>
        {hotels.map((hotel) => (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
            <div className="lg:w-full lg:g-[250px]">
              <img
                src={hotel.imageUrls[0]}
                alt={hotel.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
              <div className="text-xl font-bold">
                {hotel.name}
                <div className="text-sm font-normal">
                  {hotel.city}, {hotel.country}
                </div>
              </div>
              {hotel.bookings.map((booking) => (
                <div>
                  <div>
                    <span className="font-bold mr-2">Dates:</span>
                    <span>
                      {new Date(booking.checkIn).toDateString()}-
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-2">Guest:</span>
                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default MyBooking;
