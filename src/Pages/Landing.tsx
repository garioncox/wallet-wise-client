import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="lg:flex bg-stone-100 pt-10">
      <div className="p-4 lg:pt-4 lg:w-1/2 lg:h-full lg:flex lg:order-2">
        {/* Attribution to https://www.freepik.com/free-vector/checklist-budget-plan-clipboard-landing-page-template_21523796.htm */}
        <img
          className="object-scale-down"
          src="/financial_planning_securities_illustration.png"
        />
      </div>

      <div className="text-stone-900 flex flex-col items-center justify-center lg:w-1/2 lg:h-full lg:ps-20">
        <p className="flex text-center text-bold text-4xl lg:text-6xl lg:font-semibold lg:pb-16">
          Take Control of Your Finances
        </p>

        <div className="py-5 lg:order-2">
          <Link
            to={"/transaction/input"}
            className="bg-christi-500 hover:bg-christi-600 text-stone-100 rounded-lg text-center text-md lg:text-xl lg:font-bold font-bold mx-5 p-2 lg:p-4 lg:px-10"
          >
            Start Entering
          </Link>
          <Link
            to={"/transaction/view"}
            className="text-christi-500 hover:text-christi-600 p-2 rounded-xl text-lg lg:text-xl font-bold mx-5"
          >
            See History
          </Link>
        </div>

        <div className="mx-3 mt-3 md:mx-20 lg:ps-2 lg:pb-20 lg:text-xl lg:w-5/6">
          <p>
            Stay on top of your spending with our intuitive budget tracker!
            Whether you're paying off debt, saving for a big goal, or trying to
            stick to a budget, our tool helps you track expenses, set goals, and
            visualize your financial progress. Start budgeting today and build a
            better financial future with confidence!
          </p>
        </div>
      </div>
    </div>
  );
};
