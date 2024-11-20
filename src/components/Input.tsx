import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>; // For Lucide icons
  onIconClick?: () => void;
}

// Reusable Input component
const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  icon: Icon,
  onIconClick,
  ...props
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        {...props}
      />
      {Icon && (
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={onIconClick}
        >
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
      )}
    </div>
  </div>
);
export default Input;
