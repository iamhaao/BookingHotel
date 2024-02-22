import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../models";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  startRating: number;
  facilities: string[];
  imageUrls: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};
type Props = {
  onSave: (formData: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
};

function ManageHotelForm({ onSave, isLoading, hotel }: Props) {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formHotelData = new FormData();
    if (hotel) {
      formHotelData.append("hotelId", hotel._id);
    }
    formHotelData.append("name", formDataJson.name);
    formHotelData.append("city", formDataJson.city);
    formHotelData.append("country", formDataJson.country);
    formHotelData.append("description", formDataJson.description);
    formHotelData.append("type", formDataJson.type);
    formHotelData.append(
      "pricePerNight",
      formDataJson.pricePerNight.toString()
    );
    formHotelData.append("startRating", formDataJson.startRating.toString());
    formHotelData.append("adultCount", formDataJson.adultCount.toString());
    formHotelData.append("childCount", formDataJson.childCount.toString());
    formDataJson.facilities.forEach((facility, index) => {
      formHotelData.append(`facilities[${index}]`, facility);
    });
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formHotelData.append(`imageUrls[${index}]`, url);
      });
    }
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formHotelData.append("imageFiles", imageFile);
    });
    onSave(formHotelData);
  });
  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-10 mx-40"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 rounded-lg text-white p-2 font-bold hover:bg-blue-400 text-sm disabled:bg-gray-500"
          >
            {isLoading ? "Loading" : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
