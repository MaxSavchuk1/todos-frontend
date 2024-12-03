import { shallowEqual, useSelector } from "react-redux";

const useCustomSelector = (selector) => {
  return useSelector(selector, shallowEqual);
};

export default useCustomSelector;
