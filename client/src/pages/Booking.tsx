import { useQuery } from "react-query";
import { fetchCurrentUser, fetchHotelById } from "../api";
import Layout from "../layouts/Layout";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";

function Booking() {
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNight, setNumberOfNight] = useState<number>(0);
  useEffect(() => {
    if (search?.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkOut.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNight(Math.ceil(nights));
    }
  }, [search?.checkIn, search?.checkOut]);
  const { data: hotel } = useQuery("fetchHotelById", () =>
    fetchHotelById(hotelId as string)
  );
  const { data: currentUSer } = useQuery("fetchCurrentUser", fetchCurrentUser);
  console.log(currentUSer?.email);
  return (
    <Layout>
      <div className="grid md:grid-cols-[1fr_2fr] gap-5">
        <BookingDetailsSummary
          checkIn={search?.checkIn}
          checkOut={search?.checkOut}
          adultCount={search?.adultCount}
          childCount={search?.childCount}
          numberOfNights={numberOfNight}
          hotel={hotel}
        />
        {currentUSer && <BookingForm currentUser={currentUSer} />}
      </div>
    </Layout>
  );
}

export default Booking;
