import * as CrossFilter from 'crossfilter';
import * as d3 from 'd3';
import * as moment from 'moment';


import {Base} from './base';
import {ColorMap} from './colormap';

/**
 * See <a href="https://nlesc-sherlock.github.io/punchcardjs-demo/sites/demo/">examples on GitHub</a>.
 */
export class DateRect extends Base {

    protected dateScale: d3.time.Scale<any, any>;
    protected dateFrom: Date;
    protected dateTo: Date;


    /**
     * Constructor method for DateRect
     * @param  {CrossFilter.CrossFilter<any>} cf Crossfilter object
     * containing the data.
     * @param  {string} domElemId name of the DOM element to draw in.
     * @return {[type]} A reference to an instance of DateRect.
     */
    constructor (cf: CrossFilter.CrossFilter<any>, domElemId: string, datekey: string) {

        super(cf, domElemId, datekey);

        this.xlabel = '';
        this.title = 'DateRect title';
        this.colormap = new ColorMap('default');
        this.defineDimensions();
        this.domElem.classList.add('punchcard-date-rect');
        this.update();

    }




    /**
     * Defines the crossfilter dimensions as used by this class
     * @return {Base} A reference to an instance of DateRect.
     */
    protected defineDimensions():DateRect {

        // store a reference to the instance
        let that:DateRect = this;

        // based on example from
        // http://stackoverflow.com/questions/16766986/is-it-possible-to-group-by-multiple-dimensions-in-crossfilter
        this.dim.dateAndHourOfDay = this.cf.dimension(function (d:any) {
            let m:moment.Moment;
            if (d.hasOwnProperty(that.datekey)) {
                m = moment(d[that.datekey]);
                let obj:any = {};
                obj[that.datekey] = m.format('YYYY-MM-DD');
                obj['hourOfDay'] =  m.hour();
                //stringify() and later, parse() to get keyed objects
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
     * a punchcard graph with the date on the horizontal axis and the time of
     * day on the vertical axis. Mostly calls methods of the parent class, Base,
     * but for example the symbols for this class are SVG rects, so it calls its
     * own method .drawSymbols() for that.
     *
     * Successful drawing depends on whether the container is currently visible,
     * and whether there is enough information in the instance to draw anything
     * at all.
     *
     * This method overrides stub method in parent class.
     *
     * @return {DateRect} A reference to an instance of DateRect.
     */
    protected draw():DateRect {

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
     * Adds an SVG g element containing a horizontal d3.time.scale axis to the
     * DOM, representing the date.
     * @return {DateRect} A reference to an instance of DateRect.
     */
    private drawHorizontalAxis():DateRect {

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let dx:number = this.marginLeft;
        let dy:number = this.domElem.clientHeight - this.marginBottom;

        let firstResultDate = new Date(this.dim.dateAndHourOfDay.bottom(1)[0][this.datekey]);
        this.dateFrom = new Date(firstResultDate.getFullYear(), firstResultDate.getMonth(), firstResultDate.getDate(), 0, 0, 0, 0);

        let lastResultDate = new Date(this.dim.dateAndHourOfDay.top(1)[0][this.datekey]);
        this.dateTo = new Date(lastResultDate.getFullYear(), lastResultDate.getMonth(), lastResultDate.getDate(), 23, 59, 59, 999);

        let tickFormat:d3.time.Format;
        let ticks: number | any; // FIXME second type should be Date[] but that doesn't work somehow
        let nHoursDiff: number = moment(this.dateTo).diff(moment(this.dateFrom), 'hour', true);

        if (nHoursDiff > 5 * 24) {
            tickFormat = d3.time.format('%a %b %-d, %Y');
            ticks = 7;
        } else {
            tickFormat = d3.time.format('%a %b %-d, %Y');
            ticks = d3.time.days;
        };

        this.dateScale = d3.time.scale()
            .range([0, w])
            .domain([this.dateFrom,
                     this.dateTo]);

        let dateAxis = d3.svg.axis()
            .orient('bottom')
            .scale(this.dateScale)
            .ticks(ticks)
            .tickFormat(tickFormat);

        this.svg.append('g')
            .attr('class', 'horizontal-axis')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .call(dateAxis);

        // doing style stuff in JavaScript is considered bad practice...:
        this.svg.select('.horizontal-axis')
            .selectAll('text')
                .attr('x', -10)
                .attr('y', 0)
                .attr('dy', '.35em')
                .style('text-anchor', 'end');

        return this;

    }



    /**
     * This method adds an SVG g element with many SVG rects in it. Each rect
     * represents the count of how many data rows fall within the area covered
     * by the rect, where the horizontal boundaries dictate the date range and
     * the vertical boundaries dictate the time of day range.
     * @return {DateRect} A reference to the instance of DateRect.
     */
    protected drawSymbols():DateRect {

        // capture the this object
        let that:DateRect = this;

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft;
        let dy:number = this.marginTop + h;
        let symbolMargin = {left:0, right: 0, top: 0, bottom: 0}; // pixels
        let wDays:number = moment(this.dateTo).diff(moment(this.dateFrom), 'days', true);

        let symbolWidth :number = w / wDays - symbolMargin.left - symbolMargin.right;
        let symbolHeight:number = h / 24.0 - symbolMargin.top - symbolMargin.bottom;

        // based on example from
        // http://stackoverflow.com/questions/16766986/is-it-possible-to-group-by-multiple-dimensions-in-crossfilter
        // forEach method could be very expensive on write.
        let group = this.dim.dateAndHourOfDay.group();
        group.all().forEach(function(d:any) {
            //parse the json string created above
            d.key = JSON.parse(d.key);
        });
        let data:any = group.all();


        // determine the min and max in the count in order to set the color
        // limits on the colormap later
        let lowest = Number.POSITIVE_INFINITY;
        let highest = Number.NEGATIVE_INFINITY;
        for (let elem of data) {
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
                    .attr('x', function(d:any){
                        return that.dateScale(new Date(d.key[that.datekey]));
                        })
                    .attr('y', function(d:any){
                        return that.todScale(parseInt(d.key.hourOfDay, 10));
                    })
                    .attr('width', symbolWidth)
                    .attr('height', symbolHeight)
                    .attr('fill', function(d:any){
                        return that.colormap.getColorRGB(d.value);
                    })
                    .on('click', function(d:any){
                        that.onClick(d);
                    })
                    .on('mouseover', function(d:any){
                        that.onMouseOver(d);
                    })
                    .on('mouseout', function(){
                        that.onMouseOut();
                    });

        return this;

    }



    /*
     * overrides method from Base
     */
    protected onMouseOver(d: any): DateRect {
        let str: string = 'x:' + d.key[this.datekey] +
            ', y:' + d.key['hourOfDay'] +
            ', count:' + d.value;
        this.svg.select('g.footer').select('text').text(str);
        return this;
    }



    protected onMouseOut(): DateRect {
        this.svg.select('g.footer').select('text').text('');
        return this;
    }



}
