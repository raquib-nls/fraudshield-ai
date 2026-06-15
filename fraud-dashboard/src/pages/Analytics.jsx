import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const riskData = [
  { name: "Low", value: 75 },
  { name: "Medium", value: 20 },
  { name: "High", value: 5 },
];

const transactionData = [
  { month: "Jan", count: 120 },
  { month: "Feb", count: 180 },
  { month: "Mar", count: 260 },
  { month: "Apr", count: 340 },
  { month: "May", count: 420 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function Analytics() {
  return (
    <>
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "25px",
        }}
      >
        Fraud Analytics
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div className="card">
          <h2>98.4%</h2>
          <p>Detection Accuracy</p>
        </div>

        <div className="card">
          <h2>0.12s</h2>
          <p>Avg Response Time</p>
        </div>

        <div className="card">
          <h2>53</h2>
          <p>Frauds Prevented</p>
        </div>

        <div className="card">
          <h2>₹2.4L</h2>
          <p>Money Saved</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
          }}
        >
          <h2>Risk Distribution</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={riskData}
                dataKey="value"
                outerRadius={100}
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

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
          }}
        >
          <h2>Transaction Volume</h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={transactionData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default Analytics;