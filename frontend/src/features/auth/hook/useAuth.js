import { useContext } from "react";
import { getCurrentUser, login, register } from "../services/auth.api";
import { AuthContext } from "../context/AuthProvider";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleRegister = async ({ name, email, password, timezone }) => {
    const data = await register({ name, email, password, timezone });
    setUser(data.user);
  };

  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });
    setUser(data.user);
  };

  const handleGetCurrentUser = async () => {
    try {
      setLoading(true);
      const data = await getCurrentUser();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    user,
    loading,
    setLoading,
    handleRegister,
    handleLogin,
    handleGetCurrentUser
  };
};
