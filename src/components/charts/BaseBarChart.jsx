import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useWindowSize } from "react-use";
import { useTheme } from "@/context/ThemeProvider";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const GlowingRectangle = (props) => {
  const { fill, x, y, width, height, radius } = props;
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      radius={radius}
      fill={fill}
      style={{ filter: "url(#glow)" }}
    />
  );
};
const CustomTooltip = ({ active, payload, label }) => {
  const { isDark } = useTheme();
  if (active && payload && payload.length) {
    return (
      <div
        className={`bg-custom_bg_three text-custom_text_three py-2 px-6 rounded-md ${
          isDark
            ? "drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
            : "drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        }`}
      >
        {label}
      </div>
    );
  }
};
const CustomTick = ({ x, y, payload }) => {
  const iconSize = 20; // Set the size of the icon

  return (
    <g transform={`translate(${x}, ${y})`}>
      <foreignObject x={-iconSize / 2} y={0} width={iconSize} height={iconSize}>
        <div
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
            alt={payload.value}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* {payload.value} */}
        </div>
      </foreignObject>
      {/* Text Label Below the Image */}
      <text
        x={0}
        y={iconSize + 20} // Position text below the image
        textAnchor="middle"
        fill="#636363"
        fontSize={12}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function BaseBarChart() {
  const { width } = useWindowSize();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          bottom: 30,
        }}
      >
        <defs>
          {/* SVG Filter for Glow Effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />{" "}
            {/* Spread */}
            <feColorMatrix
              in="coloredBlur"
              type="matrix"
              values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.5 0"
            />{" "}
            {/* Opacity reduced to 20% */}
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6682B" stopOpacity={1} />
            <stop offset="50%" stopColor="#F6682B" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#F6682B" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="4 8"
          horizontal
          vertical={false}
          stroke="#4d4d4d"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={<CustomTick />}
        />
        {width > 640 && (
          <YAxis axisLine={false} tickLine={false} className="text-sm" />
        )}
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="pv"
          fill="url(#colorGradient)"
          radius={[5, 5, 5, 5]}
          barSize={30}
          activeBar={<GlowingRectangle fill="#F6682B" />}
          style={{ background: "transparent" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
