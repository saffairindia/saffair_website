import { BrowserRouter } from "react-router-dom";
import "./App.css";
// import Navbar from "./component/navbar/Navbar";
import Home from "./page/Home";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Flowbite } from "flowbite-react";
// import ThemeProvider from "./component/themprovider/ThemeProvider";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <ThemeProvider> */}
        <Home />
        {/* </ThemeProvider> */}
      </Provider>
    </BrowserRouter>
  );
}

export default App;
