import React, { useState } from "react";
import { Mail } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import { validateEmail, validatePassword } from "../utils/validator";

// Replace with your router's Link (react-router-dom shown here)
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");
  const {handleLogin, user, loading, setLoading} = useAuth()

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    let error = "";
    if (field === "email") error = validateEmail(form.email);
    if (field === "password") error = validatePassword(form.password);
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateAll = () => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    setErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });
    return !emailError && !passwordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validateAll()) return;

    setLoading(true);
    try {
      // Replace with your real auth call
      await handleLogin(form)
      if(user && !loading) {
        navigate("/")
      }
    } catch (err) {
      setSubmitError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1F3529] mb-2">
          Welcome back
        </h1>
        <p className="text-[#6B6B5E] text-sm sm:text-base">
          Continue your journey, one habit at a time.
        </p>
      </div>

      {submitError && (
        <div
          role="alert"
          className="mb-5 px-4 py-3 rounded-xl bg-[#FBEAE8] border border-[#E8B4AC] text-[#C0392B] text-sm"
        >
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={touched.email ? errors.email : ""}
          icon={Mail}
          autoComplete="email"
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          error={touched.password ? errors.password : ""}
          autoComplete="current-password"
        />

        <div className="flex justify-end mb-6 -mt-2">
          <Link
            to="/forgot-password"
            className="text-sm text-[#3B5D45] hover:text-[#2F4A3D] font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton loading={loading} loadingText="Logging in...">
          Log in
        </AuthButton>
      </form>

      <p className="text-center text-sm text-[#6B6B5E] mt-8">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-[#2F4A3D] font-semibold hover:text-[#1F3529] transition-colors"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
