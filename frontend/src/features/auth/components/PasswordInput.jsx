import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import AuthInput from "./AuthInput";

const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  autoComplete = "current-password",
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <AuthInput
      id={id}
      label={label}
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      autoComplete={autoComplete}
      icon={Lock}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="text-[#8B9A7C] hover:text-[#3B5D45] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#9CAF88]/40 rounded-full p-1"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
};

export default PasswordInput;