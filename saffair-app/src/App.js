import { BrowserRouter } from "react-router-dom";
import "./App.css";
// import Navbar from "./component/navbar/Navbar";
import Home from "./page/Home";
import ThemeToggle from "./component/navbar/themetoggle";
import { useSelector } from "react-redux";

// import ThemeProvider from "./component/themprovider/ThemeProvider";
function App() {

  return (
      <BrowserRouter>
        <Home />
        {/* Rest of your app */}
      </BrowserRouter>
  );
}

export default App;
