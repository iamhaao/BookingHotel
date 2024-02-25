type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};
function PriceFilter({ selectedPrice, onChange }: Props) {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2"> Max Price</h4>
      <select
        className="border p-2 border-slate-300 text-sm font-semibold rounded-lg w-full"
        name="maxPrice"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (
          <option className=" hover:bg-orange-600" value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PriceFilter;
