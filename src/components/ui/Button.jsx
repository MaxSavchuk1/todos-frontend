import clsx from "clsx";

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
        "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:w-auto",
        styleType === "primary" &&
          "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
        styleType === "danger" && "bg-red-600 text-white hover:bg-red-500"
      )}
    >
      {children}
    </button>
  );
}
