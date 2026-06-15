import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem("auth", "true");
      window.location.href = "/";
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#0f172a",
      }}
    >
      {/* LEFT SIDE */}

      <div
        style={{
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "20px",
          }}
        >
          FraudShield AI
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            marginBottom: "40px",
          }}
        >
          Real-Time Fraud Detection &
          Mule Account Monitoring
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            fontSize: "18px",
          }}
        >
          <div>✓ AI Powered Fraud Detection</div>
          <div>✓ Mule Account Detection</div>
          <div>✓ Real-Time Monitoring</div>
          <div>✓ Risk Analytics Dashboard</div>
          <div>✓ Alert Management System</div>
        </div>

        <div
          style={{
            marginTop: "50px",
            padding: "20px",
            background: "#1e293b",
            borderRadius: "16px",
            border: "1px solid #334155",
            width: "420px",
          }}
        >
          <h3
            style={{
              marginBottom: "15px",
            }}
          >
            Demo Credentials
          </h3>

          <p>
            Username:
            <strong> admin</strong>
          </p>

          <p>
            Password:
            <strong> admin123</strong>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "420px",
            background: "#1e293b",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid #334155",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              textAlign: "center",
            }}
          >
            Login
          </h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: "#3b82f6",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;