export const validateEmail = (email) => {
  if (!email.trim()) return "Please enter your email address";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Please enter your password";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
};

export const validateName = (name) => {
  if (!name.trim()) return "Please enter your name";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return "";
};