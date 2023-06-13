import * as echarts from 'echarts';

// Function to generate the chart options based on the provided data
export function generateChartOptions(data: any): echarts.EChartsOption {
    // Process the data and generate the necessary chart options
    // ...
    
    // Return the generated options
    return {
      // Chart options
      // ...
    };
  }

export function getDataURL(data: any): string {
  const chart = echarts.init(document.createElement('div'));

  // Process your data to generate the necessary options for the stacked bar chart
  const options = generateChartOptions(data);

  // Set the options and render the chart
  chart.setOption(options);

  // Get the base64-encoded data URL of the chart image
  const dataURL = chart.getDataURL({
    type: 'png',
    pixelRatio: 2, // Adjust the pixel ratio as needed
  });

  // Dispose the chart instance
  chart.dispose();

  return dataURL;
}
