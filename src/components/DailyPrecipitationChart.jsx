import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function DailyPrecipitationChart({ dailyData }) {
  if (!dailyData) return null;

  const dates = Object.keys(dailyData).reverse();
  const chartData = dates.map((date) => {
    const [, month, day] = date.split('-');
    return {
      label: `${day}/${month}`,
      precip: dailyData[date].precip,
    };
  });

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis
            tick={{ fontSize: 11 }}
            unit="mm"
            width={48}
          />
          <Tooltip formatter={(value) => [`${value} mm`, 'Precip']} />
          <Bar dataKey="precip" fill="#1480c7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyPrecipitationChart;
