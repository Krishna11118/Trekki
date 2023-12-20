import "./App.css";
import Layout from "./components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Layout />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
