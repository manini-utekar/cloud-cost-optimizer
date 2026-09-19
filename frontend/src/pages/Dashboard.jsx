import "../App.css";

function Dashboard() {
  return (
    <div className="app">
      <h1>Cloud Cost Optimization Dashboard</h1>

      <p>AI-powered cloud resource monitoring and cost optimization</p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Cloud Cost</h3>
          <h2>$12,450</h2>
          <p>Monthly estimated cost</p>
        </div>

        <div className="stat-card">
          <h3>Potential Savings</h3>
          <h2>$2,840</h2>
          <p>Estimated optimization savings</p>
        </div>

        <div className="stat-card">
          <h3>Total Resources</h3>
          <h2>120</h2>
          <p>Cloud resources monitored</p>
        </div>

        <div className="stat-card">
          <h3>Underutilized</h3>
          <h2>8</h2>
          <p>Resources requiring attention</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Monthly Cost Trend</h2>

          <div className="chart">
            <div className="bar" style={{ height: "40%" }}></div>
            <div className="bar" style={{ height: "55%" }}></div>
            <div className="bar" style={{ height: "48%" }}></div>
            <div className="bar" style={{ height: "70%" }}></div>
            <div className="bar" style={{ height: "62%" }}></div>
            <div className="bar" style={{ height: "80%" }}></div>
          </div>

          <div className="chart-labels">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Resource Utilization</h2>

          <div className="utilization-item">
            <div className="utilization-header">
              <span>CPU</span>
              <span>42%</span>
            </div>

            <div className="progress">
              <div className="progress-bar" style={{ width: "42%" }}></div>
            </div>
          </div>

          <div className="utilization-item">
            <div className="utilization-header">
              <span>Memory</span>
              <span>58%</span>
            </div>

            <div className="progress">
              <div className="progress-bar" style={{ width: "58%" }}></div>
            </div>
          </div>

          <div className="utilization-item">
            <div className="utilization-header">
              <span>Storage</span>
              <span>35%</span>
            </div>

            <div className="progress">
              <div className="progress-bar" style={{ width: "35%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
