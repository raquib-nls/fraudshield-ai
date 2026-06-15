import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";


const trendData = [
    { day: "Mon", alerts: 2 },
    { day: "Tue", alerts: 5 },
    { day: "Wed", alerts: 3 },
    { day: "Thu", alerts: 8 },
    { day: "Fri", alerts: 6 },
    { day: "Sat", alerts: 10 },
    { day: "Sun", alerts: 7 },
];

const riskData = [
    { name: "Low Risk", value: 75 },
    { name: "Medium Risk", value: 20 },
    { name: "High Risk", value: 5 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function Dashboard() {
    const [stats, setStats] = useState(null);

    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");

    const submitTransaction = async () => {
        try {

            const fraudScore =
                Number(amount) > 50000 ? 0.95 : 0.20;

            const riskLevel =
                Number(amount) > 50000
                    ? "HIGH"
                    : "LOW";

            const response = await fetch(
                "shimmering-courtesy-production-010a.up.railway.app/transactions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        sender,
                        receiver,
                        amount: Number(amount),
                        fraudScore,
                        riskLevel,
                        isFraud:
                            riskLevel === "HIGH"
                                ? 1
                                : 0,
                    }),
                }
            );

            if (response.ok) {

                alert(
                    `Transaction Processed!\nRisk Level: ${riskLevel}`
                );

                setSender("");
                setReceiver("");
                setAmount("");

                window.location.reload();
            }

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetch("shimmering-courtesy-production-010a.up.railway.app/dashboard")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error(err));
    }, []);

    if (!stats) {
        return (
            <div>
                <h2>Loading Dashboard...</h2>
            </div>
        );
    }

    return (
        <>
            <h1
    style={{
        fontSize: "36px",
        marginBottom: "30px",
    }}
>
    Fraud Detection Dashboard
</h1>

<div
    style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "20px",
        marginBottom: "30px",
        alignItems: "start",
    }}
>

    {/* LEFT SIDE - KPI CARDS */}

    <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "20px",
        }}
    >
        <div className="card">
            <h2>{stats.totalTransactions}</h2>
            <p>Total Transactions</p>
        </div>

        <div className="card">
            <h2>{stats.totalAlerts}</h2>
            <p>Fraud Alerts</p>
        </div>

        <div className="card">
            <h2>{stats.suspiciousAccounts}</h2>
            <p>Mule Accounts</p>
        </div>

        <div className="card">
            <h2>{stats.highRiskTransactions}</h2>
            <p>High Risk Cases</p>
        </div>
    </div>

    {/* RIGHT SIDE - FRAUD SIMULATION */}

    <div
        style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "18px",
            border: "1px solid #334155",
        }}
    >
        <h2
            style={{
                marginBottom: "10px",
            }}
        >
            Run Fraud Simulation
        </h2>

        <p
            style={{
                color: "#94a3b8",
                marginBottom: "20px",
                fontSize: "14px",
            }}
        >
            Submit a transaction and test the AI fraud
            detection engine.
        </p>

        <input
            placeholder="Sender Account"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "white",
                boxSizing: "border-box",
            }}
        />

        <input
            placeholder="Receiver Account"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "white",
                boxSizing: "border-box",
            }}
        />

        <input
            type="number"
            placeholder="Transaction Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "white",
                boxSizing: "border-box",
            }}
        />

        <button
            onClick={submitTransaction}
            style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "15px",
            }}
        >
            Run Fraud Analysis
        </button>
    </div>

</div>
            {/* CHART SECTION */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "20px",
                    marginTop: "30px",
                }}
            >
                {/* LINE CHART */}
                <div
                    style={{
                        background: "#1e293b",
                        borderRadius: "16px",
                        padding: "20px",
                        border: "1px solid #334155",
                    }}
                >
                    <h2 style={{ marginBottom: "20px" }}>
                        Fraud Alert Trend
                    </h2>

                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="alerts"
                                stroke="#3b82f6"
                                strokeWidth={4}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* PIE CHART */}
                <div
                    style={{
                        background: "#1e293b",
                        borderRadius: "16px",
                        padding: "20px",
                        border: "1px solid #334155",
                    }}
                >
                    <h2 style={{ marginBottom: "20px" }}>
                        Risk Distribution
                    </h2>

                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={riskData}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                dataKey="value"
                                label
                            >
                                {riskData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>

                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div
                style={{
                    marginTop: "30px",
                    background: "#1e293b",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid #334155",
                }}
            >
                <h2 style={{ marginBottom: "20px" }}>
                    Recent Fraud Activity
                </h2>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th align="left">Account</th>
                            <th align="left">Risk</th>
                            <th align="left">Amount</th>
                            <th align="left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>ACC001</td>
                            <td>HIGH</td>
                            <td>₹50,000</td>
                            <td>Blocked</td>
                        </tr>

                        <tr>
                            <td>ACC002</td>
                            <td>MEDIUM</td>
                            <td>₹20,000</td>
                            <td>Monitoring</td>
                        </tr>

                        <tr>
                            <td>ACC003</td>
                            <td>LOW</td>
                            <td>₹5,000</td>
                            <td>Approved</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Dashboard;