import React, { useState } from "react";
import { Mail, User, Globe2 } from "lucide-react";
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

const TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Europe/London",
  "Europe/Paris",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Australia/Sydney",
  "UTC",
];

const Register = () => {
  const navigate = useNavigate();

  const detectedTimezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    timezone: detectedTimezone,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { handleRegister } = useAuth();

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    validateField(field);
  };

  const validateField = (field) => {
    let error = "";

    if (field === "name") {
      error = validateName(form.name);
    }

    if (field === "email") {
      error = validateEmail(form.email);
    }

    if (field === "password") {
      error = validatePassword(form.password);
    }

    if (field === "timezone" && !form.timezone) {
      error = "Please select your timezone";
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    return error;
  };

  const validateAll = () => {
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const timezoneError = !form.timezone
      ? "Please select your timezone"
      : "";

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      timezone: timezoneError,
    });

    setTouched({
      name: true,
      email: true,
      password: true,
      timezone: true,
    });

    return (
      !nameError &&
      !emailError &&
      !passwordError &&
      !timezoneError
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateAll()) return;

    setLoading(true);

    try {
      await handleRegister(form);
      navigate("/login");
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
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

        {/* Timezone */}
        <div className="mb-5">
          <label
            htmlFor="timezone"
            className="block text-sm font-medium text-[#1F3529] mb-2"
          >
            Timezone
          </label>

          <div className="relative">
            <Globe2
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B5E]"
            />

            <select
              id="timezone"
              value={form.timezone}
              onChange={handleChange("timezone")}
              onBlur={handleBlur("timezone")}
              className={`w-full appearance-none pl-10 pr-4 py-3 rounded-xl border bg-white text-sm text-[#1F3529] outline-none transition-colors ${
                touched.timezone && errors.timezone
                  ? "border-[#C0392B]"
                  : "border-[#D8D8CC] focus:border-[#2F4A3D]"
              }`}
            >
              {!TIMEZONES.includes(form.timezone) && (
                <option value={form.timezone}>
                  {form.timezone}
                </option>
              )}

              {TIMEZONES.map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
          </div>

          {touched.timezone && errors.timezone && (
            <p className="mt-1.5 text-xs text-[#C0392B]">
              {errors.timezone}
            </p>
          )}

          <p className="mt-1.5 text-xs text-[#6B6B5E]">
            Used to determine your local habit days and streaks.
          </p>
        </div>

        <div className="mb-2" />

        <AuthButton
          loading={loading}
          loadingText="Creating account..."
        >
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