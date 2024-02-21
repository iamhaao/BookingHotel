import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => {
          return (
            <label className="text-sm flex gap-1">
              <input
                {...register("facilities", {
                  validate: (facilities) => {
                    if (facilities && facilities.length > 0) {
                      return true;
                    } else {
                      return "At least one facility is required";
                    }
                  },
                })}
                type="checkbox"
                value={facility}
              />
              {facility}
            </label>
          );
        })}
      </div>
      {errors.facilities && (
        <span className="text-sm font-normal text-red-500">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}

export default FacilitiesSection;
