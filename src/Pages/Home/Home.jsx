import AnimatedArrowBtn from "../../Components/AnimatedArrowBtn";
import Navbar from "../../SharedComponents/Navbar/Navbar";
import bg from "../../assets/features/banner-bg.png";

const Home = () => {
    return (
        <div
            className="m-auto bg-[#1f1f2d] min-h-screen bg-cover bg-no-repeat relative pt-20"
            style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center top' }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
            <div className="relative z-10 max-w-7xl mx-auto py-20  grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 lg:gap-5 md:gap-3 gap-20
              ">

                <div className="text-white text-center  w-10/12 mx-auto col-span-8 ">
                    <div className="text-start text-gray-400">
                        <h1 className="font-bold uppercase lg:text-7xl md:text-5xl text-3xl leading-tight">
                            Thriving in <br /> financial <br /> ease
                        </h1>
                        <p className="text-lg mt-4 w-4/12">Experience the joy of financial success with ease and confidence. Flourishing effortlessly in financial tranquility!</p>
                        <button className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-transparent   hover:scale-105 transition-all   flex items-center gap-2">Learn More <AnimatedArrowBtn></AnimatedArrowBtn></button>
                    </div>
                </div>

                {/* Right Section with Additional Information */}
                <div className="   text-gray-400 text-lg space-y-8 max-w-sm lg:col-span-4 md:col-span-5   px-8">
                    <div className=" space-y-4 ">
                        <h2 className="font-bold uppercase text-gray-300 ">Secure Transactions</h2>
                        <p>Your financial safety is our top priority, fortified by advanced security measures.</p>
                    </div>
                    <div className="border-b-4 w-1/3 border-gray-300 my-4 shadow-xl shadow-blue-950"></div>
                    <div className=" space-y-4 ">
                        <h2 className="font-bold uppercase text-gray-300">Digital Banking</h2>
                        <p>Embrace the future of banking with our user-friendly digital platforms, managing your finances more efficiently.</p>
                    </div>
                    <div className="text-center ">
                        <h2 className="  absolute bottom-10 right-20 text-white text-xl font-bold uppercase text-end">24/7 Realtime <br /> Analytics</h2>

                    </div>
                </div>



            </div>
        </div>
    );
};

export default Home;