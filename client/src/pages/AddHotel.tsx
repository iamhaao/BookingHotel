import Layout from "../layouts/Layout";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useMutation } from "react-query";
import { ApiResponse, addMyHotel } from "../api/index";
import Toast from "../components/Toast";
import { AxiosError } from "axios";
function AddHotel() {
  const { mutate, isLoading } = useMutation(addMyHotel, {
    onSuccess: () => {
      Toast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const errorMessage = (error.response?.data?.message ||
        "An error occurred") as string;

      Toast({ message: errorMessage, type: "ERROR" });
    },
  });

  const handleSave = (hotelForm: FormData) => {
    mutate(hotelForm);
  };
  return (
    <Layout>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </Layout>
  );
}

export default AddHotel;
