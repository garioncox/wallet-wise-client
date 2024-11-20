import { Link } from "react-router-dom";
import LoginButton from "../Auth/LoginButton";
import { WalletIcon } from "./WalletIcon";

export const Navbar = () => {
  return (
    <div className="bg-christi-500 p-7 flex flex-grow flex-row shadow-lg text-xl">
      <Link to={"/"} className="h-20 w-20 me-5">
        <WalletIcon />
      </Link>
      <Link
        to={"/"}
        className="flex flex-row pe-10 pb-1 items-center font-semibold text-4xl text-christi-200 hover:text-christi-100"
      >
        Wallet Wise
      </Link>
      <Link
        to={"/transaction/input"}
        className="flex flex-row text-2xl px-5 items-center font-semibold text-christi-200 hover:text-christi-100"
      >
        Log Entry
      </Link>
      <Link
        to={"/transaction/view"}
        className="flex flex-row text-2xl items-center font-semibold text-christi-200 hover:text-christi-100"
      >
        View History
      </Link>
      <LoginButton />
    </div>
  );
};
