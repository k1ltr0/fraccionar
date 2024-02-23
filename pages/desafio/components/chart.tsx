import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import React, { useEffect } from "react";
import { ExchangeRate } from "../domain/exchangerate";

/**
 * Chart component properties
 */
interface ChartProps {
  data: ExchangeRate[];
  multiplier: number;  // TODO: find a better name, may be it should be called "factor" or "ufAmount"
};


/**
 * Display a chart with the exchange rate data
 * @param data Exchange rate data
 * @param multiplier UF multiplier
 * @returns
 */
export const Chart = ({ data, multiplier }: ChartProps) => {

  // create ref to get chart container size
  const [width, setWidth] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  // map exchange rate data to chart data
  const chartData = data.map((row) => ({ name: row.date.toISOString().split('T')[0], clp: row.value * multiplier })).reverse();

  useEffect(() => {
    // set container size once page is loaded.
    if (ref.current) setWidth(ref.current.offsetWidth);
  }, [ref]);

  return (
    <div ref={ref}>
      <AreaChart width={width} height={250} data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFAC20" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFAC20" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis domain={[36650 * multiplier, 37000 * multiplier]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="clp" stroke="#FFAC20" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </div>
  )
};
