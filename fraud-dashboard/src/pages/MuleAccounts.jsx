import { useEffect, useState } from "react";

function MuleAccounts() {
  const [accounts, setAccounts] = useState({});

  useEffect(() => {
    fetch("shimmering-courtesy-production-010a.up.railway.app/mule-accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((err) => console.error(err));
  }, []);

  const accountEntries = Object.entries(accounts);

  return (
    <>
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "25px",
        }}
      >
        Mule Account Detection
      </h1>

      {/* KPI CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div className="card">
          <h2>{accountEntries.length}</h2>
          <p>Detected Accounts</p>
        </div>

        <div className="card">
          <h2>
            {
              accountEntries.filter(
                ([_, count]) => count >= 5
              ).length
            }
          </h2>
          <p>High Risk</p>
        </div>

        <div className="card">
          <h2>
            {
              accountEntries.filter(
                ([_, count]) =>
                  count >= 3 && count < 5
              ).length
            }
          </h2>
          <p>Medium Risk</p>
        </div>

        <div className="card">
          <h2>
            {
              accountEntries.filter(
                ([_, count]) => count < 3
              ).length
            }
          </h2>
          <p>Low Risk</p>
        </div>
      </div>

      {/* TABLE */}

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
              <th align="left">Account</th>
              <th align="left">Incoming Transactions</th>
              <th align="left">Risk Level</th>
              <th align="left">Status</th>
              <th align="left">Action</th>
            </tr>
          </thead>

          <tbody>
            {accountEntries.map(([account, count]) => {
              let risk = "LOW";

              if (count >= 5) risk = "HIGH";
              else if (count >= 3) risk = "MEDIUM";

              return (
                <tr
                  key={account}
                  style={{
                    borderTop: "1px solid #334155",
                  }}
                >
                  <td>{account}</td>

                  <td>{count}</td>

                  <td>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        background:
                          risk === "HIGH"
                            ? "#ef4444"
                            : risk === "MEDIUM"
                            ? "#f59e0b"
                            : "#22c55e",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {risk}
                    </span>
                  </td>

                  <td>
                    <span
                      style={{
                        color:
                          risk === "HIGH"
                            ? "#ef4444"
                            : "#22c55e",
                        fontWeight: "bold",
                      }}
                    >
                      {risk === "HIGH"
                        ? "FLAGGED"
                        : "MONITORING"}
                    </span>
                  </td>

                  <td>
                    <button
                      style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MuleAccounts;