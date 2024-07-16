import { Outlet } from "react-router-dom";
import Footer from "../SharedComponents/Footer/Footer";
import Navbar from "../SharedComponents/Navbar/Navbar";

const Root = () => {
    return (
       <>
       <Navbar></Navbar>
      <main className="py-5 max-w">
      <Outlet ></Outlet>
      </main>
       <Footer></Footer>
       
       </>
    );
};

export default Root;