import { useState } from "react";
import { useGTextInput } from "../Components/Generics/Controls/gTextInputControl";
import GTextInput from "../Components/Generics/gTextInput";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Budget } from "../Data/Budget";
import { useAllBudgets } from "../Functions/TanStack/BudgetQueries";

export const TransactionInput = () => {
  const nameControl = useGTextInput("", (s: string) =>
    s === "" ? "Field is required" : ""
  );

  const dateControl = useGTextInput("", (s: string) =>
    s === "" ? "Field is required" : ""
  );

  const amountControl = useGTextInput("", (s: string) =>
    s === "" ? "Field is required" : ""
  );

  const [budgets, setBudgets] = useState<Budget[]>([]);

  const { data: allBudgets, isLoading: isBudgetsLoading } = useAllBudgets();

  if (isBudgetsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col rounded-xl p-20 bg-stone-200 shadow shadow-stone-500">
      <GTextInput label="Name" control={nameControl} />
      <div className="my-5">
        <GTextInput label="Date" control={dateControl} />
      </div>
      <GTextInput label="Amount" control={amountControl} />

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Options
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
              budgets.includes(b) ? (
                <div>
                  <MenuItem>
                    <a
                      href="#"
                      onClick={() => {
                        setBudgets([...budgets, b]);
                      }}
                      className="block px-4 py-2 text-sm bg-gray-100 text-gray-400 outline-none cursor-default"
                    >
                      {b.budgetName}
                    </a>
                  </MenuItem>
                </div>
              ) : (
                <MenuItem>
                  <a
                    href="#"
                    onClick={() => {
                      setBudgets([...budgets, b]);
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

      {budgets.map((b) => (
        <div
          key={b.id}
          className="items-center hover:bg-stone-300 cursor-pointer border rounded-full border-stone-500 flex flex-row align-middle justify-center"
          onClick={() =>
            setBudgets([...budgets.filter((budget) => budget.id != b.id)])
          }
        >
          {b.budgetName}
          <XMarkIcon className="h-4 w-auto" />
        </div>
      ))}
    </div>
  );
};
