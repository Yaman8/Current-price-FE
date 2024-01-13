import { useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  const chartData = useMemo(() => {
    const keys = Object.keys(data?.bpi);
    const chartArray = keys.map((currency) => {
      const currencyObject = {
        code: currency,
        rate: data?.bpi?.[currency]?.rate_float,
      };
      return currencyObject;
    });
    return chartArray;
  }, [data]);
  return (
    <>
      <div className="flex mx-6 my-4 grid grid-cols-1 lg:grid-cols-2 ">
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart width={600} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="rate" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="code" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={600}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="code" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="rate"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Chart;
