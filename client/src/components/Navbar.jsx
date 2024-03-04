import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
    const isUserLoggedIn =
        useSelector((state) => state.auth.status) ||
        localStorage.getItem("isLoggedIn");

    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout());
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="logo">
                <a href="/" className="text-xl font-bold">
                    InvoiceGenerator
                </a>
            </div>
            {isUserLoggedIn && (
                <div
                    className="logout flex items-center"
                    onClick={handleLogout}
                >
                    <FiLogOut className="mr-2" />
                    <span className="hidden sm:block">Logout</span>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
