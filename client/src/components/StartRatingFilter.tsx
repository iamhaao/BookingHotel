import React from "react";

type Props = {
  selectedStarts: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function StartRatingFilter({ selectedStarts, onChange }: Props) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label key={star} className="flex items-center space-x-2">
          <input
            className="rounded"
            type="checkbox"
            value={star}
            checked={selectedStarts.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
}

export default StartRatingFilter;
