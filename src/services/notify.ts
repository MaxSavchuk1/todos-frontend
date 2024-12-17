import { enqueueSnackbar } from "notistack";

type Variant = "success" | "error" | "warning" | "info" | "default";

export default function notify(message: string, variant: Variant = "default") {
  return enqueueSnackbar(message, {
    variant,
    anchorOrigin: { vertical: "top", horizontal: "right" },
  });
}
