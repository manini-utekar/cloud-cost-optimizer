import { useEffect, useMemo, useState } from "react";
import "../App.css";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [resources, setResources] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [anomalies, setAnomalies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [
          summaryResponse,
          resourcesResponse,
          recommendationsResponse,
          anomaliesResponse,
        ] = await Promise.all([
          fetch("http://127.0.0.1:8000/summary"),
          fetch("http://127.0.0.1:8000/resources"),
          fetch("http://127.0.0.1:8000/recommendations"),
          fetch("http://127.0.0.1:8000/anomalies"),
        ]);

        if (
          !summaryResponse.ok ||
          !resourcesResponse.ok ||
          !recommendationsResponse.ok ||
          !anomaliesResponse.ok
        ) {
          throw new Error("Failed to fetch dashboard data");
        }

        const summaryData = await summaryResponse.json();
        const resourcesData = await resourcesResponse.json();
        const recommendationsData = await recommendationsResponse.json();
        const anomaliesData = await anomaliesResponse.json();

        setSummary(summaryData);
        setResources(resourcesData);
        setRecommendations(recommendationsData);

        setAnomalies(
          anomaliesData.filter((resource) => resource.ml_anomaly === -1),
        );
      } catch (err) {
        console.error(err);
        setError("Unable to connect to the backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Average utilization
  const averageUtilization = useMemo(() => {
    if (resources.length === 0) {
      return { cpu: 0, memory: 0 };
    }

    const totalCPU = resources.reduce(
      (sum, resource) => sum + Number(resource.cpu_utilization || 0),
      0,
    );

    const totalMemory = resources.reduce(
      (sum, resource) => sum + Number(resource.memory_utilization || 0),
      0,
    );

    return {
      cpu: Math.round(totalCPU / resources.length),
      memory: Math.round(totalMemory / resources.length),
    };
  }, [resources]);

  // Resource type counts
  const resourceTypes = useMemo(() => {
    const counts = {};

    resources.forEach((resource) => {
      const type = resource.resource_type || "Other";
      counts[type] = (counts[type] || 0) + 1;
    });

    return counts;
  }, [resources]);

  // Highest-cost resources
  const topCostResources = useMemo(() => {
    return [...resources]
      .sort((a, b) => Number(b.monthly_cost || 0) - Number(a.monthly_cost || 0))
      .slice(0, 5);
  }, [resources]);

  if (loading) {
    return (
      <div className="page-message">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-message error-message">
        <h2>{error}</h2>
        <p>Make sure the FastAPI backend is running on port 8000.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="dashboard-header">
        <div>
          <h1>Cloud Cost Optimization</h1>
          <p>AI-powered cloud resource monitoring and cost intelligence</p>
        </div>

        <div className="status-badge">
          <span className="status-dot"></span>
          Backend Connected
        </div>
      </header>

      {/* SUMMARY CARDS */}
      <section className="stats-container">
        <div className="stat-card">
          <div className="card-label">Total Monthly Cost</div>
          <div className="card-value">{summary.total_monthly_cost}</div>
          <div className="card-description">Current resource expenditure</div>
        </div>

        <div className="stat-card savings-card">
          <div className="card-label">Potential Savings</div>
          <div className="card-value">
            {summary.estimated_potential_savings}
          </div>
          <div className="card-description">
            Estimated optimization opportunity
          </div>
        </div>

        <div className="stat-card">
          <div className="card-label">Total Resources</div>
          <div className="card-value">{summary.total_resources}</div>
          <div className="card-description">Resources currently monitored</div>
        </div>

        <div className="stat-card warning-card">
          <div className="card-label">Underutilized</div>
          <div className="card-value">{summary.underutilized_resources}</div>
          <div className="card-description">Resources requiring attention</div>
        </div>

        <div className="stat-card">
          <div className="card-label">Idle Resources</div>
          <div className="card-value">{summary.idle_resources}</div>
          <div className="card-description">Potentially wasteful resources</div>
        </div>

        <div className="stat-card anomaly-card">
          <div className="card-label">ML Anomalies</div>
          <div className="card-value">{summary.ml_anomalies}</div>
          <div className="card-description">
            Detected using Isolation Forest
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="analytics-grid">
        {/* UTILIZATION */}
        <div className="dashboard-card">
          <div className="section-header">
            <div>
              <h2>Resource Utilization</h2>
              <p>Average utilization across monitored resources</p>
            </div>
          </div>

          <div className="utilization-chart">
            <div className="utilization-row">
              <div className="utilization-title">
                <span>CPU</span>
                <strong>{averageUtilization.cpu}%</strong>
              </div>

              <div className="progress">
                <div
                  className="progress-bar cpu-bar"
                  style={{
                    width: `${Math.min(averageUtilization.cpu, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="utilization-row">
              <div className="utilization-title">
                <span>Memory</span>
                <strong>{averageUtilization.memory}%</strong>
              </div>

              <div className="progress">
                <div
                  className="progress-bar memory-bar"
                  style={{
                    width: `${Math.min(averageUtilization.memory, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* RESOURCE TYPES */}
        <div className="dashboard-card">
          <div className="section-header">
            <div>
              <h2>Resource Distribution</h2>
              <p>Resources by type</p>
            </div>
          </div>

          <div className="resource-distribution">
            {Object.entries(resourceTypes).map(([type, count]) => (
              <div className="distribution-row" key={type}>
                <span>{type}</span>

                <div className="distribution-right">
                  <div className="mini-progress">
                    <div
                      className="mini-progress-bar"
                      style={{
                        width: `${(count / resources.length) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <strong>{count}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP COST RESOURCES */}
      <section className="dashboard-card">
        <div className="section-header">
          <div>
            <h2>Highest Cost Resources</h2>
            <p>Resources contributing most to current monthly expenditure</p>
          </div>
        </div>

        <div className="cost-list">
          {topCostResources.map((resource) => (
            <div className="cost-row" key={resource.resource_id}>
              <div className="resource-info">
                <strong>{resource.resource_id}</strong>
                <span>
                  {resource.resource_type} · {resource.region}
                </span>
              </div>

              <div className="cost-bar-container">
                <div
                  className="cost-bar"
                  style={{
                    width: `${
                      (Number(resource.monthly_cost) /
                        Number(topCostResources[0]?.monthly_cost || 1)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>

              <strong className="cost-value">{resource.monthly_cost}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="dashboard-card">
        <div className="section-header">
          <div>
            <h2>AI Optimization Recommendations</h2>
            <p>
              Recommendations generated from utilization rules and ML analysis
            </p>
          </div>

          <span className="count-badge">
            {recommendations.length} recommendations
          </span>
        </div>

        <div className="recommendations-list">
          {recommendations.map((item) => (
            <div className="recommendation-item" key={item.resource_id}>
              <div className="recommendation-resource">
                <strong>{item.resource_id}</strong>

                <span>
                  {item.resource_type} · {item.region}
                </span>
              </div>

              <div className="recommendation-action">
                <strong>{item.recommendation}</strong>

                <span>Estimated savings: {item.estimated_savings}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ML ANOMALIES */}
      <section className="dashboard-card">
        <div className="section-header">
          <div>
            <h2>ML Anomaly Detection</h2>
            <p>Resources identified as unusual by Isolation Forest</p>
          </div>

          <span className="anomaly-count">{anomalies.length} detected</span>
        </div>

        <div className="anomaly-grid">
          {anomalies.map((resource) => (
            <div className="anomaly-item" key={resource.resource_id}>
              <div className="anomaly-header">
                <strong>{resource.resource_id}</strong>

                <span className="anomaly-tag">Anomaly</span>
              </div>

              <p>
                {resource.resource_type} · {resource.region}
              </p>

              <div className="anomaly-stats">
                <span>
                  CPU: <strong>{resource.cpu_utilization}%</strong>
                </span>

                <span>
                  Memory: <strong>{resource.memory_utilization}%</strong>
                </span>

                <span>
                  Cost: <strong>{resource.monthly_cost}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESOURCE TABLE */}
      <section className="dashboard-card">
        <div className="section-header">
          <div>
            <h2>Resource Details</h2>
            <p>Current cloud resources monitored by the platform</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Resource</th>
                <th>Type</th>
                <th>Region</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Monthly Cost</th>
              </tr>
            </thead>

            <tbody>
              {resources.map((resource) => (
                <tr key={resource.resource_id}>
                  <td>
                    <strong>{resource.resource_id}</strong>
                  </td>

                  <td>{resource.resource_type}</td>

                  <td>{resource.region}</td>

                  <td>{resource.cpu_utilization}%</td>

                  <td>{resource.memory_utilization}%</td>

                  <td>
                    <strong>{resource.monthly_cost}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
