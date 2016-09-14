
import 'd3';

import {Base} from './base';
import {DateCircle} from './date-circle';
import {DateRect} from './date-rect';
import {WeekdayCircle} from './weekday-circle';
import {WeekdayRect} from './weekday-rect';

/**
 * [PunchcardVisualization description]
 * @type {[type]}
 */
type PunchcardVisualization = Base|DateCircle|DateRect|
                                    WeekdayCircle|WeekdayRect;

/**
 *
 */
export class Legend {

    /**
     * [_marginLeft description]
     * @type {number}
     */
    private _marginLeft: number;
    /**
     * [_marginRight description]
     * @type {number}
     */
    private _marginRight: number;
    /**
     * [_marginTop description]
     * @type {number}
     */
    private _marginTop: number;
    /**
     * [_marginBottom description]
     * @type {number}
     */
    private _marginBottom: number;
    /**
     * [_sibling description]
     * @type {PunchcardVisualization}
     */
    private _sibling: PunchcardVisualization;
    /**
     * [_title description]
     * @type {string}
     */
    private _title: string;
    /**
     * [_ylabel description]
     * @type {string}
     */
    private _ylabel: string;
    /**
     * [_horizontalScale description]
     * @type {any}
     */
    private _horizontalScale: any;
    /**
     * [_verticalScale description]
     * @type {any}
     */
    private _verticalScale: any;
    /**
     * [_width description]
     * @type {number}
     */
    private _width: number;
    /**
     * [_height description]
     * @type {number}
     */
    private _height: number;

    /**
     * [constructor description]
     * @param  {PunchcardVisualization} sibling [description]
     * @return {[type]}                         [description]
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
     * [draw description]
     * @return {Legend} [description]
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
     * [drawBox description]
     * @return {Legend} [description]
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
     * [drawHorizontalAxis description]
     * @return {Legend} [description]
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
     * [drawLegendBody description]
     * @return {Legend} [description]
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
     * [drawSymbols description]
     * @return {Legend} [description]
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
     * [drawTitle description]
     * @return {Legend} [description]
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
     * [drawVerticalAxis description]
     * @return {Legend} [description]
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
     * [drawVerticalAxisLabel description]
     * @return {Legend} [description]
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

    /**
     * [title description]
     * @param  {string} title [description]
     * @return {[type]}       [description]
     */
    protected set title(title:string) {
        this._title = title;
    }

    /**
     * [title description]
     * @return {string} [description]
     */
    protected get title():string {
        return this._title;
    }

    /**
     * [ylabel description]
     * @param  {string} ylabel [description]
     * @return {[type]}        [description]
     */
    protected set ylabel(ylabel:string) {
        this._ylabel = ylabel;
    }

    /**
     * [ylabel description]
     * @return {string} [description]
     */
    protected get ylabel():string {
        return this._ylabel;
    }

    /**
     * [sibling description]
     * @param  {PunchcardVisualization} sibling [description]
     * @return {[type]}                         [description]
     */
    protected set sibling(sibling:PunchcardVisualization) {
        this._sibling = sibling;
    }

    /**
     * [sibling description]
     * @return {PunchcardVisualization} [description]
     */
    protected get sibling():PunchcardVisualization {
        return this._sibling;
    }

    /**
     * [horizontalScale description]
     * @param  {any}    horizontalScale [description]
     * @return {[type]}                 [description]
     */
    protected set horizontalScale(horizontalScale:any) {
        this._horizontalScale = horizontalScale;
    }

    /**
     * [horizontalScale description]
     * @return {any} [description]
     */
    protected get horizontalScale():any {
        return this._horizontalScale;
    }

    /**
     * [verticalScale description]
     * @param  {any}    verticalScale [description]
     * @return {[type]}               [description]
     */
    protected set verticalScale(verticalScale:any) {
        this._verticalScale = verticalScale;
    }

    /**
     * [verticalScale description]
     * @return {any} [description]
     */
    protected get verticalScale():any {
        return this._verticalScale;
    }

    /**
     * [width description]
     * @param  {number} width [description]
     * @return {[type]}       [description]
     */
    protected set width(width:number) {
        this._width = width;
    }

    /**
     * [width description]
     * @return {number} [description]
     */
    protected get width():number {
        return this._width;
    }

    /**
     * [height description]
     * @param  {number} height [description]
     * @return {[type]}        [description]
     */
    protected set height(height:number) {
        this._height = height;
    }

    /**
     * [height description]
     * @return {number} [description]
     */
    protected get height():number {
        return this._height;
    }

}

