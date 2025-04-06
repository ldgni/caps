"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group border shadow-lg",
          success: "!bg-[#e8d6c4] !border !border-[#2e160e] !text-[#2e160e]",
          description: "!text-[#2e160e] group-[.sonner-toast]:!text-[#2e160e]",
        },
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "#e8d6c4",
          "--success-border": "#2e160e",
          "--success-text": "#2e160e",
          "--error-bg": "var(--card)",
          "--error-border": "var(--destructive)",
          "--error-text": "var(--card-foreground)",
          "--radius": "var(--radius-lg)",
          // Add additional explicit text color properties for Firefox
          color: "#2e160e",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
