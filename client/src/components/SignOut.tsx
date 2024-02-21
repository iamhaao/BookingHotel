import { useMutation, useQueryClient } from "react-query";
import { signOut } from "../api/index";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";
function SignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      Toast({ message: "Signed Out!!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-300"
    >
      Sign out
    </button>
  );
}

export default SignOut;
