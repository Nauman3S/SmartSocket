import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import history from "./config/history";
const queryClient = new QueryClient();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
