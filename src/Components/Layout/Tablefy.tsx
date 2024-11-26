import { ReactNode } from "react";

export const Tablefy = ({
  children,
  header = undefined,
}: {
  children: ReactNode;
  header?: string;
}) => {
  return (
    <div className="flex flex-col grow justify-items-stretch divide-y divide-slate-400">
      {header && <p className="mb-3 text-center font-bold text-xl">{header}</p>}
      {children}
    </div>
  );
};
