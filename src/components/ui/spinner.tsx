import React from "react";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export function Spinner({ size = "medium", className = "" }: SpinnerProps) {
  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-2",
    large: "h-12 w-12 border-3",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-solid border-gray-300 border-t-[#2e160e]`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
