
import 'd3';

import {Base} from './base';
import {DateCircle} from './date-circle';
import {DateRect} from './date-rect';
import {WeekdayCircle} from './weekday-circle';
import {WeekdayRect} from './weekday-rect';

/**
 * Convenience type/collection of various punchcards
  */
type PunchcardVisualization = Base|DateCircle|DateRect|
                                    WeekdayCircle|WeekdayRect;

/**
 * Legend adds a legend to an existing PunchcardVisualization, indicating which
 * color represents which domain value.
 */
export class Legend {

    /**
     * Margin in pixels to the left of the legend
     * @type {number}
     */
    private _marginLeft: number;
    /**
     * Margin in pixels to the right of the legend
     * @type {number}
     */
    private _marginRight: number;
    /**
     * Margin in pixels to the top of the legend
     * @type {number}
     */
    private _marginTop: number;
    /**
     * Margin in pixels to the bottom of the legend
     * @type {number}
     */
    private _marginBottom: number;
    /**
     * The Legend's sibling, i.e. the object that the legend is associated with.
     * @type {PunchcardVisualization}
     */
    protected sibling: PunchcardVisualization;
    /**
     * The title of the Legend
     * @type {string}
     */
    protected title: string;
    /**
     * Text to label the Legend's vertical axis
     * @type {string}
     */
    protected ylabel: string;
    /**
     * The legend's horizontal axis scale
     * @type {any}
     */
    protected horizontalScale: any;
    /**
     * The Legend's vertical axis scale
     * @type {any}
     */
    protected verticalScale: any;
    /**
     * The Legend's width in pixels
     * @type {number}
     */
    protected width: number;
    /**
     * The Legend's height in pixels
     * @type {number}
     */
    protected height: number;

    /**
     * Adds a legend to an existing PunchcardVisualization.
     * @param  {PunchcardVisualization} sibling The sibling element, for which
     * a legend needs to be constructed
     * @return {[type]} A reference to the instance of Legend
     */
    constructor (sibling:PunchcardVisualization) {

        this.sibling = sibling;

        // the margins around the legend body
        this.marginLeft = 0;
        this.marginRight = 60;
        this.marginTop = this.sibling.marginTop;
        this.marginBottom = this.sibling.marginBottom;

        this.width = this.sibling.legendWidth - this.marginLeft - this.marginRight;
        this.height = this.sibling.domElem.clientHeight - this.marginTop - this.marginBottom;

        this.title = '';
        this.ylabel = '';

    }



    /**
     * This method calls the other methods in a predefined succession, so that
     * the whole legend gets drawn
     * @return {Legend} Returns a reference to the instance of Legend
     */
    public draw(): Legend {
        // draw the legend

        this.drawLegendBody();
        this.drawHorizontalAxis();
        this.drawVerticalAxis();
        this.drawVerticalAxisLabel();
        this.drawTitle();
        this.drawSymbols();
        this.drawBox();

        return this;
    }



    /**
     * Draws the box around the legend
     * @return {Legend} Returns a reference to the instance of Legend
     */
    protected drawBox():Legend {
        // draw box

        let dx:number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft;
        let dy:number = this.marginTop;

        this.sibling.svg.append('g')
            .attr('class', 'punchcard-legend legendbody-box')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .append('rect')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('class', 'legend legendbody-box');

        return this;
    }



    /**
     * Draws the Legend's horizontal axis
     * @return {Legend} Returns a reference to the instance of Legend
     */
    private drawHorizontalAxis():Legend {

        let dx:number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft;
        let dy:number = this.sibling.domElem.clientHeight - this.marginBottom;

        let horizontalAxis = d3.svg.axis()
            .orient('bottom')
            .scale(this.horizontalScale)
            .ticks(0);

        this.sibling.svg.append('g')
            .attr('class', 'punchcard-legend horizontal-axis')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' );

        return this;

    }



    /**
     * Draws the Legend's body (but not the colored symbols on it)
     * @return {Legend} Returns a reference to the instance of Legend
     */
    protected drawLegendBody():Legend {
        //
        let dx:number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft;
        let dy:number = this.sibling.domElem.clientHeight - this.marginBottom - this.height;


        this.sibling.svg.append('g')
            .attr('class', 'punchcard-legend legendbody')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .append('rect')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('class', 'legend legendbody');

        return this;
    }



