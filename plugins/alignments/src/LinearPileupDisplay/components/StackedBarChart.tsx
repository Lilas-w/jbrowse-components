import React, { useEffect, useRef } from 'react';
import echarts, { EChartOption } from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';

interface StackedBarChartProps {
  seriesData: { name: string; data: number[] }[];
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ seriesData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const options: EChartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: seriesData.map(series => series.name)
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: seriesData.map(series => ({
          name: series.name,
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: series.data
        }))
      };

      chart.setOption(options);

      return () => {
        chart.dispose();
      };
    }
  }, [seriesData]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default StackedBarChart;