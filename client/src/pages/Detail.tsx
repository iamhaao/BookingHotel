import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchHotel } from "../api";
import { AiFillStar } from "react-icons/ai";
import Layout from "../layouts/Layout";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

function Detail() {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery("fetchHotel", () =>
    fetchHotel(hotelId as string)
  );
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <span className="flex">
            {Array.from({ length: hotel?.startRating || 1 }, (_, index) => (
              <AiFillStar key={index} className="fill-yellow-400" />
            ))}
          </span>
          <h1 className="text-3xl font-bold">{hotel?.name}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {hotel?.imageUrls.map((image, index) => (
            <div key={index} className="h-[300px]">
              <img
                src={image}
                alt={hotel?.name || "Hotel Image"}
                className="rounded-md w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {hotel?.facilities.map((facility) => (
            <div className="border border-slate-300 rounded p-3">
              {facility}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
          <div className="whitespace-pre-line">{hotel?.description}</div>
          <div className="h-fit">
            <GuestInfoForm
              hotelId={hotelId}
              pricePerNigh={hotel?.pricePerNight}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Detail;
