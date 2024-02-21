import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name Hotel
        <input
          {...register("name", {
            required: "Firstname is required",
          })}
          className="border rounded-lg w-full py-1 px-2 font-normal"
        />
        {errors.name && (
          <span className="text-red-500 font-normal mx-1">
            {errors.name.message}
          </span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            {...register("country", {
              required: "Firstname is required",
            })}
            className="border rounded-lg w-full py-1 px-2 font-normal"
          />
          {errors.country && (
            <span className="text-red-500 font-normal mx-1">
              {errors.country.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            {...register("city", {
              required: "Firstname is required",
            })}
            className="border rounded-lg w-full py-1 px-2 font-normal"
          />
          {errors.city && (
            <span className="text-red-500 font-normal mx-1">
              {errors.city.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          {...register("description", {
            required: "Firstname is required",
          })}
          className="border rounded-lg w-full py-1 px-2 font-normal"
        />
        {errors.description && (
          <span className="text-red-500 font-normal mx-1">
            {errors.description.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          {...register("pricePerNight", {
            required: "Firstname is required",
          })}
          className="border rounded-lg w-full py-1 px-2 font-normal"
        />
        {errors.pricePerNight && (
          <span className="text-red-500 font-normal mx-1">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Start Rating
        <select
          className="w-full border rounded p-2 text-gray-700 font-normal "
          {...register("startRating")}
        >
          <option value="" className="text-sm  ">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option value={rating}>{rating}</option>
          ))}
        </select>
        {errors.startRating && (
          <span className="text-red-500 font-normal mx-1">
            {errors.startRating.message}
          </span>
        )}
      </label>
    </div>
  );
}

export default DetailsSection;
