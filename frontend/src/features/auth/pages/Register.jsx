import React, { useState } from "react";
import { Mail, User } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/validator";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { handleRegister } = useAuth();

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
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
    if (field === "name") error = validateName(form.name);
    if (field === "email") error = validateEmail(form.email);
    if (field === "password") error = validatePassword(form.password);
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateAll = () => {
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });
    setTouched({
      name: true,
      email: true,
      password: true,
    });
    return !nameError && !emailError && !passwordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validateAll()) return;

    setLoading(true);
    try {
      // Replace with your real registration call
      await handleRegister(form);
      navigate("/login");
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1F3529] mb-2">
          Create your account
        </h1>
        <p className="text-[#6B6B5E] text-sm sm:text-base">
          Start building better habits today.
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
          id="name"
          label="Full name"
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          error={touched.name ? errors.name : ""}
          icon={User}
          autoComplete="name"
        />

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
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          error={touched.password ? errors.password : ""}
          autoComplete="new-password"
        />

        <div className="mb-2" />

        <AuthButton loading={loading} loadingText="Creating account...">
          Create account
        </AuthButton>
      </form>

      <p className="text-center text-sm text-[#6B6B5E] mt-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#2F4A3D] font-semibold hover:text-[#1F3529] transition-colors"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
