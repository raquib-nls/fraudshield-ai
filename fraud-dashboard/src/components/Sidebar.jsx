import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  AlertTriangle,
  Users,
  BarChart3,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    borderRadius: "12px",
    color: "#d1d5db",
    textDecoration: "none",
    marginBottom: "8px",
    transition: "0.3s",

    background:
      location.pathname === path
        ? "#2563eb"
        : "transparent",

    border:
      location.pathname === path
        ? "1px solid #3b82f6"
        : "1px solid transparent",

    color:
      location.pathname === path
        ? "#ffffff"
        : "#d1d5db",

    fontWeight:
      location.pathname === path
        ? "600"
        : "400",
  });

  return (
    <div
      style={{
        width: "260px",
        background: "#0B1120",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        borderRight: "1px solid #1e293b",
      }}
    >
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ margin: 0 }}>FraudShield AI</h2>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "13px",
          }}
        >
          Real-Time Fraud Monitor
        </p>
      </div>

      <Link
        to="/"
        style={linkStyle("/")}
        onMouseEnter={(e) => {
          if (location.pathname !== "/")
            e.currentTarget.style.background =
              "#1e293b";
        }}
        onMouseLeave={(e) => {
          if (location.pathname !== "/")
            e.currentTarget.style.background =
              "transparent";
        }}
      >
        <LayoutDashboard size={18} />
        Dashboard
      </Link>

      <Link
        to="/transactions"
        style={linkStyle("/transactions")}
        onMouseEnter={(e) => {
          if (location.pathname !== "/transactions")
            e.currentTarget.style.background =
              "#1e293b";
        }}
        onMouseLeave={(e) => {
          if (location.pathname !== "/transactions")
            e.currentTarget.style.background =
              "transparent";
        }}
      >
        <CreditCard size={18} />
        Transactions
      </Link>

      <Link
        to="/alerts"
        style={linkStyle("/alerts")}
        onMouseEnter={(e) => {
          if (location.pathname !== "/alerts")
            e.currentTarget.style.background =
              "#1e293b";
        }}
        onMouseLeave={(e) => {
          if (location.pathname !== "/alerts")
            e.currentTarget.style.background =
              "transparent";
        }}
      >
        <AlertTriangle size={18} />
        Alerts
      </Link>

      <Link
        to="/mule-accounts"
        style={linkStyle("/mule-accounts")}
        onMouseEnter={(e) => {
          if (location.pathname !== "/mule-accounts")
            e.currentTarget.style.background =
              "#1e293b";
        }}
        onMouseLeave={(e) => {
          if (location.pathname !== "/mule-accounts")
            e.currentTarget.style.background =
              "transparent";
        }}
      >
        <Users size={18} />
        Mule Accounts
      </Link>

      <Link
        to="/analytics"
        style={linkStyle("/analytics")}
        onMouseEnter={(e) => {
          if (location.pathname !== "/analytics")
            e.currentTarget.style.background =
              "#1e293b";
        }}
        onMouseLeave={(e) => {
          if (location.pathname !== "/analytics")
            e.currentTarget.style.background =
              "transparent";
        }}
      >
        <BarChart3 size={18} />
        Analytics
      </Link>
    </div>
  );
}

export default Sidebar;