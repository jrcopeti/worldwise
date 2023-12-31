import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";

function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}

export { useForm };
