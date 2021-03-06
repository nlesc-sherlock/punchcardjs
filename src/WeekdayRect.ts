
import * as CrossFilter from 'crossfilter';
import * as d3 from 'd3';
import * as moment from 'moment';

import {Base} from './Base';
import {ColorMap} from './colormap';

/**
 * See <a href="https://nlesc-sherlock.github.io/punchcardjs-demo/sites/demo/">examples on GitHub</a>.
 */
export class WeekdayRect extends Base {

    protected dayOfWeekScale: d3.scale.Ordinal<any, any>;
    protected xFrom: number;
    protected xTo: number;

    /**
     * Constructor method for making a punchcard visualization with the day of
     * week on the horizontal axis, and hour of day on the vertical axis, using
     * rectangular symbols to represent how many rows from the input data fall
     * within the area covered by each rectangle.
     * @param  {CrossFilter.CrossFilter<any>} cf Crossfilter object
     * containing the data.
     * @param  {string} domElemId Name of the DOM element in which to draw.
     * @return {[type]} A reference to the instance of WeekdayRect.
     */
    constructor(cf: CrossFilter.CrossFilter<any>, domElemId: string, datekey: string) {

        super(cf, domElemId, datekey);

        this.marginBottom = 50;
        this.xlabel = 'Day of week';
        this.title = 'WeekdayRect title';
        this.colormap = new ColorMap('summer');
        this.defineDimensions();
        this.domElem.classList.add('punchcard-weekday-rect');
        this.update();

    }

    /**
     * define the crossfilter dimensions as used by this class
     * @return {WeekdayRect} A reference to the instance of WeekdayRect
     */
    protected defineDimensions(): WeekdayRect {

        // based on example from
        // http://stackoverflow.com/questions/16766986/is-it-possible-to-group-by-multiple-dimensions-in-crossfilter

        this.dim.weekdayAndHourOfDay = this.cf.dimension((d: any) => {
            // stringify() and later, parse() to get keyed objects
            let m: moment.Moment;
            if (d.hasOwnProperty(this.datekey)) {
                m = moment(d[this.datekey]);
                const obj: any = {};
                obj.weekday = m.format('ddd');
                obj.hourOfDay = m.hour();
                return JSON.stringify(obj);
            } else {
                throw new Error('datekey undefined');
            }
        });
        this.canDraw = true;

        return this;
    }

    /**
     * This method defines which other methods to call in order to create
     * a punchcard graph with the day of week on the horizontal axis and the
     * time of day on the vertical axis. Mostly calls methods of the parent
     * class, Base, but for example the symbols for this class are SVG rects,
     * so it calls its own method .drawSymbols() for that.
     *
     * Successful drawing depends on whether the container is currently visible,
     * and whether there is enough information in the instance to draw anything
     * at all.
     *
     * This method overrides stub method in parent class.
     *
     * @return {WeekdayRect} A reference to an instance of WeekdayRect.
     */
    protected draw(): WeekdayRect {

        if (this.domElem.classList.contains('hidden')) {
            // div is hidden
            return this;
        } else {
            // div is visible
            if (this.canDraw) {
                // dimensions have been defined
                super.drawSvg();
                super.drawChartBody();
                this.drawHorizontalAxis();
                super.drawHorizontalAxisLabel();
                super.drawVerticalAxis();
                super.drawVerticalAxisLabel();
                super.drawTitle();
                this.drawSymbols();
                super.drawBox();
                super.drawLegend();
                super.drawFooter();
            }

            return this;
        }
    }

    /**
     * This method adds an SVG g element with many SVG rects in it. Each rect
     * represents the count of how many data rows fall within the area covered
     * by the rect, where the horizontal boundaries dictate the day-of-week and
     * the vertical boundaries dictate the time of day range.
     * @return {WeekdayRect} A reference to the instance of WeekdayRect.
     */
    protected drawSymbols(): WeekdayRect {

        const w: number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        const h: number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        const dx: number = this.marginLeft;
        const dy: number = this.marginTop + h;
        const symbolMargin = {left: 0, right: 0, top: 0, bottom: 0}; // pixels
        const symbolWidth: number = w / 7 - symbolMargin.left - symbolMargin.right;
        const symbolHeight: number = h / 24 - symbolMargin.top - symbolMargin.bottom;

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

        // draw the rects
        this.svg
            .append('g')
            .attr('class', 'symbol')
            .attr('transform', 'translate(' + dx + ',' + dy + ')')
            .selectAll('rect.symbol')
                .data(data)
                .enter()
                .append('rect')
                    .attr('class', 'symbol')
                    .attr('x', (d: any) => {
                        return this.dayOfWeekScale(d.key.weekday) - symbolWidth / 2;
                    })
                    .attr('y', (d: any) => {
                        return this.todScale(d.key.hourOfDay);
                    })
                    .attr('width', symbolWidth)
                    .attr('height', symbolHeight)
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

    /*
     * overrides method from Base
     */
    protected onMouseOver(d: any): WeekdayRect {

        const str: string = 'x:' + d.key.weekday +
            ', y:' + d.key.hourOfDay +
            ', count:' + d.value;
        this.svg.select('g.footer').select('text').text(str);
        return this;
    }

    protected onMouseOut(): WeekdayRect {
        this.svg.select('g.footer').select('text').text('');
        return this;
    }

    /**
     * Adds an SVG g element containing a d3.scale.ordinal for plotting
     * the day of the week on the horizontal axis of the punchcard graph.
     * @return {WeekdayRect} A reference to the instance of WeekdayRect.
     */
    private drawHorizontalAxis(): WeekdayRect {

        const w: number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        const dx: number = this.marginLeft;
        const dy: number = this.domElem.clientHeight - this.marginBottom;

        const range: number[] = [];
        const ndays: number = 7.0;
        for (const r of [0, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.0]) {
            range.push(w * r / ndays);
        }

        this.dayOfWeekScale = d3.scale.ordinal()
            .range(range)
            .domain(['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '']);

        const xAxis = d3.svg.axis()
            .orient('bottom')
            .scale(this.dayOfWeekScale)
            .tickValues(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
            .innerTickSize(5)
            .outerTickSize(0);

        this.svg.append('g')
            .attr('class', 'horizontal-axis')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .call(xAxis);

        return this;

    }

}
