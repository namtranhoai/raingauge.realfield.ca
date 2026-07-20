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

/**
 * Compares precipitation sums across years (used for both the growing
 * season and the crop year). Expects {data: [{year, precip_sum}]}.
 */
function YearlyComparisonChart({ seasonData, seriesName = 'Season' }) {
  const rows = Array.isArray(seasonData)
    ? seasonData
    : Array.isArray(seasonData?.data)
      ? seasonData.data
      : [];
  if (rows.length === 0) return null;

  const values = rows.map((row) => row.precip_sum);
  const dataWithoutLast = values.slice(0, -1);
  const average =
    dataWithoutLast.length > 0
      ? dataWithoutLast.reduce((sum, v) => sum + v, 0) / dataWithoutLast.length
      : 0;

  const chartData = rows.map((row) => ({
    year: String(row.year),
    precip: row.precip_sum,
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
            name={seriesName}
            stroke="#1480c7"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#1480c7', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="average"
            name="Historical avg"
            stroke="#e8590c"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default YearlyComparisonChart;
