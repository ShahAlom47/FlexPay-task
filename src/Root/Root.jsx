import { Outlet } from "react-router-dom";


const Root = () => {
  

    return (
        <>

            <main className=" ">

           <Outlet></Outlet>

            </main>
            {/* <Footer></Footer> */}

        </>
    );
};

export default Root;