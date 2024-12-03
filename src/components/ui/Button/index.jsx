import clsx from "clsx";
import styles from "./styles.module.css";

export default function Button({
  type = "button",
  onClick = () => {},
  styleType = "primary",
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        styles.buttonMain,
        styleType === "primary" && styles.primary,
        styleType === "danger" && styles.danger
      )}
    >
      {children}
    </button>
  );
}
