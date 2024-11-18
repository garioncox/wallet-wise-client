import GTextInput from "../Components/Generics/gTextInput";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Budget } from "../Data/Budget";
import { useAllBudgets } from "../Functions/TanStack/BudgetQueries";
import { useTransactionInput } from "./TransactionInputControl";

export const TransactionInput = () => {
  const { data: allBudgets, isLoading: isBudgetsLoading } = useAllBudgets();

  const control = useTransactionInput();

  if (isBudgetsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col rounded-xl p-20 bg-stone-200 shadow shadow-stone-500">
      <GTextInput label="Name" control={control.nameControl} />
      <GTextInput label="Date" control={control.dateControl} />
      <GTextInput label="Amount" control={control.amountControl} />

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Budget Types
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-5 text-gray-400"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            {allBudgets.map((b: Budget) =>
              control.budgets.includes(b) ? (
                <div key={b.id}>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm bg-gray-100 text-gray-400 outline-none cursor-default"
                    >
                      {b.budgetName}
                    </a>
                  </MenuItem>
                </div>
              ) : (
                <MenuItem key={b.id}>
                  <a
                    href="#"
                    onClick={() => {
                      control.setBudgets([...control.budgets, b]);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    {b.budgetName}
                  </a>
                </MenuItem>
              )
            )}
          </div>
        </MenuItems>
      </Menu>

      {control.budgets.map((b) => (
        <div
          key={b.id}
          className="items-center hover:bg-stone-300 cursor-pointer border rounded-full border-stone-500 flex flex-row align-middle justify-center"
          onClick={() =>
            control.setBudgets([
              ...control.budgets.filter((budget) => budget.id != b.id),
            ])
          }
        >
          {b.budgetName}
          <XMarkIcon className="h-4 w-auto" />
        </div>
      ))}
      <button
        onClick={control.submit}
        className="bg-christi-500 p-2 mt-5 rounded-lg text-stone-100 font-bold hover:bg-christi-600"
      >
        Submit
      </button>
    </div>
  );
};
