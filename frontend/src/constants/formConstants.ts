import { SignInConstantsType, SignUpConstantsType } from "@/types/auth.types";

export const loginFormConstants: SignInConstantsType = {
  identifier: {
    field: "identifier",
    placeholder: "Email or username",
  },
  password: {
    field: "password",
    placeholder: "Password",
  },
};

export const registerFormConstants: SignUpConstantsType = {
  email: {
    field: "email",
    placeholder: "Email or username",
  },
  password: {
    field: "password",
    placeholder: "Password",
  },
  confirmPassword: {
    field: "confirmPassword",
    placeholder: "Confirm Password",
  },
};
