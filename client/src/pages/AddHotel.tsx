import Layout from "../layouts/Layout";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useMutation } from "react-query";
import { addMyHotel } from "../api/index";
import Toast from "../components/Toast";
function AddHotel() {
  const { mutate, isLoading } = useMutation(addMyHotel, {
    onSuccess: () => {
      Toast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      Toast({ message: "Error Saving Hotel", type: "ERROR" });
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
