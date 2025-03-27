import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { ApiProvider, AuthProvider } from "@providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="w-full bg-slate-100 flex items-center justify-center">
      <main className="relative bg-purple-03">
        <Toaster
          toastOptions={{
            className: "font-poppins text-sm",
          }}
        />
        <ApiProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ApiProvider>
      </main>
    </div>
  </BrowserRouter>
);