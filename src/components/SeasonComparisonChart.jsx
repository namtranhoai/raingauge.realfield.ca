import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

function SeasonComparisonChart({ seasonData }) {
  if (!seasonData) return null;

  const years = Object.keys(seasonData);
  const values = years.map((key) => seasonData[key].precip_sum);
  const dataWithoutLast = values.slice(0, -1);
  const average =
    dataWithoutLast.length > 0
      ? dataWithoutLast.reduce((sum, v) => sum + v, 0) / dataWithoutLast.length
      : 0;

  const chartData = years.map((key) => ({
    year: String(seasonData[key].year),
    precip: seasonData[key].precip_sum,
    average,
  }));

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} unit="mm" width={48} />
          <Tooltip formatter={(value, name) => [`${Number(value).toFixed(1)} mm`, name]} />
          <Legend />
          <Line
            type="monotone"
            dataKey="precip"
            name="Season"
            stroke="#0000ff"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="average"
            name="Historical avg"
            stroke="#ff0000"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SeasonComparisonChart;
