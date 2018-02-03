import * as d3 from 'd3';
import * as utils from './utils';

const MAX_DAY_SECONDS = 24 * 60 * 60;

type SvgType = d3.Selection<d3.BaseType, {}, HTMLElement, any>;
type DataType = Array<{ time: number[], style: string }>;

function convert(date: string | number) {
  const value = typeof date === 'string' ?
    utils.DateFormatter.fromUtcString(date).getSecondsOfToday() :
    date;
  return (value / MAX_DAY_SECONDS) * 2 * Math.PI;
}

export function drawSunriseSunsetArc(
  data: SunsetSunrise,
  targetElement: HTMLElement
) {
  // http://wordpress.mrreid.org/2013/02/05/dawn-dusk-sunrise-sunset-and-twilight/
  // https://sunrise-sunset.org/

  const dawn = [data.civil_twilight_begin, data.sunrise].map(convert);
  const day = [data.sunrise, data.sunset].map(convert);
  const dusk = [data.sunset, data.civil_twilight_end].map(convert);
  const night = [data.civil_twilight_end, data.civil_twilight_begin].map(convert);
  // to ensure it goes over the rainbow...
  night[1] += 2 * Math.PI;

  const info: DataType = [
    { style: 'dawn', time: dawn },
    { style: 'day', time: day },
    { style: 'dusk', time: dusk },
    { style: 'night', time: night }
  ];

  drawSunsetSunrise(info, targetElement);
}

export function drawSunsetSunrise(data: DataType, targetElement: HTMLElement) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const radius = Math.min(width, height) * 0.7 / 2;

  const svg: SvgType = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const plotGroup: SvgType = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})rotate(180)`);

  drawSlices(plotGroup, radius, data);
  drawNeedle(plotGroup, radius);

  plotGroup
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .style('opacity', 1);
}

function drawSlices(svg: SvgType, radius: number, data: DataType) {
  for (const d of data) {
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(d.time[0])
      .endAngle(d.time[1]);

    // Added height and width so arc is visible
    svg
      .append('path')
      .attr('d', arc)
      .classed(d.style, true);
  }
}

function drawNeedle(svg: SvgType, radius: number) {
  const now = new utils.DateFormatter().getSecondsOfToday();

  // rotation is in degrees!
  const rotation = now * (360 / MAX_DAY_SECONDS);

  svg.append('line')
    .classed('marker', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', -radius)
    .attr('transform', `rotate(${rotation})`);
}

function defGradients(svg: SvgType) {
  // TODO: the following is unused/broken.
  const defs = svg.append('defs');

  const gradient = defs.append('linearGradient')
    .attr('id', 'svgGradient')
    .attr('x1', '20%')
    .attr('x2', '100%')
    .attr('y1', '20%')
    .attr('y2', '100%');

  gradient.append('stop')
    .attr('class', 'start')
    .attr('offset', '0%')
    .attr('stop-color', 'rgb(9, 22, 80)')
    .attr('stop-opacity', 1);

  gradient.append('stop')
    .attr('class', 'end')
    .attr('offset', '100%')
    .attr('stop-color', 'rgb(216, 218, 230)')
    .attr('stop-opacity', 1);

  // const gradient = defs.append('radialGradient')
  //   .attr('id', 'svgGradient');

  // gradient.append('stop')
  //   .attr('offset', '-50%')
  //   .attr('stop-color', 'red');

  // gradient.append('stop')
  //   .attr('offset', '100%')
  //   .attr('stop-color', '#fff');
  // ===
}

// ======================================================================

  // FIXME: does this validate?
  //   d3.json<any>('https://api.reddit.com', (error, data) => {
  //     if (error) {
  //         console.error(error);
  //     } else {
  //         console.log(data);
  //     }
  // });

  // References for transitions with D3 arcs:
  // https://bl.ocks.org/shimizu/f90651541575f348a129444003a73467
  // http://bl.ocks.org/mbostock/5100636
  // http://bl.ocks.org/cmdoptesc/6228457
