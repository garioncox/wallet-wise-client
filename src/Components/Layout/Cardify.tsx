import { ReactNode } from "react";

export const Cardify = ({
  children,
  clickable = false,
  onClick = () => {},
}: {
  children: ReactNode;
  clickable?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`rounded-xl p-5 lg:p-20 m-5 border-stone-300 border-2 bg-stone-200 shadow shadow-stone-500 ${
        clickable ? "hover:bg-stone-300 cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
