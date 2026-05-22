import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const StockChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width: '100%', minWidth: '700px', height: 500, marginTop: '20px' }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 12, fill: '#A8DADC' }}
            tickMargin={10}
            minTickGap={30}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            tick={{ fontSize: 12, fill: '#A8DADC' }} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
            contentStyle={{ backgroundColor: 'rgba(11, 9, 10, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#F1FAEE' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#E63946" /* primary red */
            name="Historical Price"
            dot={false}
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="predicted_price"
            stroke="#FF4D5A" /* lighter red for prediction */
            name="Predicted Price"
            strokeDasharray="5 5"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
