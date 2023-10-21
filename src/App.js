import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import "./index.css"
 

const App = () => {
  
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
    </Provider>
  );
};

export default App;
