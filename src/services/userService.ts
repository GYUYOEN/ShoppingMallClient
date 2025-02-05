import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export interface SignUpData {
  id: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
}

export const userService = {
  signUp: async (data: SignUpData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/signup`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
        );
      }
      throw error;
    }
  },
};