    /**
     * Draws the Legend's colored symbols, each of which is associated with a
     * certain domain value.
     * @return {Legend} Returns a reference to the instance of Legend
     */
    protected drawSymbols():Legend {
        // pass

        let that:Legend = this;

        let dx:number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft;
        let dy:number = this.sibling.domElem.clientHeight - this.marginBottom;

        let data: any = [];
        let nRects:number = 128;
        for (let iRect = 0; iRect < nRects; iRect += 1) {
            data.push({
                    value: this.sibling.colormap.cLimLow +
                            ((iRect + 0.5) / nRects) * (this.sibling.colormap.cLimHigh - this.sibling.colormap.cLimLow)
                });
        }

        let symbolHeight: number = this.height / nRects;

        // draw the rects
        this.sibling.svg
            .append('g')
            .attr('class', 'punchcard-legend symbol')
            .attr('transform', 'translate(' + dx + ',' + dy + ')')
            .selectAll('rect.symbol')
                .data(data)
                .enter()
                .append('rect')
                    .attr('class', 'symbol')
                    .attr('x', 0)
                    .attr('y', function(d:any){
                        return that.verticalScale(d.value) - 0.5 * symbolHeight;
                    })
                    .attr('width', this.width)
                    .attr('height', symbolHeight)
                    .attr('fill', function(d:any){
                        return that.sibling.colormap.getColorRGB(d.value);
                    });

        return this;
    }



    /**
     * Draws the Legend's title
     * @return {Legend} Returns a reference to the instance of Legend
     */
    protected drawTitle():Legend {

        let dx:number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft + 0.5 * this.width;
        let dy:number = this.marginTop - 20;

        this.sibling.svg.append('g')
            .attr('class', 'punchcard-legend title')
            .attr('transform', 'translate(' + dx + ',' + dy + ')')
            .append('text')
            .text(this.title)
            .attr('class', 'title');

        return this;
    }



    /**
     * Draws the Legend's vertical axis, that is used to read the domain value
     * associated with a certain color.
     * @return {Legend} Returns a reference to the instance of Legend
     */
    protected drawVerticalAxis():Legend {
        //
        let w :number = this.sibling.legendWidth - this.marginLeft - this.marginRight;
        let h :number = this.sibling.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft + w;
        let dy:number = this.sibling.domElem.clientHeight - this.marginBottom;

        this.verticalScale = d3.scale.linear()
            .range([0, -h])
            .domain([this.sibling.colormap.cLimLow, this.sibling.colormap.cLimHigh]);

        let verticalAxis = d3.svg.axis()
            .orient('right')
            .scale(this.verticalScale)
            .innerTickSize(5)
            .outerTickSize(5);

        this.sibling.svg.append('g')
            .attr('class', 'punchcard-legend vertical-axis')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .call(verticalAxis);

        return this;

    }



    /**
     * Draws the Legend's vertical axis text label
     * @return {Legend} Returns a reference to the instance of Legend
     */
    protected drawVerticalAxisLabel():Legend {
        //
        let h :number = this.sibling.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.sibling.domElem.clientWidth - this.marginRight + 40;
        let dy:number = this.marginTop + 0.5 * h;

        this.sibling.svg.append('g')
            .attr('class', 'punchcard-legend vertical-axis-label')
            .attr('transform', 'translate(' + dx + ',' + dy + ') rotate(-90)')
            .append('text')
            .text(this.ylabel)
            .attr('class', 'legend vertical-axis-label');

        return this;

    }



    /**
     * [marginLeft description]
     * @param  {number} marginLeft [description]
     * @return {[type]}            [description]
     */
    protected set marginLeft(marginLeft:number) {
        this._marginLeft = Math.max(marginLeft, 0);
    }

    /**
     * [marginLeft description]
     * @return {number} [description]
     */
    protected get marginLeft():number {
        return this._marginLeft;
    }

    /**
     * [marginRight description]
     * @param  {number} marginRight [description]
     * @return {[type]}             [description]
     */
    protected set marginRight(marginRight:number) {
        this._marginRight = Math.max(marginRight, 0);
    }

    /**
     * [marginRight description]
     * @return {number} [description]
     */
    protected get marginRight():number {
        return this._marginRight;
    }

    /**
     * [marginTop description]
     * @param  {number} marginTop [description]
     * @return {[type]}           [description]
     */
    protected set marginTop(marginTop:number) {
        this._marginTop = Math.max(marginTop, this.sibling.marginTop);
    }

    /**
     * [marginTop description]
     * @return {number} [description]
     */
    protected get marginTop():number {
        return this._marginTop;
    }

    /**
     * [marginBottom description]
     * @param  {number} marginBottom [description]
     * @return {[type]}              [description]
     */
    protected set marginBottom(marginBottom:number) {
        this._marginBottom = Math.max(marginBottom, this.sibling.marginBottom);
    }

    /**
     * [marginBottom description]
     * @return {number} [description]
     */
    protected get marginBottom():number {
        return this._marginBottom;
    }

}

