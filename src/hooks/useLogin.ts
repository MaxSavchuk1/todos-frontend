import { LoginRequest } from "@/helpers/types";
import { useLoginMutation } from "@/services/api/modules/auth";
import { useAppDispatch } from "@/store";
import { setTokens } from "@/store/auth.slice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginRequest = async (values: LoginRequest) => {
    try {
      const result = await login(values).unwrap();
      dispatch(setTokens(result));
      navigate("/");
    } catch (e) {
      console.error("Login error", e);
    }
  };

  return { loginRequest };
};

export default useLogin;
