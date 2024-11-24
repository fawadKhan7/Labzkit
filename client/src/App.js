import { ToastContainer } from "react-toastify";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import AppRouter from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme();
  return (
    <div className="App ">
      <ThemeProvider theme={theme}>
        <CartProvider>
          <UserProvider>
            <AppRouter />
          </UserProvider>
        </CartProvider>
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeButton
        style={{ fontSize: "12px" }} 
      />
    </div>
  );
}

export default App;
