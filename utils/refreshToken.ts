import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
      token: refreshToken,
    });

    const { success, data } = response.data;

    if (!success || !data.token || !data.refreshToken) {
      throw new Error("Failed to refresh token");
    }

    return {
      accessToken: data.token,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error("Refresh Token Error:", error);
    throw new Error("Unable to refresh token");
  }
};