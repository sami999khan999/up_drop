import { signInSchema } from "@/zod/signInSchema";
import { signUpSchema } from "@/zod/signUpSchema";
import z from "zod";

export type SignInSchemaType = z.infer<typeof signInSchema>;

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export type SignInAuthFielsType = keyof typeof signInSchema.shape;
export type SignUpAuthFielsType = keyof typeof signUpSchema.shape;

export type SignInConstantsType = {
  [key in SignInAuthFielsType]: {
    field: SignInAuthFielsType;
    placeholder: string;
    style?: string;
  };
};

export type SignUpConstantsType = {
  [key in SignUpAuthFielsType]: {
    field: SignUpAuthFielsType;
    placeholder: string;
    style?: string;
  };
};
