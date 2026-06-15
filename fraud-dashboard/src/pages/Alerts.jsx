import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error(err));
  }, []);

  const highRisk = alerts.filter(
    (a) => a.riskLevel === "HIGH"
  ).length;

  const mediumRisk = alerts.filter(
    (a) => a.riskLevel === "MEDIUM"
  ).length;

  const lowRisk = alerts.filter(
    (a) => a.riskLevel === "LOW"
  ).length;

  return (
    <>
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "25px",
        }}
      >
        Fraud Alerts
      </h1>

      {/* TOP CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div className="card">
          <h2>{alerts.length}</h2>
          <p>Total Alerts</p>
        </div>

        <div className="card">
          <h2>{highRisk}</h2>
          <p>High Risk</p>
        </div>

        <div className="card">
          <h2>{mediumRisk}</h2>
          <p>Medium Risk</p>
        </div>

        <div className="card">
          <h2>{lowRisk}</h2>
          <p>Low Risk</p>
        </div>
      </div>

      {/* ALERT TABLE */}

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid #334155",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th align="left">Alert ID</th>
              <th align="left">Fraud Score</th>
              <th align="left">Risk Level</th>
              <th align="left">Status</th>
              <th align="left">Action</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert) => (
              <tr
                key={alert.id}
                style={{
                  borderTop: "1px solid #334155",
                }}
              >
                <td>{alert.id}</td>

                <td>{(alert.fraudScore * 100).toFixed(2)}%</td>

                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      background:
                        alert.riskLevel === "HIGH"
                          ? "#ef4444"
                          : alert.riskLevel === "MEDIUM"
                          ? "#f59e0b"
                          : "#22c55e",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {alert.riskLevel}
                  </span>
                </td>

                <td>
                  <span
                    style={{
                      color:
                        alert.status === "OPEN"
                          ? "#f59e0b"
                          : "#22c55e",
                      fontWeight: "bold",
                    }}
                  >
                    {alert.status}
                  </span>
                </td>

                <td>
                  <button
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Alerts;