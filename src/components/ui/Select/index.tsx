import { useFormikContext, Field } from "formik";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import type { InputEvent } from "@/helpers/types";
import styles from "./styles.module.css";

type Props = {
  name: string;
  onChange?: (e: InputEvent) => void;
  optionValues: string[];
  placeholder?: string;
  className?: string;
};

const Select = ({
  name,
  onChange,
  optionValues = [],
  placeholder = "",
  className = "",
}: Props) => {
  const { values, setFieldValue } = useFormikContext<Record<string, string>>();
  const defaultOnChange = (e: InputEvent) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <div className={clsx(styles.container, className)}>
      <Field
        as="select"
        name={name}
        className={clsx(!values[name] && "text-gray", styles.select)}
        onChange={onChange || defaultOnChange}
      >
        <option disabled hidden value="">
          {placeholder}
        </option>
        {optionValues.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </Field>
      <ChevronDownIcon aria-hidden="true" className={styles.selectIcon} />
    </div>
  );
};

export default Select;
