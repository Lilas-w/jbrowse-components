import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { Dialog, DialogContent, Typography } from '@mui/material'
import * as echarts from 'echarts';
import { StackedBarChartData } from '../../PileupRenderer/StackedBarChartData';

function StackedBarChartDlg(props: { model: any; handleClose: () => void }) {
  const { model, handleClose } = props
  const chartRef = useRef<HTMLDivElement | null>(null)
  console.log(StackedBarChartData.seriesData);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)

      const option = {
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
              data: ['TF1', 'TF2'],
              axisType: 'category', // Add this line
            },
          ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'R11',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [0.31, 0.31]
          },
          {
            name: 'R10',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [0.25, 0.25]
          },
          {
            name: 'R01',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [0, 0]
          },
          {
            name: 'R00',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [0.44, 0.44]
          }
        ]
      }

      chart.setOption(option)
      window.addEventListener('resize', () => {
        chart.resize()
      })

      return () => {
        chart.dispose()
        window.removeEventListener('resize', () => {
          chart.resize()
        })
      }
    }
  }, [])

  return (
    <Dialog open onClose={handleClose} title="Show stacked bar">
      <DialogContent>
        <Typography>The stacked bar of the sorting clusters</Typography>
        <div ref={chartRef} style={{ height: '300px' }} />
      </DialogContent>
    </Dialog>
  )
}

export default observer(StackedBarChartDlg)
