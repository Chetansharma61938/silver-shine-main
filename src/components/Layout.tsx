import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardList, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import clsx from "clsx";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ to, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md",
        isActive
          ? "bg-blue-100 text-blue-700"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-sm z-10">
        <div className="h-16 flex items-center px-6 border-b">
          <b>Silver Shine Chassis</b>
        </div>
        <div className="flex flex-col h-[calc(100vh-4rem)] justify-between">
          <nav className="px-3 py-4 space-y-1">
            <NavItem
              to="/"
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Dashboard"
              isActive={location.pathname === "/"}
            />
            <NavItem
              to="/customers"
              icon={<Users className="w-5 h-5" />}
              label="Customers"
              isActive={location.pathname === "/customers"}
            />
            <NavItem
              to="/orders"
              icon={<ClipboardList className="w-5 h-5" />}
              label="Orders"
              isActive={location.pathname === "/orders"}
            />
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={() => {
                signOut(), localStorage.clear();
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content with left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
