import { Plus, Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addInvoice, toggleForm } from "../store/InvoiceSlice";
import { useState } from "react";
import { addDays, format } from "date-fns";
import { FormDataInterface, ItemInterface } from "../types";
const InvoiceForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormDataInterface>(() => {
    return {
      id: `inv${Math.floor(Math.random() * 18349)}`,
      status: "pending",
      billFrom: {
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      billTo: {
        clientEmail: "",
        clientAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: "",
      items: [],
      paymentTerms: "Net 30 Days",
      projectDescription: "",
      invoiceDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
      amount: 0,
    };
  });

  const addItem  = ()=>{
    setFormData({
      ...formData,items:[...formData.items,{name:'',quantity:0,price:0,total:0}]
    })
  }

  const updateItem = (index: number, field: keyof ItemInterface, value: string | number) => {
    const newItems: ItemInterface[] = [...formData.items];
    (newItems[index][field] as string | number) = value;

    if (field === "quantity" || field === "price") {
      const qty = field === "quantity" ? Number(value) : newItems[index].quantity;
      const price = field === "price" ? Number(value) : newItems[index].price;
      newItems[index].total = qty * price;
    }
    setFormData({ ...formData, items: newItems });
  }
  
  const removeItem = (index: number) => {
    setFormData({ ...formData, items: formData.items.filter((_,i)=> i!== index) });

  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addInvoice(formData))
    console.log(formData);
  }

  
  return (
    <div className=" fixed inset-0 bg-black/50 flex items-center justify-center overflow-y-auto ">
      <div className=" bg-slate-800 p-8 rounded-lg w-full max-w-2xl mt-40 my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Invoices</h2>
          <button
            className="cursor-pointer text-white transition-colors duration-300 hover:text-red-400"
            type="button"
            onClick={() => dispatch(toggleForm())}
          >
            <X size={24} className="" />
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <h3 className="text-violet-400">Bill From</h3>
            <input
              type="text"
              required
              value={formData.billFrom.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    streetAddress: e.target.value,
                  },
                })
              }
              placeholder="Street Address"
              className="w-full bg-slate-900 rounded-lg p-3"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              required
              value={formData.billFrom.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    city: e.target.value,
                  },
                })
              }
              placeholder="City"
              className="w-full bg-slate-900 rounded-lg p-3"
            />

            <input
              type="text"
              required
              value={formData.billFrom.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    postCode: e.target.value,
                  },
                })
              }
              placeholder="Post Code"
              className="w-full bg-slate-900 rounded-lg p-3"
            />

            <input
              type="text"
              required
              value={formData.billFrom.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    country: e.target.value,
                  },
                })
              }
              placeholder="Country"
              className="w-full bg-slate-900 rounded-lg p-3"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-violet-400">Bill To</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientName: e.target.value,
                  })
                }
                placeholder="Client's Name"
                className="w-full bg-slate-900 rounded-lg p-3"
              />

              <input
                type="email"
                required
                value={formData.billTo.clientEmail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      clientEmail: e.target.value,
                    },
                  })
                }
                placeholder="Client's Email"
                className="w-full bg-slate-900 rounded-lg p-3"
              />
            </div>
            <input
              type="text"
              required
              value={formData.billTo.clientAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    clientAddress: e.target.value,
                  },
                })
              }
              placeholder="Client's Street"
              className="w-full bg-slate-900 rounded-lg p-3"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              required
              value={formData.billTo.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    city: e.target.value,
                  },
                })
              }
              placeholder="City"
              className="w-full bg-slate-900 rounded-lg p-3"
            />

            <input
              type="text"
              required
              value={formData.billTo.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    postCode: e.target.value,
                  },
                })
              }
              placeholder="Post Code"
              className="w-full bg-slate-900 rounded-lg p-3"
            />

            <input
              type="text"
              required
              value={formData.billTo.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    country: e.target.value,
                  },
                })
              }
              placeholder="Country"
              className="w-full bg-slate-900 rounded-lg p-3"
            />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="bg-slate-900 rounded-lg p-3"
                value={formData.invoiceDate}
                onChange={(e) => {
                  const newDate = e.target.value;
                  setFormData({
                    ...formData,
                    invoiceDate: newDate,
                    dueDate: format(
                      addDays(new Date(newDate), 30),
                      "yyyy-MM-dd"
                    ),
                  });
                }}
              />
              <select
                required
                name=""
                id=""
                value={formData.paymentTerms}
                onChange={(e)=> setFormData({...formData,paymentTerms:e.target.value})}
                className="bg-slate-900 rounded-lg p-3"
              >
                <option value="Net 30 Days">Net 30 Days</option>
                <option value="Net 60 Days">Net 60 Days</option>
              </select>
            </div>
            <textarea
              required value={formData.projectDescription}
              onChange={(e)=> setFormData({...formData,projectDescription:e.target.value})}
              
              placeholder="Project Description"
              className="w-full bg-slate-900 rounded-lg p-3"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-violet-400">Item List</h3>
            {formData.items.map((item,index)=>(
                <div className="grid grid-cols-12 items-center gap-4" key={index}>
                <input
                  type="text"
                  required
                  value={item.name}
                  onChange={(e) =>
                    updateItem(index,'name',e.target.value)
                  }
                  placeholder="Item Name"
                  className="w-full bg-slate-900 rounded-lg p-3 col-span-5"
                />
                <input
                  type="number"
                  required
                  placeholder="Quantity"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index,'quantity',parseInt( e.target.value)||0)
                  }
                  className="w-full bg-slate-900 rounded-lg p-3 col-span-2"
                />
                <input
                  type="number"
                  required
                  min="0"
                  step="0.1" value={item.price}
                  onChange={(e) =>
                    updateItem(index,'price',parseFloat( e.target.value)||0)
                  }
                  placeholder="Price"
                  className="w-full bg-slate-900 rounded-lg p-3 col-span-2"
                />
                <div className="col-span-2 text-right ">$  {item.total.toFixed(2)}</div>
  
                <button
                  type="button"
                  onClick={()=>removeItem(index)}
                  className="text-slate-400 hover:text-red-400 cursor-pointer"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}
           
            <button
              type="button"
              onClick={addItem}
              className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex items-center cursor-pointer"
            >
              <Plus size={20} className="text-white" />
              <span className="flex-1 text-center"> Add New Item</span>
            </button>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="cursor-pointer bg-violet-500 hover:bg-red-400 rounded-full px-6 py-3 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className=" cursor-pointer bg-violet-500 hover:bg-green-700 rounded-full px-6 py-3 text-white"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
