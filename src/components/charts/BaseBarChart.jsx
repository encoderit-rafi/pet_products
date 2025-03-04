// import {
//   BarChart,
//   Bar,
//   Rectangle,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useWindowSize } from "react-use";
// import { useTheme } from "@/context/ThemeProvider";
// import ImageDialog from "../dialogs/ImageDialog";
// import getImageUrl from "@/lib/utils/getImageUrl";

// const GlowingRectangle = (props) => {
//   const { fill, x, y, width, height, radius } = props;
//   return (
//     <Rectangle
//       x={x}
//       y={y}
//       width={width}
//       height={height}
//       radius={radius}
//       fill={fill}
//       style={{ filter: "url(#glow)" }}
//     />
//   );
// };
// const CustomTooltip = ({
//   active,
//   payload,
//   tooltipDataKey,
//   tooltipLabel,
//   tooltipPrefix = "",
// }) => {
//   const { isDark } = useTheme();
//   if (active && payload && payload.length) {
//     ({ payload });
//     return (
//       <div
//         className={`bg-custom_bg_three capitalize text-sm text-custom_text_three py-2 px-6 rounded-md ${
//           isDark
//             ? "drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
//             : "drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
//         }`}
//       >
//         {payload[0].payload[tooltipLabel]}: {tooltipPrefix} {""}
//         {parseInt(payload[0].payload[tooltipDataKey], 10).toLocaleString()}
//       </div>
//     );
//   }
// };
// const CustomTick = ({ x, y, payload, data, showIcon }) => {
//   console.log("🚀 ~ CustomTick ~ data:", data[payload.index]);
//   const iconSize = 30; // Set the size of the icon
//   // const iconURL = data[payload.index].logo || "/placeholder-image.webp"; // Set the size of the icon
//   const iconURL = data[payload.index].series; // Set the size of the icon
//   console.log("🚀 ~ CustomTick ~ iconURL:", iconURL);

//   return (
//     <g transform={`translate(${x}, ${y})`}>
//       {showIcon && (
//         <foreignObject
//           x={-iconSize / 2}
//           y={0}
//           width={iconSize}
//           height={iconSize}
//         >
//           <div
//             style={{
//               width: `${iconSize}px`,
//               height: `${iconSize}px`,
//               borderRadius: "50%",
//               overflow: "hidden",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               background: "white",
//             }}
//           >
//             <img
//               src={getImageUrl(iconURL, "logo", "jpg")}
//               alt={payload.value}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//               onError={(e) => (e.target.src = "/placeholder-image.webp")}
//             />
//           </div>
//         </foreignObject>
//       )}
//       <text
//         x={0}
//         y={20 + (showIcon ? iconSize : 0)} // Position text below the image iconSize + 20
//         textAnchor="middle"
//         fill="#636363"
//         fontSize={12}
//       >
//         {payload.value}
//       </text>
//     </g>
//   );
// };

// export default function BaseBarChart({
//   data,
//   xAxisDataKey,
//   barDataKey,
//   tooltipDataKey,
//   tooltipLabel,
//   tooltipPrefix,
//   max,
//   showIcon = false,
// }) {
//   const { width } = useWindowSize();
//   return (
//     <ResponsiveContainer
//       width={width > 640 ? "100%" : 400}
//       style={{
//         overflow: "auto",
//       }}
//     >
//       <BarChart
//         data={data}
//         margin={{
//           left: 30,
//           bottom: 30,
//         }}
//       >
//         <defs>
//           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//             <feGaussianBlur stdDeviation="6" result="coloredBlur" />{" "}
//             <feColorMatrix
//               in="coloredBlur"
//               type="matrix"
//               values="1 0 0 0 0
//               0 1 0 0 0
//               0 0 1 0 0
//               0 0 0 0.5 0"
//             />{" "}
//             <feMerge>
//               <feMergeNode in="coloredBlur" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>

