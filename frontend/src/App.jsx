function App() {
  return (
    <div className="app">
      <h1>Cloud Cost Optimization</h1>
      <p>AI-Powered Cloud Resource Intelligence Platform</p>

      {/* Statistics */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Cloud Cost</h3>
          <h2>$12,450</h2>
          <p>This Month</p>
        </div>

        <div className="stat-card">
          <h3>Potential Savings</h3>
          <h2>$3,280</h2>
          <p>Estimated</p>
        </div>

        <div className="stat-card">
          <h3>Total Resources</h3>
          <h2>48</h2>
          <p>Active Resources</p>
        </div>

        <div className="stat-card">
          <h3>Idle Resources</h3>
          <h2>9</h2>
          <p>Need Attention</p>
        </div>
      </div>

      {/* Cost and Utilization */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Monthly Cost Trend</h2>

          <div className="chart">
            <div className="bar" style={{ height: "45%" }}></div>
            <div className="bar" style={{ height: "60%" }}></div>
            <div className="bar" style={{ height: "50%" }}></div>
            <div className="bar" style={{ height: "75%" }}></div>
            <div className="bar" style={{ height: "65%" }}></div>
            <div className="bar" style={{ height: "85%" }}></div>
          </div>

          <div className="chart-labels">
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Resource Utilization</h2>

          <div className="utilization-item">
            <div className="utilization-header">
              <span>CPU</span>
              <span>62%</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "62%" }}></div>
            </div>
          </div>

          <div className="utilization-item">
            <div className="utilization-header">
              <span>Memory</span>
              <span>48%</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "48%" }}></div>
            </div>
          </div>

          <div className="utilization-item">
            <div className="utilization-header">
              <span>Storage</span>
              <span>71%</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "71%" }}></div>
            </div>
          </div>

          <div className="utilization-item">
            <div className="utilization-header">
              <span>Network</span>
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

export default App;
