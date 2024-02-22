import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ApiResponse, fetchHotelById, updateMyHotel } from "../api";
import Layout from "../layouts/Layout";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { AxiosError } from "axios";
import Toast from "../components/Toast";

function EditHotel() {
  const { hotelId } = useParams();
  const queryClient = useQueryClient();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => fetchHotelById(hotelId || ""),
    {
      onError: () => {},
    }
  );

  const { mutate, isLoading } = useMutation(updateMyHotel, {
    onSuccess: () => {
      Toast({ message: "Hotel Updated!", type: "SUCCESS" });
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const errorMessage = (error.response?.data?.message ||
        "An error occurred") as string;

      Toast({ message: errorMessage, type: "ERROR" });
    },
    onSettled: () => {
      // Trigger a re-fetch of the hotel data after the mutation is settled
      queryClient.invalidateQueries("fetchHotelById");
    },
  });

  const handleSave = (hotelData: FormData) => {
    mutate(hotelData);
  };

  return (
    <Layout>
      <ManageHotelForm
        onSave={handleSave}
        hotel={hotel}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default EditHotel;
