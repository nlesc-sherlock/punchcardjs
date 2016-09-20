
import 'crossfilter';
import 'd3';

import {ColorMap} from './colormap';
import {WeekdayRect} from './weekday-rect';



export class WeekdayCircle extends WeekdayRect {

    constructor (cf: CrossFilter.CrossFilter<any>, domElemId: string, datekey: string) {

        super(cf, domElemId, datekey);

        this.xlabel = 'Day of week';
        this.title = 'WeekdayCircle title';
        this.colormap = new ColorMap('blues');
        super.defineDimensions();
        this.domElem.classList.remove('punchcard-weekday-rect');
        this.domElem.classList.add('punchcard-weekday-circle');
    }



    /**
     * This method adds an SVG g element containing many SVG circle elements,
     * i.e. the 'symbols', to the DOM. Each symbol represents the count of how
     * many rows from the data fall on a given day/time-of-day combination.
     * @return {WeekdayCircle} Returns a reference to the instance of
     * WeekdayCircle
     */
    protected drawSymbols():WeekdayCircle {

        // capture the this object
        let that:WeekdayCircle = this;

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft;
        let dy:number = this.marginTop + h;
        let symbolMargin = {left:2, right: 2, top: 2, bottom: 2}; // pixels
        let symbolWidth :number = w / 7 - symbolMargin.left - symbolMargin.right;
        let symbolHeight:number = h / 24 - symbolMargin.top - symbolMargin.bottom;

        let r:number = Math.min(symbolWidth, symbolHeight) / 2 - 2;

        // based on example from
        // http://stackoverflow.com/questions/16766986/is-it-possible-to-group-by-multiple-dimensions-in-crossfilter
        // forEach method could be very expensive on write.
        let group = this.dim.weekdayAndHourOfDay.group();
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
                    .attr('cx', function(d:any){
                        return that.dayOfWeekScale(d.key['weekday']) + symbolMargin.left;
                    })
                    .attr('cy', function(d:any){
                        return that.todScale(d.key['hourOfDay']) + symbolHeight / 2 + symbolMargin.top;
                    })
                    .attr('r', function(d:any){
                        let numer:number = d.value - that.colormap.cLimLow;
                        let denom:number = that.colormap.cLimHigh - that.colormap.cLimLow;
                        if (denom === 0) {
                            return Math.max(r, 1);
                        } else {
                            return Math.max(r * numer / denom, 1);
                        }
                    })
                    .attr('fill', function(d:any){
                        return that.colormap.getColorRGB(d.value);
                    })
                    .on('click', function(d:any){
                        that.onClick(d);
                    })
                    .on('mouseover', function(d:any){
                        that.onMouseOver(d);
                    });

        return this;
    }



}


