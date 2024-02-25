import React from "react";
import { hotelFacilities } from "../config/hotel-options-config";
type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
function FacilitiesFilter({ selectedFacilities, onChange }: Props) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelFacilities.map((facility) => (
        <label key={facility} className="flex items-center space-x-2">
          <input
            className="rounded"
            type="checkbox"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span>{facility} </span>
        </label>
      ))}
    </div>
  );
}

export default FacilitiesFilter;