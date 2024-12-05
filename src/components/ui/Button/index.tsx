import clsx from "clsx";
import styles from "./styles.module.css";

type Props = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  styleType?: "primary" | "danger";
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  type = "button",
  onClick = () => {},
  styleType = "primary",
  className = "",
  children,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
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
