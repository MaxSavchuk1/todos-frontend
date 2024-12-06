import { shallowEqual, useSelector } from "react-redux";
import type { AppState } from "@/store";

const useCustomSelector = <T>(selector: (state: AppState) => T) => {
  return useSelector.withTypes<AppState>()(selector, shallowEqual);
};

export default useCustomSelector;
