import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { DialogContent, Typography } from '@mui/material';
import { Dialog } from '@jbrowse/core/ui';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts';
import { StackedBarChartData } from '../../PileupRenderer/StackedBarChartData';

function StackedBarChartDlg(props: { model: any; handleClose: () => void }) {
  const { model, handleClose } = props;
  const chartRef = useRef<HTMLDivElement | null>(null);
  console.log(StackedBarChartData.seriesData);

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
      data: ['TF1', 'TF2'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'R11',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          itemStyle: {
            opacity: 1,
          },
        },
        data: [0.31, 0.31],
      },
      {
        name: 'R10',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          itemStyle: {
            opacity: 1,
          },
        },
        data: [0.25, 0.25],
      },
      {
        name: 'R01',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          itemStyle: {
            opacity: 1,
          },
        },
        data: [0, 0],
      },
      {
        name: 'R00',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          itemStyle: {
            opacity: 1,
          },
        },
        data: [0.44, 0.44],
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

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
        <ReactEchartsCore
          echarts={echarts}
          option={option}
          style={{ height: '300px' }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default observer(StackedBarChartDlg);
