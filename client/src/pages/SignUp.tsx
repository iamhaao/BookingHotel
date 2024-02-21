import { useMutation, useQueryClient } from "react-query";
import Layout from "../layouts/Layout";
import { useForm } from "react-hook-form";
import * as apiClient from "../api/index";
import { AxiosError } from "axios";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dob: string;
};

function SignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      Toast({
        message: "Registration success!",
        type: "SUCCESS",
      });
      queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      console.error(error);

      Toast({
        message: error.response?.data
          ? Object.values(error.response?.data)[0]
          : "Something wrong",
        type: "ERROR",
      });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <Layout>
      <form className="flex flex-col gap-5 mx-52" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              {...register("firstName", {
                required: "Firstname is required",
              })}
              className="border rounded-lg w-full py-1 px-2 font-normal"
            />
            {errors.firstName && (
              <span className="text-red-500 font-normal mx-1">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              {...register("lastName", {
                required: "Lastname is required",
              })}
              className="border rounded-lg w-full py-1 px-2 font-normal"
            />
            {errors.lastName && (
              <span className="text-red-500 font-normal mx-1">
                {errors.lastName.message}
              </span>
            )}
          </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            {...register("email", { required: "Email is required" })}
            className="border rounded-lg w-full py-1 px-2 font-normal"
          />
          {errors.email && (
            <span className="text-red-500 font-normal mx-1">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            {...register("password", {
              required: "Lastname is required",
              minLength: {
                value: 6,
                message: "Password must be more than 6 characters",
              },
            })}
            className="border rounded-lg w-full py-1 px-2 font-normal"
          />
          {errors.password && (
            <span className="text-red-500 font-normal mx-1">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
          <input
            type="password"
            {...register("confirmPassword", {
              required: "confirmPassword is required",
              validate: (val) => {
                if (!val) {
                  return "confirmPassword is required";
                } else if (watch("password") != val) {
                  return "Your password do not match!";
                }
              },
            })}
            className="border rounded-lg w-full py-1 px-2 font-normal"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 font-normal mx-1">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Phone number
            <input
              {...register("phone", {
                required: "Phone is required",
              })}
              className="border rounded-lg w-full py-1 px-2 font-normal"
            />
            {errors.phone && (
              <span className="text-red-500 font-normal mx-1">
                {errors.phone.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Birth Day
            <input
              type="date"
              {...register("dob", {
                required: "Birthday is required",
              })}
              className="border rounded-lg w-full py-1 px-2 font-normal"
            />
            {errors.dob && (
              <span className="text-red-500 font-normal mx-1">
                {errors.dob.message}
              </span>
            )}
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 rounded-lg text-white p-2 font-bold hover:bg-blue-400"
          >
            Create Account
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default SignUp;
