import clsx from "clsx";
import styles from "./styles.module.css";

export default function Button({
  type = "button",
  onClick = () => {},
  styleType = "primary",
  className = "",
  children,
}) {
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
