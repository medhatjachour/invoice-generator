import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { FormDataInterface } from "../types";
import { format, parseISO } from "date-fns";

const InvoiceList = () => {
  const { invoice, filter } = useSelector(
    (state: { invoices: { invoice: FormDataInterface[]; filter: string } }) =>
      state.invoices
  );

  const formData = (date: string) => {
    try {
      return format(parseISO(date), "dd MMM yyyy");
    } catch (error) {
      console.log(error);
    }
  };
  const getStatusClass = (status: string) => {
    if (status === "paid") {
      return "bg-green-900/40 text-green-50";
    } else if (status === "pending") {
      return "bg-orange-900/20 text-orange-500";
    } else {
      return "bg-slate-700/50 text-slate-400";
    }
  };
  const getStatusClassForDot = (status: string) => {
    if (status === "paid") {
      return "bg-green-500 ";
    } else if (status === "pending") {
      return "bg-orange-500";
    } else {
      return "bg-slate-400";
    }
  };

  return (
    <div className="space-y-4">
      {invoice.map((TheInvoice) => (
        <div
          key={TheInvoice.id}
          className="bg-slate-800 rounded-lg p-4 flex items-center justify-between hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
        >
          <div className="flex items-center space-x-6">
            <span className="text-slate-400">{TheInvoice.id}</span>
            <span className="text-slate-400">
              Due {formData(TheInvoice.dueDate)}
            </span>
            <span className="text-slate-300">{TheInvoice.clientName}</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="md:text-xl text-md font-bold">
              $ {TheInvoice.amount?.toFixed(2) || "00.00"}
            </span>
            <div
              className={`px-4 rounded-lg flex items-center space-x-2 ${getStatusClass(
                TheInvoice.status
              )}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${getStatusClassForDot(
                  TheInvoice.status
                )}`}
              ></div>
              <span className="capitalize">{TheInvoice.status}</span>
            </div>
            <ChevronRight className="text-violet-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
