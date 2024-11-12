export const Landing = () => {
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
