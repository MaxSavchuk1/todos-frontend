import { InputEvent } from "@/helpers/types";
import { ErrorMessage, Field, useFormikContext } from "formik";

type Props = {
  id?: string;
  name: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function Input({
  name,
  type,
  placeholder = "",
  id,
  disabled = false,
}: Props) {
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
          type={type}
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
      </div>
    </>
  );
}
