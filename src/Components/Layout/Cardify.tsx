import { ReactNode } from "react";

export const Cardify = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-xl p-20 border-stone-300 border-2 bg-stone-200 shadow shadow-stone-500">
      {children}
    </div>
  );
};
