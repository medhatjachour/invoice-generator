import Header from "./Header";
import InvoiceList from "./InvoiceList";
import InvoiceForm from "./InvoiceForm";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../store/InvoiceSlice";
import InvoiceDetails from "./InvoiceDetails";
import { FormDataInterface } from "../types";

const AppContext = () => {
  const dispatch = useDispatch();
  const { isFormOpen,selectedInvoice } = useSelector(
    (state: { invoices: { isFormOpen: boolean,selectedInvoice:FormDataInterface|null } }) => state.invoices
  );

  const handleNewInvoice = () => {
    dispatch(toggleForm());
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto py-12 px-4 ">
        <Header onNewInvoice={handleNewInvoice} />
        {selectedInvoice?(<InvoiceDetails TheInvoice={selectedInvoice}/>):(
        <InvoiceList />

        )}
        {/* <InvoiceDetails/>
        <InvoiceList /> */}
        {isFormOpen && <InvoiceForm  TheInvoice={selectedInvoice}/>}
      </div>
    </div>
  );
};

export default AppContext;
