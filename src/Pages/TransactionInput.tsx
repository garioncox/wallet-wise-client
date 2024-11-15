import { useGTextInput } from "../Components/Generics/Controls/gTextInputControl";
import GTextInput from "../Components/Generics/gTextInput";

export const TransactionInput = () => {
  const textControl = useGTextInput("", (s: string) =>
    s === "" ? "Field is required" : ""
  );

  return <GTextInput control={textControl} />;
};
