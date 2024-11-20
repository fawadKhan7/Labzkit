import { ToastContainer } from "react-toastify";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import AppRouter from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App ">
      <CartProvider>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </CartProvider>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeButton
        style={{ fontSize: "12px" }} // Adjust the font size here
      />
    </div>
  );
}

export default App;
