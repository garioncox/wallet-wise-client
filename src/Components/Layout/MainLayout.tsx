import React from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "react-hot-toast";
import axios from "axios";

export const MainLayout = (props: { children: React.ReactNode }) => {
  axios.defaults.baseURL = import.meta.env.DEV
    ? "http://localhost:5046"
    : import.meta.env.VITE_DB_ADDR;

    console.log("here: env is...")
  console.log(
    import.meta.env.DEV ? "http://localhost:5046" : import.meta.env.VITE_DB_ADDR
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex grow w-full bg-stone-100 justify-center items-center">
        {props.children}
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};
