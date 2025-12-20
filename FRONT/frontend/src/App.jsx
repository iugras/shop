import { Outlet, NavLink } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Navbar */}
      <header className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">🛒 MyShop</h1>
          <nav className="flex gap-6">
            <NavLink to="/" end className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-200"
            }>
              Home
            </NavLink>

            <NavLink to="/login" className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-200"
            }>
              Login
            </NavLink>

            <NavLink to="/register" className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-200"
            }>
              Register
            </NavLink>

            <NavLink to="/user" className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-200"
            }>
              User
            </NavLink>

            <NavLink to="/admin" className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-200"
            }>
              Admin
            </NavLink>

            <NavLink to="/cart" className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-200"
            }>
              Cart
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 shadow-inner">
        <div className="container mx-auto px-6 py-4 text-center text-white">
          © 2025 MyShop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}