import clsx from "clsx";
import styles from "./styles.module.css";

type Props = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  styleType?: "primary" | "danger";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function Button({
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
