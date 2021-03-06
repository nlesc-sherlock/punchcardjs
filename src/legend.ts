
import * as d3 from 'd3';

import {Base} from './Base';
import {DateCircle} from './DateCircle';
import {DateRect} from './DateRect';
import {WeekdayCircle} from './WeekdayCircle';
import {WeekdayRect} from './WeekdayRect';

/**
 * Convenience type/collection of various punchcards
 */
export type PunchcardVisualization = Base|DateCircle|DateRect|
                                    WeekdayCircle|WeekdayRect;

/**
 * Legend adds a legend to an existing PunchcardVisualization, indicating which
 * color represents which domain value.
 */
export class Legend {
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
     * Adds a legend to an existing PunchcardVisualization.
     * @param  {PunchcardVisualization} sibling The sibling element, for which
     * a legend needs to be constructed
     * @return {[type]} A reference to the instance of Legend
     */
    constructor(sibling: PunchcardVisualization) {

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
    protected drawBox(): Legend {
        // draw box

        const dx: number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft;
        const dy: number = this.marginTop;

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
     * Draws the Legend's body (but not the colored symbols on it)
     * @return {Legend} Returns a reference to the instance of Legend
     */
    protected drawLegendBody(): Legend {
        //
        const dx: number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft;
        const dy: number = this.sibling.domElem.clientHeight - this.marginBottom - this.height;

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
    protected drawSymbols(): Legend {

        const dx: number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft;
        const dy: number = this.sibling.domElem.clientHeight - this.marginBottom;

        const data: any = [];
        const nRects: number = 128;
        for (let iRect = 0; iRect < nRects; iRect += 1) {
            data.push({
                    value: this.sibling.colormap.cLimLow +
                            ((iRect + 0.5) / nRects) * (this.sibling.colormap.cLimHigh - this.sibling.colormap.cLimLow)
                });
        }

        const symbolHeight: number = this.height / nRects;

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
                    .attr('y', (d: any) => {
                        return this.verticalScale(d.value) - 0.5 * symbolHeight;
                    })
                    .attr('width', this.width)
                    .attr('height', symbolHeight)
                    .attr('fill', (d: any) => {
                        return this.sibling.colormap.getColorRGB(d.value);
                    });

        return this;
    }

    /**
     * Draws the Legend's title
     * @return {Legend} Returns a reference to the instance of Legend
     */
    protected drawTitle(): Legend {

        const dx: number = this.sibling.domElem.clientWidth -
            this.sibling.legendWidth + this.marginLeft + 0.5 * this.width;
        const dy: number = this.marginTop - 20;

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
    protected drawVerticalAxis(): Legend {
        //
        const w: number = this.sibling.legendWidth - this.marginLeft - this.marginRight;
        const h: number = this.sibling.domElem.clientHeight - this.marginTop - this.marginBottom;
        const dx: number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft + w;
        const dy: number = this.sibling.domElem.clientHeight - this.marginBottom;

        this.verticalScale = d3.scale.linear()
            .range([0, -h])
            .domain([this.sibling.colormap.cLimLow, this.sibling.colormap.cLimHigh]);

        const verticalAxis = d3.svg.axis()
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
    protected drawVerticalAxisLabel(): Legend {
        //
        const h: number = this.sibling.domElem.clientHeight - this.marginTop - this.marginBottom;
        const dx: number = this.sibling.domElem.clientWidth - this.marginRight + 40;
        const dy: number = this.marginTop + 0.5 * h;

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
    protected set marginLeft(marginLeft: number) {
        this._marginLeft = Math.max(marginLeft, 0);
    }

    /**
     * [marginLeft description]
     * @return {number} [description]
     */
    protected get marginLeft(): number {
        return this._marginLeft;
    }

    /**
     * [marginRight description]
     * @param  {number} marginRight [description]
     * @return {[type]}             [description]
     */
    protected set marginRight(marginRight: number) {
        this._marginRight = Math.max(marginRight, 0);
    }

    /**
     * [marginRight description]
     * @return {number} [description]
     */
    protected get marginRight(): number {
        return this._marginRight;
    }

    /**
     * [marginTop description]
     * @param  {number} marginTop [description]
     * @return {[type]}           [description]
     */
    protected set marginTop(marginTop: number) {
        this._marginTop = Math.max(marginTop, this.sibling.marginTop);
    }

    /**
     * [marginTop description]
     * @return {number} [description]
     */
    protected get marginTop(): number {
        return this._marginTop;
    }

    /**
     * [marginBottom description]
     * @param  {number} marginBottom [description]
     * @return {[type]}              [description]
     */
    protected set marginBottom(marginBottom: number) {
        this._marginBottom = Math.max(marginBottom, this.sibling.marginBottom);
    }

    /**
     * [marginBottom description]
     * @return {number} [description]
     */
    protected get marginBottom(): number {
        return this._marginBottom;
    }

    /**
     * Draws the Legend's horizontal axis
     * @return {Legend} Returns a reference to the instance of Legend
     */
    private drawHorizontalAxis(): Legend {

        const dx: number = this.sibling.domElem.clientWidth - this.sibling.legendWidth + this.marginLeft;
        const dy: number = this.sibling.domElem.clientHeight - this.marginBottom;

        this.sibling.svg.append('g')
            .attr('class', 'punchcard-legend horizontal-axis')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' );

        return this;
    }

}
