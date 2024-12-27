import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "react-hot-toast";
import axios from "axios";

export const MainLayout = (props: { children: React.ReactNode }) => {
  axios.defaults.baseURL = import.meta.env.DEV
    ? "http://localhost:5046"
    : import.meta.env.VITE_DB_ADDR;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        className={`flex grow w-full bg-stone-100 justify-center items-center transition-opacity duration-500 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {props.children}
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};
