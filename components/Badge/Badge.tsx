import React from "react";
import colorContrast from "color-contrast";

interface BadgeProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  variant?: "Active" | "Inactive";
}

const Badge: React.FC<BadgeProps> = ({
  text,
  backgroundColor = "#007bff",
  textColor,
  variant,
}) => {
  const activeColors = {
    background: "#e6fcf5",
    text: "#099268",
  };

  const inactiveColors = {
    background: "#f8f9fa",
    text: "#343a40",
  };

  let computedBackgroundColor = backgroundColor;
  let computedTextColor = textColor;

  if (variant === "Active") {
    computedBackgroundColor = activeColors.background;
    computedTextColor = activeColors.text;
  } else if (variant === "Inactive") {
    computedBackgroundColor = inactiveColors.background;
    computedTextColor = inactiveColors.text;
  }

  const finalTextColor =
    computedTextColor ||
    (colorContrast(computedBackgroundColor, "#ffffff") >= 4.5
      ? "#000000"
      : "#ffffff");

  return (
    <span
      style={{
        backgroundColor: computedBackgroundColor,
        color: finalTextColor,
      }}
      className="inline-block py-1 px-3 rounded-sm font-semibold text-sm"
    >
      {text}
    </span>
  );
};

export default Badge;
