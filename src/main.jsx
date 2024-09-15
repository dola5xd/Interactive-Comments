import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./styles/index.css";

import Store from "./Services/Store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "0.8rem",
            maxWidth: "500px",
            padding: "16px 20px",
            backgroundColor: "#fff",
            textWrap: "nowrap",
          },
        }}
      />
      <App />
    </Provider>
  </StrictMode>
);
