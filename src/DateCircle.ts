import * as CrossFilter from 'crossfilter';
import * as moment from 'moment';

import {ColorMap} from './colormap';
import {DateRect} from './DateRect';

/**
 * See <a href="https://nlesc-sherlock.github.io/punchcardjs-demo/sites/demo/">examples on GitHub</a>.
 */
export class DateCircle extends DateRect {

    constructor(cf: CrossFilter.CrossFilter<any>, domElemId: string, datekey: string) {

        super(cf, domElemId, datekey);
        // ...but reset these properties
        this.domElem.classList.remove('punchcard-date-rect');
        this.canDraw = false;

        this.xlabel = '';
        this.title = 'DateCircle title';
        this.colormap = new ColorMap('rainbow');
        super.defineDimensions();
        this.domElem.classList.add('punchcard-date-circle');
        this.update();

    }

    protected drawSymbols(): DateCircle {

        const w: number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        const h: number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        const dx: number = this.marginLeft;
        const dy: number = this.marginTop + h;
        const symbolMargin = {left: 0, right: 0, top: 0, bottom: 0}; // pixels
        const wDays: number = moment(this.dateTo).diff(moment(this.dateFrom), 'days', true);

        const symbolWidth: number = w / wDays - symbolMargin.left - symbolMargin.right;
        const symbolHeight: number = h / 24.0 - symbolMargin.top - symbolMargin.bottom;
        const r: number = Math.min(symbolWidth, symbolHeight) / 2 - 2;

        // based on example from
        // http://stackoverflow.com/questions/16766986/is-it-possible-to-group-by-multiple-dimensions-in-crossfilter
        // forEach method could be very expensive on write.
        const group = this.dim.dateAndHourOfDay.group();
        group.all().forEach((d: any) => {
            // parse the json string created above
            d.key = JSON.parse(d.key);
        });
        const data: any = group.all();

        // determine the min and max in the count in order to set the color
        // limits on the colormap later
        let lowest = Number.POSITIVE_INFINITY;
        let highest = Number.NEGATIVE_INFINITY;
        for (const elem of data) {
            if (elem.value < lowest) {
                lowest = elem.value;
            }
            if (elem.value > highest) {
                highest = elem.value;
            }
        }
        this.colormap.cLimLow = lowest;
        this.colormap.cLimHigh = highest;

        // draw the circles
        this.svg
            .append('g')
            .attr('class', 'symbol')
            .attr('transform', 'translate(' + dx + ',' + dy + ')')
            .selectAll('circle.symbol')
                .data(data)
                .enter()
                .append('circle')
                    .attr('class', 'symbol')
                    .attr('cx', (d: any) => {
                        return this.dateScale(new Date(d.key[this.datekey]));
                        })
                    .attr('cy', (d: any) => {
                        return this.todScale(parseInt(d.key.hourOfDay, 10)) + symbolMargin.top + symbolHeight / 2;
                    })
                    .attr('r', (d: any) => {
                        const numer: number = d.value - this.colormap.cLimLow;
                        const denom: number = this.colormap.cLimHigh - this.colormap.cLimLow;
                        if (denom === 0) {
                            return Math.max(r, 1);
                        } else {
                            return Math.max(r * numer / denom, 1);
                        }
                    })
                    .attr('fill', (d: any) => {
                        return this.colormap.getColorRGB(d.value);
                    })
                    .on('click', (d: any) => {
                        this.onClick(d);
                    })
                    .on('mouseover', (d: any) => {
                        this.onMouseOver(d);
                    })
                    .on('mouseout', () => {
                        this.onMouseOut();
                    });

        return this;

    }

}
