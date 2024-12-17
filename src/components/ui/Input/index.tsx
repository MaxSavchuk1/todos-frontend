import { InputEvent } from "@/helpers/types";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { memo, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

type Props = {
  id?: string;
  name: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
};

function Input({ name, type, placeholder = "", id, disabled = false }: Props) {
  const [currentType, setCurrentType] = useState(type);
  const { setFieldValue } = useFormikContext<Record<string, string>>();
  const onChange = (e: InputEvent) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <>
      <div className="relative pb-4">
        <Field
          id={id}
          name={name}
          type={currentType}
          placeholder={placeholder}
          className="text-input"
          onChange={onChange}
          disabled={disabled}
        />
        <ErrorMessage
          name={name}
          component="div"
          className="field-error absolute bottom-0"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setCurrentType(currentType === "password" ? "text" : "password")
            }
            className="absolute right-3 top-2.5"
          >
            {currentType === "text" && (
              <EyeSlashIcon aria-hidden="true" className="w-5 h-5" />
            )}
            {currentType === "password" && (
              <EyeIcon aria-hidden="true" className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </>
  );
}

export default memo(Input);
