import { Provider } from "react-redux";
import AppContext from "./components/AppContext";
import { store } from "./store/store";
function App() {
  return (
    <Provider store={store}>
      <AppContext />
    </Provider>
  );
}

export default App;
