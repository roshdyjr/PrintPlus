import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const refreshAccessToken = async (
  accessToken: string,
  refreshToken: string
) => {
  console.log("refreshAccessToken: Function started");
  console.log("refreshAccessToken: Refresh token received", refreshToken);
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
      token: accessToken,
      refreshToken: refreshToken,
    });

    console.log("refreshAccessToken: API response received", response.data);

    const { success, data } = response.data;

    if (!success || !data.token || !data.refreshToken) {
      console.error("refreshAccessToken: Invalid response from API");
      throw new Error("Failed to refresh token");
    }

    console.log("refreshAccessToken: Token refreshed successfully", data);
    return {
      accessToken: data.token,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error("Refresh Token Error:", error);
    throw new Error("Unable to refresh token");
  }
};