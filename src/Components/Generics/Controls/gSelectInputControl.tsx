import { useEffect, useState } from "react";

export interface GSelectInputController {
  value: string;
  setValue: (v: string) => void;
  possibleValues: string[];
  setPossibleValues: (v: string[]) => void;
  selectedValues: string[];
  setSelectedValues: (v: string[]) => void;
  defaultValue?: string;
  hasBeenTouched: boolean;
  setHasBeenTouched: (b: boolean) => void;
  error: string;
}

export const useGSelectInput = (
  possibleValuesInput: string[] = [],
  getErrorMessage: (value: string) => string,
  defaultValue?: string
) => {
  const [possibleValues, setPossibleValues] =
    useState<string[]>(possibleValuesInput);
  const [value, setValue] = useState(defaultValue ?? "");
  const [error, setError] = useState("");
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    setError(getErrorMessage(value));
  }, [getErrorMessage, value]);

  return {
    value,
    setValue,
    possibleValues,
    setPossibleValues,
    selectedValues,
    setSelectedValues,
    hasBeenTouched,
    setHasBeenTouched,
    error,
  };
};
