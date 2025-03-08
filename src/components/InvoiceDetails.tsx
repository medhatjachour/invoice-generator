import { format, parseISO } from "date-fns";
import { FormDataInterface } from "../types";
import { useDispatch } from "react-redux";
import {
  deleteInvoice,
  markAsPaid,
  setSelectedInvoice,
  toggleForm,
} from "../store/InvoiceSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePdf from "./InvoicePdf";
import { Check, Download, Edit2, Trash2 } from "lucide-react";
interface InvoiceDetailsProps {
  TheInvoice: FormDataInterface;
  // other props
}
const InvoiceDetails = ({ TheInvoice }: InvoiceDetailsProps) => {
  const dispatch = useDispatch();

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
  const formData = (date: string) => {
    try {
      return format(parseISO(date), "dd MMM yyyy");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAsPaid = () => {
    dispatch(markAsPaid(TheInvoice.id));
  };
  const handleDelete = () => {
    dispatch(deleteInvoice(TheInvoice.id));
    dispatch(setSelectedInvoice(null));
  };
  const handleEdit = () => {
    dispatch(toggleForm());
  };
  return (
    <div className="md:p-8 p-3 bg-slate-800 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <span className="md:block hidden">Status</span>
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
        </div>

        <div className="flex space-x-4">
          <PDFDownloadLink
            document={<InvoicePdf TheInvoice={TheInvoice} />}
            fileName={`invoice-${TheInvoice.id}.pdf`}
            className="flex cursor-pointer md:px-6 px-3 py-3 justify-center gap-2  rounded-full bg-slate-700 hover:bg-slate-600 items-center"
           data-tip="Download a PDF"
          >
            {({loading})=>(
              <>
                <Download size={20}/>
                <span className="md:block hidden">{loading?"Loading...":"Download PDF"}</span>
              
              </>
            )}
          </PDFDownloadLink>
          <button
            onClick={handleEdit}
            className="cursor-pointer md:px-8 px-3 py-2  md:rounded-full rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            <Edit2 size={20} className="md:hidden block"/>
            <span  className="md:block hidden"> Edit</span>
            
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer md:px-8 px-3 py-2  md:rounded-full rounded-lg bg-red-500 hover:bg-red-600"
          >
            <Trash2 size={20} className="md:hidden block"/>
            <span  className="md:block hidden"> Delete</span>
          </button>
          <button
            onClick={handleMarkAsPaid}
            className="cursor-pointer md:px-8 px-3 py-2  md:rounded-full rounded-lg bg-violet-500 hover:bg-violet-600"
          >
            <Check size={20} className="md:hidden block"/>

            <span  className="md:block hidden"> 
            Mark as Paid
              
            </span>

          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg md:p-8 p-3">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold mb-2">
              Invoice Id: #{TheInvoice.id}{" "}
            </h2>
            <p className="md:block hidden text-slate-400 ">{TheInvoice.projectDescription}</p>
          </div>
          <div className="text-right text-slate-400 min-w-42">
            <p>{TheInvoice.billFrom.streetAddress}</p>
            <p>{TheInvoice.billFrom.city}</p>
            <p>{TheInvoice.billFrom.postCode}</p>
            <p>{TheInvoice.billFrom.country}</p>
          </div>
          
        </div>
        <div>
          <p className="md:hidden pt-2 pb-3 block text-slate-400 ">{TheInvoice.projectDescription}</p>

        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-slate-400 mb-2">Invoice Date</p>
            <p className="font-bold">{formData(TheInvoice.invoiceDate)}</p>
            <p className="text-slate-400 mb-2">Payment Date</p>
            <p className="font-bold">{formData(TheInvoice.dueDate)}</p>
          </div>

          <div>
            <p className="text-slate-400 mb-2">Bill To</p>
            <p className="font-bold mb-2">{TheInvoice.clientName}</p>
            <p className="text-slate-400">{TheInvoice.billTo.clientAddress}</p>
            <p className="text-slate-400">{TheInvoice.billTo.city}</p>
            <p className="text-slate-400">{TheInvoice.billTo.postCode}</p>
            <p className="text-slate-400">{TheInvoice.billTo.country}</p>
          </div>
          <div>
            <p className="text-slate-400 mb-2">Sent To</p>
            <p className="font-bold text-wrap overflow-x-hidden">{TheInvoice.billTo.clientEmail}</p>
          </div>
        </div>
        <div className=" bg-slate-800 rounded-lg overflow-hidden">
          <div className="overflow-x-scroll custom-scrollbar p-8">
            <table className="w-full ">
              <thead>
                <tr className="text-slate-400">
                  <th className="pt-1.5 pb-2.5  text-left">Item Name</th>
                  <th className="pt-1.5 pb-2.5  text-center">Qty</th>
                  <th className="pt-1.5 pb-2.5  text-right">Price</th>
                  <th className="pt-1.5 pb-2.5  text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {TheInvoice.items.length > 0 &&
                  TheInvoice.items.map((invoice, index) => (
                    <tr className="text-white my-2" key={index}>
                      <th className="py-1.5 px-1 text-left">{invoice.name}</th>
                      <th className="py-1.5 px-1 text-center">{invoice.quantity}</th>
                      <th className="py-1.5 px-1 text-right">
                        {invoice.price.toFixed(2)}
                      </th>
                      <th className="py-1.5 px-1 text-right">
                        {invoice.total.toFixed(2)}
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-900 p-8 flex justify-between items-center">
            <span className="text-white">Amount Due</span>
            <span className="text-white text-2xl">
              {TheInvoice.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
