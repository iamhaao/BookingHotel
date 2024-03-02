/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../server/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { createBooking } from "../../api";
import Toast from "../../components/Toast";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  hotelId: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  paymentIntentId: string;
  totalCost: number;
};
function BookingForm({ currentUser, paymentIntent }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const { mutate: bookRoom, isLoading } = useMutation(createBooking, {
    onSuccess: () => {
      Toast({ message: "Booking Saved!", type: "SUCCESS" });
    },
    onError: () => {
      Toast({ message: "Error saving booking!", type: "ERROR" });
    },
  });
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search?.adultCount,
      childCount: search?.childCount,
      checkIn: search?.checkIn.toISOString(),
      checkOut: search?.checkOut.toISOString(),
      hotelId: hotelId,
      paymentIntentId: paymentIntent.paymentIntent,
      totalCost: paymentIntent.totalCost,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    // if (!stripe) {
    //   return;
    // }
    // const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
    //   payment_method: {
    //     card: elements?.getElement(CardElement) as StripeCardElement,
    //   },
    // });
    // if (result.paymentIntent?.status === "succeeded") {
    //   //book the room success
    //   bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    // }
    bookRoom({ ...formData });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 font-normal  bg-gray-100"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 font-normal  bg-gray-100"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 font-normal  bg-gray-100"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-sm">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white rounded-md p-2 font-bold hover:bg-blue-400 text-md disabled:bg-blue-400"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
