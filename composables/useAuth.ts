import { useState } from "#app";

export const useAuth = () => {
  const authState = useState("auth", () => {
    try {
      return JSON.parse(localStorage.getItem("nuxt3_auth") || "");
    } catch (error) {
      return null;
    }
  });
  const setAuthState = (newState: any) => {
    authState.value = newState;
  };

  const userState = useState("user", () => {
    try {
      return JSON.parse(localStorage.getItem("nuxt3_user") || "");
    } catch (error) {
      return null;
    }
  });
  const setUserState = (newState: any) => {
    userState.value = newState;
  };

  return { authState, setAuthState, userState, setUserState };
};
