import { useForm } from "react-hook-form";
import Layout from "../layouts/Layout";
import { useMutation, useQueryClient } from "react-query";
import { signIn } from "../api";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export type SignInFormData = {
  email: string;
  password: string;
};
function SignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const mutation = useMutation(signIn, {
    onSuccess: async () => {
      Toast({ message: "Welcome to !", type: "SUCCESS" });
      navigate("/");
      queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
  });
  return (
    <Layout>
      <form className="flex flex-col gap-5 mx-64" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Sign In</h2>
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

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm">
            Do not have accunt?{" "}
            <Link className="underline text-blue-500" to="/signup">
              Create an Account here
            </Link>{" "}
          </span>
          <button
            type="submit"
            className="bg-blue-600 rounded-lg text-white mx-6 p-2 font-bold hover:bg-blue-400"
          >
            Login
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default SignIn;
