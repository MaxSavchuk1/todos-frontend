import React from "react";
import { useFormikContext, Field } from "formik";

const Select = ({
  name,
  onChange,
  optionValues = [],
  placeholder = "",
  flex = true,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const defaultOnChange = (e) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <div className={["relative", flex ? "flex-1" : ""].join(" ")}>
      <Field
        as="select"
        name={name}
        className={[!values[name] ? "text-gray" : "", "w-full"].join(" ")}
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
