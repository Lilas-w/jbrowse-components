import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { Dialog, DialogContent, Typography } from '@mui/material';
import * as echarts from 'echarts';

function StackedBarChartDlg(props: { model: any; handleClose: () => void }) {
  const { model, handleClose } = props;
  const [data, setData] = useState([]);
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/clusters');
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData().catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  let chartData: { name: string, percentage: string }[] = []
  if (data.length !== 0) {
    chartData = data.map((item: { name: string, percentage: string }) => ({
      name: item.name,
      percentage: item.percentage
    }));
  }

  let xAxisData: string[] = [];
  if (chartData.length === 2) {
    xAxisData = ['TF1'];
  } else if (chartData.length === 4) {
    xAxisData = ['TF1', 'TF2'];
  } else {
    xAxisData = []; 
  }

  const seriesConfig = chartData.map(item => ({
    name: item.name,
    type: 'bar',
    stack: 'Ad',
    emphasis: {
      itemStyle: {
        opacity: 1,
      },
    },
    data: new Array(chartData.length).fill(parseFloat(item.percentage)),
  }));  

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option: echarts.EChartOption<echarts.EChartOption.Series> = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: seriesConfig,
      };

      chart.setOption(option);

      const resizeListener = () => {
        chart.resize();
      };
  
      window.addEventListener('resize', resizeListener);
  
      return () => {
        chart.dispose();
        window.removeEventListener('resize', resizeListener);
      };
    }
  }, []);

  return (
    <Dialog open onClose={handleClose} title="Show stacked bar">
      <DialogContent>
        <Typography>The stacked bar of the sorting clusters</Typography>
        <div ref={chartRef} style={{ height: '250px' }} />
      </DialogContent>
    </Dialog>
  );
}

export default observer(StackedBarChartDlg);
