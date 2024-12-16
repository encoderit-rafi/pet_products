import Title from "@/assets/icons/Title";
import BorderBox from "@/components/BorderBox";
import Chart from "@/components/Chart";
import InputSearch from "@/components/InputSearch";

import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: "Progress", value: 75, color: "#55a630" }, // Progress color
  { name: "Remaining", value: 25, color: "#b3b3b3" }, // Track color
];

const DashedData = [
  { name: "DashedCircle", value: 100, color: "#6e6e6e" },
];

// const renderActiveShape = (props) => {
//   const RADIAN = Math.PI / 180;
//   const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? 'start' : 'end';

//   return (
//     <g>

//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />


//     </g>
//   );
// };
export default function Home() {
  return (
    <div className="">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <Title>
            Total Sales
          </Title>
        </div>
        <div className="col-span-3">
          <InputSearch placeholder="search dashboard" />

        </div>
        <div className="col-span-9 h-72">
          <BorderBox>
            <Chart />
          </BorderBox>
        </div>
        <div className="col-span-3">
          <BorderBox>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>

                <Pie
                  data={[{ name: "DashedCircle", value: 100 }]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={60}
                  stroke="#6e6e6e"
                  fill="none"
                  strokeDasharray="3 3" // Dashed pattern
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
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>


          </BorderBox>

        </div>

      </div>
      {/* <Chart /> */}

    </div>
  );
}
