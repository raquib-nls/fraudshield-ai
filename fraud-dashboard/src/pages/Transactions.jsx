import { useEffect, useState } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://shimmering-courtesy-production-010a.up.railway.app/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredTransactions = transactions.filter(
    (tx) =>
      (tx.sender || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (tx.receiver || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "25px",
        }}
      >
        Transactions
      </h1>

      {/* STATS CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div className="card">
          <h2>{transactions.length}</h2>
          <p>Total Transactions</p>
        </div>

        <div className="card">
          <h2>₹1.2L</h2>
          <p>Total Volume</p>
        </div>

        <div className="card">
          <h2>5</h2>
          <p>Flagged Cases</p>
        </div>

        <div className="card">
          <h2>98%</h2>
          <p>Success Rate</p>
        </div>
      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search sender or receiver..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #334155",
          background: "#1e293b",
          color: "white",
          marginBottom: "20px",
        }}
      />

      {/* TABLE */}

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid #334155",
          overflowX: "auto",
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
              <th align="left">ID</th>
              <th align="left">Sender</th>
              <th align="left">Receiver</th>
              <th align="left">Amount</th>
              <th align="left">Risk</th>
              <th align="left">Timestamp</th>
              <th align="left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((tx) => (
              <tr
                key={tx.id}
                style={{
                  borderTop: "1px solid #334155",
                }}
              >
                <td>{tx.id}</td>

                <td>{tx.sender}</td>

                <td>{tx.receiver}</td>

                <td>₹{tx.amount}</td>

                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      background:
                        tx.riskLevel === "HIGH"
                          ? "#ef4444"
                          : tx.riskLevel === "MEDIUM"
                          ? "#f59e0b"
                          : "#22c55e",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {tx.riskLevel}
                  </span>
                </td>

                <td>{tx.timestamp}</td>

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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Transactions;