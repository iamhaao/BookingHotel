import axios from "axios";
import { RegisterFormData } from "../pages/SignUp";
import { SignInFormData } from "../pages/SignIn";
import { HotelType } from "../models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export interface ApiResponse {
  message: string;
}
export const register = async (formData: RegisterFormData) => {
  try {
    await axios.post(`${API_BASE_URL}/api/users/signup`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
};
export const signIn = async (formData: SignInFormData) => {
  try {
    await axios.post(`${API_BASE_URL}/api/auth/signin`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    return await Promise.reject(error);
  }
};

export const validateToken = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/auth/validate-token`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error);
  }
};

export const signOut = async () => {
  try {
    await axios.post(
      `${API_BASE_URL}/api/auth/signout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    return await Promise.reject(error);
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  try {
    await axios.post(`${API_BASE_URL}/api/my-hotels`, hotelFormData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    return await Promise.reject(error);
  }
};
export const fetchMyHotel = async (): Promise<HotelType[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/my-hotels`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error);
  }
};
