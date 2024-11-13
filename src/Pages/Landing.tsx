export const Landing = () => {
  return (
    <>
      <div className="bg-stone-300 w-1/2 h-full items-center justify-center flex flex-col text-black">
        <div className="ps-20">
          <p className="text-8xl font-semibold pb-16">Landing Page</p>
          <p className="ps-2 pb-20 text-xl w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            vel autem molestias eveniet modi nobis assumenda unde neque dolore
            eum eaque ut accusantium labore cum, optio rem fugiat voluptas
            explicabo.
          </p>
          <div className="ps-2 flex w-5/6">
            <button className="bg-christi-500 p-4 px-10 rounded-lg text-xl text-stone-100 font-bold">
              Learn More
            </button>
            <button className="text-christi-500 rounded-xl text-2xl font-bold mx-10 ms-32">
              Show all
            </button>
          </div>
        </div>
      </div>
      <div className="bg-stone-300 w-1/2 h-full">Two</div>
    </>
  );

  // https://pngtree.com/freepng/financial-planning-securities-illustration-3_8886830.html
  // https://www.freepik.com/free-vector/checklist-budget-plan-clipboard-landing-page-template_21523796.htm

  return (
    <div className="h-3/5 w-1/2">
      <div className="bg-stone-400 h-full w-full items-center justify-center flex rounded shadow-2xl shadow-stone-400">
        <p className="text-5xl font-semibold">Welcome to the page!</p>
      </div>
      <div className="flex flex-row justify-around pt-10 text-xl underline">
        <p>Create Account</p>
        <p>Make a Budget</p>
        <p>Upload Transaction</p>
      </div>
    </div>
  );
};
