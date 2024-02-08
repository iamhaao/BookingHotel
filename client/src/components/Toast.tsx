import { toast } from "react-toastify";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
};
function Toast({ message, type }: ToastProps) {
  switch (type) {
    case "SUCCESS":
      toast.success(message);
      break;
    case "ERROR":
      toast.error(message);
      break;
    default:
      break;
  }
}

export default Toast;
