import 'crossfilter';
import 'd3';
import 'moment';


import {ColorMap} from './colormap';
import {DateRect} from './date-rect';



export class DateCircle extends DateRect {


    constructor (cf: CrossFilter.CrossFilter<any>, domElemId: string, datekey: string) {

        super(cf, domElemId, datekey);

        this.xlabel = '';
        this.title = 'DateCircle title';
        this.colormap = new ColorMap('rainbow');
        super.defineDimensions();
        this.domElem.classList.remove('punchcard-date-rect');
        this.domElem.classList.add('punchcard-date-circle');

    }




    protected drawSymbols():DateCircle {

        // capture the this object
        let that:DateCircle = this;

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft;
        let dy:number = this.marginTop + h;
        let symbolMargin = {left:0, right: 0, top: 0, bottom: 0}; // pixels
        let wDays:number = moment(this.dateTo).diff(moment(this.dateFrom), 'days', true);

        let symbolWidth :number = w / wDays - symbolMargin.left - symbolMargin.right;
        let symbolHeight:number = h / 24.0 - symbolMargin.top - symbolMargin.bottom;
        let r:number = Math.min(symbolWidth, symbolHeight) / 2 - 2;

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
                        return that.dateScale(new Date(d.key[that.datekey]));
                        })
                    .attr('cy', function(d:any){
                        return that.todScale(parseInt(d.key.hourOfDay, 10)) + symbolMargin.top + symbolHeight / 2;
                    })
                    .attr('r', function(d:any) {
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
                    .on('mouseover', function(d:any){
                        that.onMouseOver(d);
                    });

        return this;

    }


}


