"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export interface Experience {
  _id: string;
  country: string;
  catagory: string;
  image: string;
  rating: number;
  title: string;
  subTitle: string;
  experience: string;
  price: number;
}

interface PieChartWithCustomizedLabelProps {
  data: Experience[];
}

const COLORS: Record<string, string> = {
  Adventure: "#0088FE",
  Culture: "#00C49F",
  Foods: "#FFBB28",
  Wellness: "#FF8042",
  wildlife: "#AF19FF",
  "City Break": "#FF4560",
};

const PieChartWithCustomizedLabel = ({
  data,
}: PieChartWithCustomizedLabelProps) => {
  // Count experiences by category
  const chartData = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.catagory]) {
        acc[item.catagory] = {
          name: item.catagory,
          value: 0,
        };
      }

      acc[item.catagory].value += 1;

      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={170}
            label={({ name, percent }) =>
              `${name} ${(percent! * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name] ?? "#8884d8"}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartWithCustomizedLabel;