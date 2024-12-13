import clsx from "clsx";
import styles from "./styles.module.css";
import { memo } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  styleType?: "primary" | "danger";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

function Button({
  type = "button",
  onClick = () => {},
  styleType = "primary",
  className = "",
  disabled = false,
  children,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        styles.buttonMain,
        styleType === "primary" && styles.primary,
        styleType === "danger" && styles.danger,
        className
      )}
    >
      {children}
    </button>
  );
}

export default memo(Button);
