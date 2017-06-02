import React, {Component} from 'react';
import {Grid, Col} from "react-bootstrap";
import axios from 'axios';
import { ChartCanvas, Chart, series } from "react-stockcharts";
import { scale, coordinates, tooltip } from "react-stockcharts";
import { axes, indicator, helper } from "react-stockcharts";
import { scaleTime } from "d3-scale";
import 'moment/locale/nb';
let { CandlestickSeries } = series;
let { XAxis, YAxis } = axes;
let { fitWidth } = helper;
class ChartContainer extends Component {

  constructor(props){
    super(props);
    this.state = { currencies: {}, tickers: {} };

  }
  getStyle = () => {
    return {
      tickerList: {
      },
    }
  }

  render = () => {
    let styles = this.getStyle();

    // let { type, width, data, ratio } = this.props;
    let type = 'svg'
    let width = 500
    let periods = this.props.periods;
    console.log(periods)
    if (periods) {
      periods.forEach((d, i) => {
        d.date = new Date(periods[i].date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;
        //console.log(d);
      })
      return (
        <Col md={4} lg={8} sm={6} xs={12}>
          <ChartCanvas ratio={1} width={width} height={500}
              margin={{ left: 50, right: 50, top: 10, bottom: 30 }} type={type}
              seriesName={ this.props.pair }
              data={ periods }
              xAccessor={d => d.date} xScale={scaleTime()}>

            <Chart id={1} yExtents={d => [d.high + (d.low * 0.02), d.low-(d.low * 0.02)]}>
              <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
              <YAxis axisAt="left" orient="left" ticks={5} />
              <CandlestickSeries />
            </Chart>
          </ChartCanvas>
        </Col>
      )
    }

    return (
      <div>Loading</div>
    )
  }
}

export default ChartContainer;
