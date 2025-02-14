import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";


const Root = () => {


    return (
        <>

            <main className=" relative ">
                <Navbar />

                <Outlet></Outlet>

            </main>
            {/* <Footer></Footer> */}

        </>
    );
};

export default Root;