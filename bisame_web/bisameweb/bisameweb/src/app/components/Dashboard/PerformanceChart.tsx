'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { FaChartArea, FaUsers, FaDollarSign } from 'react-icons/fa';

interface ChartData {
  period: string;
  affiliates: number;
  earnings: number;
  affiliatesFormatted: string;
  earningsFormatted: string;
}

const PerformanceChart = () => {
  const data: ChartData[] = [
    {
      period: 'Today',
      affiliates: 121,
      earnings: 3410,
      affiliatesFormatted: '121 Affiliates',
      earningsFormatted: '₵3410'
    },
    {
      period: 'This Week',
      affiliates: 815,
      earnings: 21150,
      affiliatesFormatted: '815 Affiliates',
      earningsFormatted: '₵21,150'
    },
    {
      period: 'This Month',
      affiliates: 1324,
      earnings: 18750,
      affiliatesFormatted: '1324 Affiliates',
      earningsFormatted: '₵18,750'
    }
  ];

  // Custom tooltip component
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      dataKey: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-md shadow-sm space-y-6 border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">
                {entry.dataKey === 'affiliates' ? 'Affiliates:' : 'Earnings:'}
              </span>
              <span className="font-medium text-gray-800">
                {entry.dataKey === 'affiliates' 
                  ? entry.value.toLocaleString() 
                  : `₵${entry.value.toLocaleString()}`
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  interface LegendProps {
    payload?: Array<{
      dataKey: string;
      color: string;
    }>;
  }

  const CustomLegend = ({ payload }: LegendProps) => {
    if (!payload) return null;
    
    return (
      <div className="flex justify-center space-x-6 mt-4">
        {payload.map((entry, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-600">
              {entry.dataKey === 'affiliates' ? 'Affiliates' : 'Earnings ($)'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-2xl p-6 bg-[#FCFCFC]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between mb-6">
        <div className="flex  items-center space-x-3">
          {/* <div className="flex items-center justify-center w-10 h-10 
                         bg-gradient-to-br from-purple-50 to-purple-100 
                         rounded-lg border border-purple-200">
            <FaChartArea className="text-purple-600 text-lg" />
          </div> */}
          <div>
            <h2 className="text-sm md:text-lg font-semibold text-gray-700">Performance Overview</h2>
            <p className="text-xs md:text-sm text-gray-600">Affiliates and earnings trends</p>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="flex justify-between md:space-x-10">
          <div className="md:text-right">
            <div className="flex md:items-center space-x-1 text-[#1AE8CE]">
              <FaUsers className="text-sm" />
              <span className="text-sm font-medium">Total Affiliates</span>
            </div>
            <div className="text-lg font-semibold text-gray-700">
              {(12 + 85 + 324).toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-gray-500">
              <FaDollarSign className="text-sm" />
              <span className="text-sm font-medium">Total Earnings</span>
            </div>
            <div className="text-lg font-semibold text-gray-700">
              ₵{(340 + 2150 + 8750).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-40 md:h-60 w-full bg- ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
          >
            {/* Grid */}
            <CartesianGrid 
              strokeDasharray="5 5" 
              stroke="#f0f0f0"
              horizontal={true}
              vertical={true}
            />
            
            <XAxis 
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              yAxisId="affiliates"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 'dataMax + 50']}
            />
            <YAxis 
              yAxisId="earnings"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value: number) => `$${value}`}
              domain={[0, 'dataMax + 1000']}
            />
            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />
            
            {/* Legend */}
            <Legend content={<CustomLegend />} />
            
            {/* Areas */}
            <Area
              yAxisId="earnings"
              type="monotone"
              dataKey="earnings"
              stroke="#f97316"
              strokeWidth={1}
              fill="url(#earningsGradient)"
              fillOpacity={0.6}
              dot={{ fill: '#f97316', strokeWidth: 1, r: 3 }}
              activeDot={{ r: 8, stroke: '#f97316', strokeWidth: 2, fill: '#fff' }}
            />
            <Area
              yAxisId="affiliates"
              type="monotone"
              dataKey="affiliates"
              stroke="#3b82f6"
              strokeWidth={1}
              fill="url(#affiliatesGradient)"
              fillOpacity={0.6}
              dot={{ fill: '#3b82f6', strokeWidth: 1, r: 3 }}
              activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="affiliatesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">{item.period}</div>
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <FaUsers className="text-blue-500 text-xs" />
                  <span className="text-sm font-semibold text-blue-600">
                    {item.affiliates.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <FaDollarSign className="text-orange-500 text-xs" />
                  <span className="text-sm font-semibold text-orange-600">
                    {item.earnings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
