import React from "react";
import { Navbar } from "./Navbar";

export const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="bg-stone-50 h-screen">
      <Navbar />
      <div className="p-5">{props.children}</div>;
    </div>
  );
};
