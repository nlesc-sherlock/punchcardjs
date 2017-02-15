
import * as CrossFilter from 'crossfilter';

import {ColorMap} from './colormap';
import {WeekdayRect} from './WeekdayRect';

/**
 * See <a href="https://nlesc-sherlock.github.io/punchcardjs-demo/sites/demo/">examples on GitHub</a>.
 */
export class WeekdayCircle extends WeekdayRect {

    constructor(cf: CrossFilter.CrossFilter<any>, domElemId: string, datekey: string) {

        super(cf, domElemId, datekey);
        // ...but reset these properties
        this.domElem.classList.remove('punchcard-weekday-rect');
        this.canDraw = false;

        this.xlabel = 'Day of week';
        this.title = 'WeekdayCircle title';
        this.colormap = new ColorMap('blues');
        super.defineDimensions();
        this.domElem.classList.add('punchcard-weekday-circle');
        this.update();
    }

    /**
     * This method adds an SVG g element containing many SVG circle elements,
     * i.e. the 'symbols', to the DOM. Each symbol represents the count of how
     * many rows from the data fall on a given day/time-of-day combination.
     * @return {WeekdayCircle} Returns a reference to the instance of
     * WeekdayCircle
     */
    protected drawSymbols(): WeekdayCircle {

        const w: number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        const h: number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        const dx: number = this.marginLeft;
        const dy: number = this.marginTop + h;
        const symbolMargin = {left: 2, right: 2, top: 2, bottom: 2}; // pixels
        const symbolWidth: number = w / 7 - symbolMargin.left - symbolMargin.right;
        const symbolHeight: number = h / 24 - symbolMargin.top - symbolMargin.bottom;

        const r: number = Math.min(symbolWidth, symbolHeight) / 2 - 2;

        // based on example from
        // http://stackoverflow.com/questions/16766986/is-it-possible-to-group-by-multiple-dimensions-in-crossfilter
        // forEach method could be very expensive on write.
        const group = this.dim.weekdayAndHourOfDay.group();
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
                        return this.dayOfWeekScale(d.key.weekday) + symbolMargin.left;
                    })
                    .attr('cy', (d: any) => {
                        return this.todScale(d.key.hourOfDay) + symbolHeight / 2 + symbolMargin.top;
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
