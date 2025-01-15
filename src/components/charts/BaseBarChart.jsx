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
const CustomTooltip = ({ active, payload, tooltipDataKey, tooltipLabel }) => {
  const { isDark } = useTheme();
  if (active && payload && payload.length) {
    console.log({ payload })
    return (
      <div
        className={`bg-custom_bg_three capitalize text-custom_text_three py-2 px-6 rounded-md ${isDark
          ? "drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
          : "drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          }`}
      >
        {payload[0].payload[tooltipLabel]}: SAR {payload[0].payload[tooltipDataKey]}
      </div>
    );
  }
};
const CustomTick = ({ x, y, payload }) => {
  const iconSize = 20; // Set the size of the icon

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* <foreignObject x={-iconSize / 2} y={0} width={iconSize} height={iconSize}>
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
        </div>
      </foreignObject> */}
      {/* Text Label Below the Image */}
      <text
        x={0}
        y={20} // Position text below the image iconSize + 20
        textAnchor="middle"
        fill="#636363"
        fontSize={12}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function BaseBarChart({
  data,
  xAxisDataKey,
  barDataKey,
  tooltipDataKey,
  tooltipLabel,
  max
}) {
  // data,xAxisDataKey.barDataKey,tooltipDataKey
  const { width } = useWindowSize();
  return (
    <ResponsiveContainer
      width={width > 640 ? "100%" : 400}
      // width={1200}
      // height={200}
      style={{
        // minWidth: "1000px",
        overflow: "auto",
      }}
    >
      <BarChart
        // width={600}
        // height={200}
        data={data}
        margin={{
          left: 30,
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
          dataKey={xAxisDataKey}
          axisLine={false}
          tickLine={false}
        // tick={<CustomTick />}
        />

        {width > 640 && (
          <YAxis
            axisLine={false}
            tickLine={false}
            className="text-sm"
            tickCount={8}
            domain={[0, max]}
          />
        )}
        <Tooltip content={<CustomTooltip tooltipDataKey={tooltipDataKey} tooltipLabel={tooltipLabel} />} />
        <Bar
          dataKey={barDataKey}
          fill="url(#colorGradient)"
          radius={[5, 5, 5, 5]}
          barSize={30}
          activeBar={<GlowingRectangle fill="#F6682B" />}
          style={{ background: "transparent" }}
        // minPointSize={1}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
