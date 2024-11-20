import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <>
      <div className="bg-stone-200 w-1/2 h-full items-center justify-center flex flex-col text-stone-900">
        <div className="ps-20">
          <p className="text-6xl font-semibold pb-16">
            Take Control of Your Finances with Ease
          </p>
          <p className="ps-2 pb-20 text-xl w-5/6">
            Stay on top of your spending with our intuitive budget tracker.
            Whether you're paying off debt, saving for a big goal, or trying to
            stick to a budget, our tool helps you track expenses, set goals, and
            visualize your financial progress. Start budgeting today and build a
            better financial future with confidence!
          </p>
          <div className="ps-2 flex w-5/6">
            <Link
              to={"/transaction/input"}
              className="bg-christi-500 p-4 px-10 rounded-lg text-xl text-stone-100 font-bold hover:bg-christi-600"
            >
              Start Entering
            </Link>
            <button className="text-christi-500 rounded-xl text-2xl font-bold mx-10 ms-32 hover:text-christi-600">
              See History
            </button>
          </div>
        </div>
      </div>
      <div className="bg-stone-200 w-1/2 h-full flex">
        {/* Attribution to https://www.freepik.com/free-vector/checklist-budget-plan-clipboard-landing-page-template_21523796.htm */}
        <img
          className="object-scale-down"
          src="/financial_planning_securities_illustration.png"
        />
      </div>
    </>
  );
};
