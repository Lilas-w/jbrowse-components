import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { generateChartOptions, getDataURL } from './ChartUtils';

interface StackedBarChartProps {
  data: any; // Replace 'any' with the appropriate type for your data
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current!);

    // Process your data to generate the necessary options for the stacked bar chart
    const options = generateChartOptions(data);

    // Set the options and render the chart
    chart.setOption(options);

    // Clean up when the component is unmounted
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default StackedBarChart;