//           <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#F6682B" stopOpacity={1} />
//             <stop offset="50%" stopColor="#F6682B" stopOpacity={0.2} />
//             <stop offset="100%" stopColor="#F6682B" stopOpacity={0.04} />
//           </linearGradient>
//         </defs>
//         <CartesianGrid
//           strokeDasharray="4 8"
//           horizontal
//           vertical={false}
//           stroke="#4d4d4d"
//         />
//         <XAxis
//           dataKey={xAxisDataKey}
//           axisLine={false}
//           tickLine={false}
//           tick={<CustomTick data={data} showIcon={showIcon} />}
//         />

//         {width > 640 && (
//           <YAxis
//             axisLine={false}
//             tickLine={false}
//             className="text-sm"
//             tickCount={8}
//             domain={[0, max]}
//           />
//         )}
//         <Tooltip
//           content={
//             <CustomTooltip
//               tooltipDataKey={tooltipDataKey}
//               tooltipLabel={tooltipLabel}
//               tooltipPrefix={tooltipPrefix}
//             />
//           }
//         />
//         <Bar
//           dataKey={barDataKey}
//           fill="url(#colorGradient)"
//           radius={[5, 5, 5, 5]}
//           barSize={30}
//           activeBar={<GlowingRectangle fill="#F6682B" />}
//           style={{ background: "transparent" }}
//           // minPointSize={1}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }
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
import ImageDialog from "../dialogs/ImageDialog";
import getImageUrl from "@/lib/utils/getImageUrl";

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
const CustomTooltip = ({
  active,
  payload,
  tooltipDataKey,
  tooltipLabel,
  tooltipPrefix = "",
}) => {
  const { isDark } = useTheme();
  if (active && payload && payload.length) {
    ({ payload });
    return (
      <div
        className={`bg-custom_bg_three capitalize text-sm text-custom_text_three py-2 px-6 rounded-md ${
          isDark
            ? "drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
            : "drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        }`}
      >
        {payload[0].payload[tooltipLabel]}: {tooltipPrefix} {""}
        {parseInt(payload[0].payload[tooltipDataKey], 10).toLocaleString()}
      </div>
    );
  }
};
const CustomTick = ({ x, y, payload, data, showIcon }) => {
  const iconSize = 30; // Set the size of the icon
  // const iconURL = data[payload.index].logo || "/placeholder-image.webp"; // Set the size of the icon
  const iconURL = data[payload.index].series; // Set the size of the icon

  return (
    <g transform={`translate(${x}, ${y})`}>
      {showIcon && (
        <foreignObject
          x={-iconSize / 2}
          y={0}
          width={iconSize}
          height={iconSize}
        >
          <div
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
            }}
          >
            <img
              src={getImageUrl(iconURL, "logo", "jpg")}
              alt={payload.value}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={(e) => (e.target.src = "/placeholder-image.webp")}
            />
          </div>
        </foreignObject>
      )}
      <text
        x={0}
        y={20 + (showIcon ? iconSize : 0)} // Position text below the image iconSize + 20
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
  tooltipPrefix,
  max,
  showIcon = false,
}) {
  const { width } = useWindowSize();
  return (
    <ResponsiveContainer width="100%">
      <div style={{ overflowX: "auto", paddingBottom: "10px" }}>
        <BarChart
          width={data.length * 100} // Controls total width, adjust as needed
          height={350}
          data={data}
          margin={{ left: 30, bottom: 30 }}
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feColorMatrix
                in="coloredBlur"
                type="matrix"
                values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.5 0"
              />
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
            tick={<CustomTick data={data} showIcon={showIcon} />}
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
          <Tooltip
            content={
              <CustomTooltip
                tooltipDataKey={tooltipDataKey}
                tooltipLabel={tooltipLabel}
                tooltipPrefix={tooltipPrefix}
              />
            }
          />
          <Bar
            dataKey={barDataKey}
            fill="url(#colorGradient)"
            radius={[5, 5, 5, 5]}
            barSize={40} // Fixed bar width
            barGap={10} // Fixed gap between bars
            barCategoryGap={20} // Controls gap between groups (if multiple bars exist)
            activeBar={<GlowingRectangle fill="#F6682B" />}
          />
        </BarChart>
      </div>
    </ResponsiveContainer>
  );
}
