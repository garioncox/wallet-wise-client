import React from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "react-hot-toast";

export const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex h-full w-full bg-stone-100 justify-center items-center">
        {props.children}
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

// https://www.freepik.com/free-vector/checklist-budget-plan-clipboard-landing-page-template_21523796.htm
