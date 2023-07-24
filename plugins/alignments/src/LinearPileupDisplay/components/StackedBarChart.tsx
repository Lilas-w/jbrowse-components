import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { DialogContent, Typography } from '@mui/material';
import { Dialog } from '@jbrowse/core/ui';
import * as echarts from 'echarts';

function StackedBarChartDlg(props: { model: any; handleClose: () => void }) {
  const { model, handleClose } = props;
  const [data, setData] = useState([]);
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/clusters', {
          credentials: 'include', // Include cookies in the request
        });
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
    fetchData().catch((error) => {
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

  const xAxisNames: string[] = ['TF1', 'TF2'];

  let seriesConfig: {}[] = []
  if (chartData.length === 2) {
    seriesConfig = chartData.map(item => ({
      name: item.name,
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        itemStyle: {
          opacity: 1,
        },
      },
      data: [parseFloat(item.percentage)],
    }));
  } else if (chartData.length === 4){
    seriesConfig = chartData.map(item => ({
      name: item.name,
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        itemStyle: {
          opacity: 1,
        },
      },
      data: [parseFloat(item.percentage), parseFloat(item.percentage)],
    }));
  }

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
          data: xAxisNames.slice(0, chartData.length / 2),
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
  }, [data]);

  return (
    <Dialog open onClose={handleClose} title="Show stacked bar">
      <DialogContent>
        <Typography>
          The stacked bar(%) of the sorting clusters. Please sort by TF(s) first.
        </Typography>
        <div ref={chartRef} style={{ height: '300px' }} />
      </DialogContent>
    </Dialog>
  );
}

export default observer(StackedBarChartDlg);
