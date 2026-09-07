import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-brand-600 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <Link to="/" className="font-bold text-lg tracking-tight">
          TaskFlow
        </Link>
        {user && (
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:underline">
              Tasks
            </Link>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <span className="hidden sm:inline text-brand-100">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-brand-700 hover:bg-brand-500 px-3 py-1.5 rounded-md transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
