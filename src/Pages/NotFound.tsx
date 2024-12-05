import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 border rounded-xl shadow-inner shadow-stone-400">
      <div className="mx-auto text-center">
        <h1 className="mb-4 text-7xl font-extrabold lg:text-9xl text-christi-500 ">
          404
        </h1>
        <p className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          Something's missing.
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 ">
          Sorry, we can't find that page. Maybe you meant to do one of these?
        </p>
        <div className="mt-10 flex flex-col lg:flex-row">
          <Link
            to={"/transaction/view"}
            className="lg:border-b border-christi-500 hover:border-christi-600 text-christi-500 hover:text-christi-600 p-2 text-lg lg:text-xl font-bold mx-5"
          >
            View History
          </Link>
          <Link
            to={"/transaction/input"}
            className="lg:border-b border-christi-500 hover:border-christi-600 text-christi-500 hover:text-christi-600 p-2 text-lg lg:text-xl font-bold mx-5"
          >
            Record Transaction
          </Link>
          <Link
            to={"/budget/input"}
            className="lg:border-b border-christi-500 hover:border-christi-600 text-christi-500 hover:text-christi-600 p-2 text-lg lg:text-xl font-bold mx-5"
          >
            Create Budget
          </Link>
        </div>
      </div>
    </div>
  );
};
