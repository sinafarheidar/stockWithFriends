// import React from 'react'
// import Chart from "react-google-charts";
// import Button from '@material-ui/core/Button';
// export default function StockChart(props) {
//     return (
//         <div>
//         <Chart
//   width={'350px'}
//   height={'250px'}
//   chartType="PieChart"
//   loader={<div>Loading Chart</div>}
//   data={[
//     ['Stock', 'Analyst Rating'],
//     ['Buy', props.buy],
//     ['Sell', props.sell],
//     ['Hold', props.hols],
//     ['Strong Buy', props.strongBuy],
//     ['Strong Hold', props.strongSell],
//   ]}
//   options={{
//     title: `${props.stock} Recommendation Rating`,
//   }}
//   rootProps={{ 'data-testid': '1' }}
// />
// <Button variant='outlined' color='primary' href={`https://stockcharts.com/h-sc/ui?s=${props.stock}`} target="_blank">{props.stock} on StockCharts</Button>
// </div>
//     )
// }
