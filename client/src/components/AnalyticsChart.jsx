import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AnalyticsChart({ stats }) {
  const data = [
    {
      name: "Pending",
      value: stats?.pending || 0,
    },
    {
      name: "In Progress",
      value: stats?.inProgress || 0,
    },
    {
      name: "Resolved",
      value: stats?.resolved || 0,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#8b5cf6",
    "#10b981",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">

        <div>
          <h2 className="text-3xl font-bold">
            Complaint Analytics
          </h2>

          <p className="text-gray-500 mt-2">
            Real-time complaint statistics
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-center md:text-right">

          <p className="text-gray-500">
            Total Complaints
          </p>

          <h3 className="text-5xl font-bold text-blue-600">
            {stats?.total || 0}
          </h3>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Chart */}

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Status Cards */}

        <div className="space-y-5">

          <div className="bg-yellow-100 p-6 rounded-2xl border-l-8 border-yellow-500 shadow">

            <h3 className="text-lg font-semibold">
              Pending Complaints
            </h3>

            <p className="text-5xl font-bold text-yellow-600 mt-2">
              {stats?.pending || 0}
            </p>

          </div>

          <div className="bg-purple-100 p-6 rounded-2xl border-l-8 border-purple-500 shadow">

            <h3 className="text-lg font-semibold">
              In Progress
            </h3>

            <p className="text-5xl font-bold text-purple-600 mt-2">
              {stats?.inProgress || 0}
            </p>

          </div>

          <div className="bg-green-100 p-6 rounded-2xl border-l-8 border-green-500 shadow">

            <h3 className="text-lg font-semibold">
              Resolved Complaints
            </h3>

            <p className="text-5xl font-bold text-green-600 mt-2">
              {stats?.resolved || 0}
            </p>

          </div>

          <div className="bg-blue-100 p-6 rounded-2xl border-l-8 border-blue-500 shadow">

            <h3 className="text-lg font-semibold">
              Resolution Rate
            </h3>

            <p className="text-5xl font-bold text-blue-600 mt-2">
              {stats?.total
                ? Math.round(
                    (stats.resolved /
                      stats.total) *
                      100
                  )
                : 0}
              %
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsChart;