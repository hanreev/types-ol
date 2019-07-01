import Map from 'ol/Map';
import View from 'ol/View';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import BingMaps from 'ol/source/BingMaps';
import RasterSource from 'ol/source/Raster';

declare var d3: any;

const minVgi = 0;
const maxVgi = 0.25;
const bins = 10;

function vgi(pixel: number[]) {
    const r = pixel[0] / 255;
    const g = pixel[1] / 255;
    const b = pixel[2] / 255;
    return (2 * g - r - b) / (2 * g + r + b);
}

function summarize(value: number, counts: any) {
    const min = counts.min;
    const max = counts.max;
    const num = counts.values.length;
    if (value < min) {
        // do nothing
    } else if (value >= max) {
        counts.values[num - 1] += 1;
    } else {
        const index = Math.floor((value - min) / counts.delta);
        counts.values[index] += 1;
    }
}

const bing = new BingMaps({
    key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5',
    imagerySet: 'Aerial',
});

const raster = new RasterSource({
    sources: [bing],

    operation: (pixels, data: any) => {
        const pixel = pixels[0] as number[];
        const value = vgi(pixel);
        summarize(value, data.counts);
        if (value >= data.threshold) {
            pixel[0] = 0;
            pixel[1] = 255;
            pixel[2] = 0;
            pixel[3] = 128;
        } else {
            pixel[3] = 0;
        }
        return pixel;
    },
    lib: {
        vgi,
        summarize,
    },
});
raster.set('threshold', 0.1);

function createCounts(min: number, max: number, num: number) {
    const values = new Array(num);
    for (let i = 0; i < num; ++i) {
        values[i] = 0;
    }
    return {
        min,
        max,
        values,
        delta: (max - min) / num,
    };
}

raster.on('beforeoperations', event => {
    event.data.counts = createCounts(minVgi, maxVgi, bins);
    event.data.threshold = raster.get('threshold');
});

raster.on('afteroperations', event => {
    schedulePlot(event.resolution, event.data.counts, event.data.threshold);
});

const map = new Map({
    layers: [
        new TileLayer({
            source: bing,
        }),
        new ImageLayer({
            source: raster,
        }),
    ],
    target: 'map',
    view: new View({
        center: [-9651695, 4937351],
        zoom: 13,
        minZoom: 12,
        maxZoom: 19,
    }),
});

let timer: number | null = null;
function schedulePlot(resolution: number, counts: any, threshold: any) {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    timer = window.setTimeout(plot.bind(null, resolution, counts, threshold), 1000 / 60);
}

const barWidth = 15;
const plotHeight = 150;
const chart = d3
    .select('#plot')
    .append('svg')
    .attr('width', barWidth * bins)
    .attr('height', plotHeight);

const chartRect = chart.node().getBoundingClientRect();

const tip = d3
    .select(document.body)
    .append('div')
    .attr('class', 'tip');

function plot(resolution: number, counts: any, threshold: any) {
    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(counts.values)])
        .range([0, plotHeight]);

    const bar = chart.selectAll('rect').data(counts.values);

    bar.enter().append('rect');

    bar.attr('class', (count: any, index: any) => {
        const value = counts.min + index * counts.delta;
        return 'bar' + (value >= threshold ? ' selected' : '');
    }).attr('width', barWidth - 2);

    bar.transition()
        .attr('transform', (value: any, index: any) => {
            return 'translate(' + index * barWidth + ', ' + (plotHeight - yScale(value)) + ')';
        })
        .attr('height', yScale);

    bar.on('mousemove', (count: any, index: any) => {
        const threshold_ = counts.min + index * counts.delta;
        if (raster.get('threshold') !== threshold_) {
            raster.set('threshold', threshold_);
            raster.changed();
        }
    });

    bar.on('mouseover', (count: any, index: any) => {
        let area = 0;
        for (let i = counts.values.length - 1; i >= index; --i) {
            area += resolution * resolution * counts.values[i];
        }
        tip.html(message(counts.min + index * counts.delta, area));
        tip.style('display', 'block');
        tip.transition().style({
            left: chartRect.left + index * barWidth + barWidth / 2 + 'px',
            top: d3.event.y - 60 + 'px',
            opacity: 1,
        });
    });

    bar.on('mouseout', () => {
        tip.transition()
            .style('opacity', 0)
            .each('end', () => {
                tip.style('display', 'none');
            });
    });
}

function message(value: any, area: any) {
    const acres = (area / 4046.86).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return acres + ' acres at<br>' + value.toFixed(2) + ' VGI or above';
}
