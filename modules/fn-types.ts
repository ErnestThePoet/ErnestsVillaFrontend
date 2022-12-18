import { FormSubmitResult } from "./types";

export type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;
export type SetLoadingFn = SetStateFn<boolean>;
export type SetFormSubmitResultFn = SetStateFn<FormSubmitResult>;
