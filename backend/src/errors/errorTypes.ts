import { statusCodeMap } from "./errorConstants";

export type ErrorCodeType = (typeof statusCodeMap)[keyof typeof statusCodeMap];
