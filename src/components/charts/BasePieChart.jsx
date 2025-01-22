import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Progress", value: 75, color: "#55a630" }, // Progress color
  { name: "Remaining", value: 25, color: "#b3b3b3" }, // Track color
];

const DashedData = [{ name: "DashedCircle", value: 100, color: "#6e6e6e" }];

export default function BasePieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        {/* Dashed Circle */}
        <Pie
          data={DashedData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={65}
          stroke="#adadad"
          fill="none"
          strokeDasharray="5 5" // Dashed pattern
          isAnimationActive={false}
        />

        {/* Progress Circle */}
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={85}
          cornerRadius={10} // Rounded corners
          startAngle={90} // Rotate to match design
          endAngle={-270}
          paddingAngle={2}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
