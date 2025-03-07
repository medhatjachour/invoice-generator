import { createSlice } from '@reduxjs/toolkit';
import { InitialStateType, ItemInterface } from '../types';
import { addDays, format } from 'date-fns';
import { WritableDraft } from 'immer';




//WritableDraft is used to ensure that the state can be safely mutated within the reducer function.
const saveState = (state: WritableDraft<InitialStateType>)=>{
  try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state',serializedState)
  } catch (error) {
    console.log(error);
    
  }
}

const calculateAmount = ((items:ItemInterface[])=>{
  return items.reduce((acc,item:ItemInterface)=>{
    return acc + item.quantity * item.price
  },0)
})

const loadState = ()=>{
  try {
    const serializedState = localStorage.getItem('state')
    if(serializedState === null){
      return{
        invoice: [],
        filter : 'all',
        isFormOpen: false,
        selectedInvoice: null,

      }
    }
    return JSON.parse(serializedState)
    
  } catch (error) {
    console.log(error); 
    return{
      invoice: [],
      filter : 'all',
      isFormOpen: false,
      selectedInvoice: null,

    }
    
  }
}

const InitialState = loadState()

const invoiceSlide = createSlice({
  name:'invoices',
  initialState: InitialState,
  reducers: {

    addInvoice :(state, action)=>{
      const newInvoice = {
        ...action.payload,
        amount:calculateAmount(action.payload.items),
        status:action.payload.status || 'pending',
        dueDate:action.payload.dueDate || format(addDays(new Date(),30),'yyyy-MM-dd'),
      }
      state.invoice.push(newInvoice)
      saveState(state)
      state.isFormOpen = false
    },

    // to toggle the form
    toggleForm :(state)=>{
      state.isFormOpen = !state.isFormOpen;
      if(!state.isFormOpen){
        state.selectedInvoice = null;
      }
    }
  }  
})


export const {toggleForm,addInvoice} = invoiceSlide.actions;

export default invoiceSlide.reducer;


