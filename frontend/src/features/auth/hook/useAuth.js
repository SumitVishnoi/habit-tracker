import { useCallback, useContext } from "react";
import { getCurrentUser, login, register } from "../services/auth.api";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleRegister = async ({ name, email, password, timezone }) => {
    const data = await register({ name, email, password, timezone });
    setUser(data.user);
    return data.user
  };

  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });
    setUser(data.user);
    return data.user
  };

  const handleGetCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCurrentUser();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser]);
  return {
    user,
    loading,
    setLoading,
    handleRegister,
    handleLogin,
    handleGetCurrentUser
  };
};
