import { memo } from "react";
import clsx from "clsx";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
  type: "info" | "warning";
};

function Alert({ children, type }: Props) {
  return (
    <div className={clsx(styles.container, styles[type])}>
      {type === "info" && <InformationCircleIcon className="w-5" />}
      {type === "warning" && <ExclamationTriangleIcon className="w-5" />}

      <span>{children}</span>
    </div>
  );
}

export default memo(Alert);
