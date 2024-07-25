import Home from "./pages/home.jsx";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <MantineProvider>
      <ToastContainer autoClose={2000} theme="light" />
      <Home />
    </MantineProvider>
  );
}

export default App;
