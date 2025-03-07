// Define types for the state
export interface Invoice {
  // Add appropriate properties here based on your requirements
  id: string;
  amount: number;
}

export interface InitialStateType {
  invoice: Invoice[];
  filter: string;
  isFormOpen: boolean;
  selectedInvoice: Invoice | null
}

export interface ItemInterface {
  name: string;
  quantity: number;
  price:number;
  total: number;
}

export interface FormDataInterface {
  id: string;
  status: string;
  billFrom: {
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  billTo: {
    clientEmail: string;
    clientAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientName: string;
  items: ItemInterface[];
  paymentTerms: string;
  projectDescription: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
}