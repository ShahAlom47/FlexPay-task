import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../CustomHocks/useUser";
import UserNav from "../Components/UserNav";
import AgentNav from "../Components/AgentNav";
import UserProfile from "../SharedComponents/UserProfile/UserProfile";

const DashBoard = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.accountType === "user") {
                navigate("/dash/sendMoney", { replace: true });
            } else if (user.accountType === "agent") {
                navigate("/dash/agent", { replace: true });
            } else if (user.accountType === "admin") {
                navigate("/dash/admin", { replace: true });
            }
        }
    }, [user, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <UserProfile></UserProfile>

            <div className=" grid  lg:grid-cols-12 md:grid-cols-12 grid-cols-1 border-t-4 border-black  ">
                {/* Navbar */}
                <div className=" col-span-2 bg-purple-700 p-3 flex  lg:flex-col md:flex-col flex-row items-center gap-4 w-full ">
                    {user.accountType === "user" && <UserNav />}
                    {user.accountType === "agent" && <AgentNav />}
                </div>

                {/* ড্যাশবোর্ডের চাইল্ড রাউট লোড হবে */}
                <div className=" col-span-10  bg-white border-l-4 border-black">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
