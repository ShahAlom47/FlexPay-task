


const PendingPage = () => {
    return (
       <div  className=" max-w relative">
        <div className=" w-full min-h-screen absolute top-0 left-0 z-50 bg-black bg-opacity-85"> 
           <div className=" w-full min-h-screen flex flex-col justify-center items-center text-white">
           <h1 className=" text-5xl"> Pending</h1>
           <p>Your account is currently being processed. Please wait for admin verification.           </p>
           </div>
        </div>
         <div className="grid gap-5 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mx-auto  min-h-screen p-3">
                            
                            <div className=' bg-stone-600 h-full max-h-40 w-full rounded-md '> </div>
                            <div className=' bg-stone-600 h-full max-h-40 w-full rounded-md '> </div>
                            <div className=' bg-stone-600 h-full max-h-40 w-full rounded-md '> </div>
                            <div className=' bg-stone-600 h-full max-h-40 w-full rounded-md '> </div>
                            <div className=' bg-stone-600 h-full max-h-40 w-full rounded-md '> </div>
                            <div className=' bg-stone-600 h-full max-h-40 w-full rounded-md '> </div>
                            <div className=' bg-stone-600 h-full max-h-40 w-full rounded-md '> </div>
                            <div className=' bg-stone-600 h-full max-h-40 w-full rounded-md '> </div>
                            
                           
                        </div>
       </div>
    );
};

export default PendingPage;