import { Link } from "react-router-dom";
import LoginButton from "../Auth/LoginButton";
import { WalletIcon } from "./WalletIcon";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="bg-christi-500 text-christi-200 lg:hidden">
        <div className="p-7 flex flex-row items-center">
          <div className="w-20 h-20 me-5">
            <WalletIcon />
          </div>
          <div className="flex flex-row items-center font-semibold text-4xl hover:text-christi-100 me-auto">
            Wallet Wise
          </div>
          <div className="h-10 w-10" onClick={() => setIsOpen(!isOpen)}>
            <Bars3Icon />
          </div>
        </div>

        <div className={`w-full block ${isOpen ? "" : "hidden"} flex-grow`}>
          <Link
            to={"/transaction/input"}
            className="ps-5 text-2xl items-center font-semibold hover:text-christi-100"
          >
            Log Entry
          </Link>
          <Link
            to={"/transaction/view"}
            className="flex flex-row ps-5 text-2xl items-center font-semibold hover:text-christi-100 py-3"
          >
            View History
          </Link>
          <div className="flex items-start ms-0 ps-3 pb-5">
            <LoginButton />
          </div>
        </div>
      </div>

      <div className="bg-christi-500 text-christi-200 p-7 flex-grow flex-row shadow-lg text-xl hidden lg:flex">
        <Link to={"/"} className="h-20 w-20 me-5">
          <WalletIcon />
        </Link>
        <Link
          to={"/"}
          className="flex flex-row pe-10 pb-1 items-center font-semibold text-4xl hover:text-christi-100"
        >
          Wallet Wise
        </Link>
        <Link
          to={"/transaction/input"}
          className="flex flex-row text-2xl ps-5 items-center font-semibold hover:text-christi-100"
        >
          Log Entry
        </Link>
        <Link
          to={"/transaction/view"}
          className="flex flex-row text-2xl ps-5 items-center font-semibold hover:text-christi-100"
        >
          View History
        </Link>
        <Link
          to={"/budget/input"}
          className="flex flex-row text-2xl ps-5 items-center font-semibold hover:text-christi-100"
        >
          Budget Input
        </Link>
        <div className="flex ms-auto me-5">
          <LoginButton />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-christi-500 text-christi-200 p-7 flex flex-grow flex-row shadow-lg text-xl">
      <Link to={"/"} className="h-20 w-20 me-5">
        <WalletIcon />
      </Link>
      <Link
        to={"/"}
        className="flex flex-row pe-10 pb-1 items-center font-semibold text-4xl hover:text-christi-100"
      >
        Wallet Wise
      </Link>
      <Link
        to={"/transaction/input"}
        className="flex flex-row text-2xl px-5 items-center font-semibold hover:text-christi-100"
      >
        Log Entry
      </Link>
      <Link
        to={"/transaction/view"}
        className="flex flex-row text-2xl items-center font-semibold hover:text-christi-100"
      >
        View History
      </Link>
      <LoginButton />
    </div>
  );
};
