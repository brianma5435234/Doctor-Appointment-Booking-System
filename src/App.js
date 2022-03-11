import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "navigation/RouterConfig";
import "./App.css";
// Redux
import { Provider } from "react-redux";
import store from "redux/store";
//NavigationBar
import { NavigationBar } from "navigation/NavigationBar";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavigationBar />
          <RouterConfig />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
