import React from "react";

const AuthInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  autoComplete,
  icon: Icon,
  rightElement,
  required = true,
}) => {
  return (
    <div className="mb-5 animate-fadeIn">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#2A2A22] mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9A7C] pointer-events-none"
          />
        )}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full h-12 rounded-2xl bg-[#FDFBF5] border transition-all duration-200 outline-none
            ${Icon ? "pl-11" : "pl-4"} ${rightElement ? "pr-11" : "pr-4"}
            text-[#2A2A22] placeholder:text-[#A6A695]
            ${
              error
                ? "border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/20"
                : "border-[#E5E0D3] focus:border-[#3B5D45] focus:ring-2 focus:ring-[#9CAF88]/30"
            }
          `}
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-sm text-[#C0392B] flex items-center gap-1 animate-fadeIn"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthInput;