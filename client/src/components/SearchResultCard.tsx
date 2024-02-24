import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../models";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

function SearchResultCard({ hotel }: Props) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.startRating }).map((_, index) => (
                <AiFillStar className="fill-yellow-400" key={index} />
              ))}
            </span>
            <span className="text-sm ml-1">{hotel.type}</span>
          </div>
          <h2 className="text-2xl font-bold cursor-pointer">{hotel.name}</h2>
        </div>
        <div>
          {" "}
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div className="grid grid-cols-2 items-end whitespace-normal">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            <span className="text-sm whitespace-nowrap">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-semibold">
              $ {hotel.pricePerNight} per night
            </span>
            <Link
              to={`/hotel/${hotel._id}`}
              className="bg-blue-600 text-white h-full p-2 font-semibold rounded-lg text-sm max-w-fit"
            >
              view more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;
