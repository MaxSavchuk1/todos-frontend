import React from "react";
import { useFormikContext, Field } from "formik";
import styles from "./styles.module.css";
import clsx from "clsx";

const Select = ({ name, onChange, optionValues = [], placeholder = "" }) => {
  const { values, setFieldValue } = useFormikContext();
  const defaultOnChange = (e) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <div className="flex-1">
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
    </div>
  );
};

export default Select;
