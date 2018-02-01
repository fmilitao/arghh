import * as d3 from 'd3';
import * as utils from './utils';

const MAX_DAY_SECONDS = 24 * 60 * 60;

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

  const info: Array<{ time: number[], style: string }> = [
    {
      style: 'dawn',
      time: dawn
    },
    {
      style: 'day',
      time: day
    },
    {
      style: 'dusk',
      time: dusk
    },
    {
      style: 'night',
      time: night
    }
  ];

  d3Test(info, targetElement);
}

export function d3Test(
  data: Array<{ time: number[], style: string }>,
  targetElement: HTMLElement
) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const radius = Math.min(width, height) * 0.7 / 2;

  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // ==
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

  const plotGroup = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})rotate(180)`);

  // console.log(data);

  for (const d of data) {
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(d.time[0])
      .endAngle(d.time[1]);

    // Added height and width so arc is visible
    plotGroup
      .append('path')
      .attr('d', arc)
      .classed(d.style, true);
  }

  // rotation is in degrees!
  const slice = 360 / MAX_DAY_SECONDS;
  const now = new utils.DateFormatter().getSecondsOfToday();

  const rotation = now * slice;

  plotGroup.append('line')
    .classed('marker', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', -radius)
    .attr('transform', `rotate(${rotation})`);
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

  // https://bl.ocks.org/shimizu/f90651541575f348a129444003a73467
  // http://bl.ocks.org/cmdoptesc/6228457
  // d3.selectAll('div')
  //   .transition()
  //   .duration(2000)
  //   .style('color', 'blue');
