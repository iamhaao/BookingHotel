import { Link } from "react-router-dom";
import { HotelType } from "../models";

type Props = {
  hotel: HotelType;
};
function LastestDestinationCard({ hotel }: Props) {
  return (
    <Link
      to={`/hotel/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-lg"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-xl">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
}

export default LastestDestinationCard;
