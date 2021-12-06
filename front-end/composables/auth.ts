import { useState } from '#app'

export const useAuth = () => {
  const authState = useState('auth', () => null)
  const setAuthState = (newState :any) => {
    authState.value = newState;
  };

  const userState = useState('user', () => null)
  const setUserState = (newState :any) => {
    userState.value = newState;
  };
  
  return {authState, setAuthState, userState, setUserState};
}