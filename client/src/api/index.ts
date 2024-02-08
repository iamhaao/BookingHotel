import axios from "axios";
import { RegisterFormData } from "../pages/SignUp";
import { SignInFormData } from "../pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/users/signup`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data);
  }
};
export const signIn = async (formData: SignInFormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/signin`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error(response.data);
  }
};
export const validateToken = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/auth/validate-token`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Token invalid");
  }
  return response.data;
};

export const signOut = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/signout`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error(response.data);
  }
};
