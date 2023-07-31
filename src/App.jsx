import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, Signup } from './pages';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";


function App() {
  return (
    <>
    <div className="bg-gray-50 dark:bg-gray-900">
    <ToastContainer />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* <Navbar />
      <Main/> */}
    {/* <Services />
    <Transactions />
    <Footer /> */}
  </div></>
  );
}

export default App;
