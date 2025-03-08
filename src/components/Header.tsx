import { Button, Menu } from "@headlessui/react";
import { Filter, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Invoice } from "../types";
import { setFilter } from "../store/InvoiceSlice";

interface HeaderProps {
  onNewInvoice: () => void;
}

const status = ["all", "paid", "pending", "draft"];

const Header: React.FC<HeaderProps> = ({ onNewInvoice }) => {
  const { invoice,filter } = useSelector(
    (state: { invoices: { invoice: Invoice[],filter:string  }}) => state.invoices
  );
  
  const dispatch = useDispatch();

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
        <p className="text-slate-400">
          {invoice.length === 0
            ? "No Invoices"
            : `There are ${invoice.length} total invoices`}
        </p>
      </div>
      <div className="flex items-center space-x-4 ">
        <Menu as="div" className="relative cursor-pointer">
          <Menu.Button className="flex items-center space-x-2 text-white">
            <Filter size={20} className="cursor-pointer" />
            <span className="md:block hidden">filter by Status</span>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg p-2 z-10">
            {status.map((s) => (
              <Menu.Item key={s} >
                {({ active }) => (
                  <button
                    className={`${
                      active ? "w-full hover:bg-slate-700 cursor-pointer bg-slate-700" : ""
                    }w-full text-left px-4 py-2 rounded-sm capitalize ${filter === s?"text-violet-500":"text-white"}`}
                  onClick={()=>dispatch(setFilter(s))}
                  >
                    {s}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
        <Button
          onClick={onNewInvoice}
          type="button"
          className="cursor-pointer bg-violet-500 hover:bg-violet-900 text-white px-2 md:px-6 py-2 rounded-full flex items-center md:space-x-4"
        >
          <div className=" bg-white rounded-full p-2">
            <Plus size={16} className="text-violet-500" />
          </div>
          <span  className="md:block hidden"> New Invoice</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
