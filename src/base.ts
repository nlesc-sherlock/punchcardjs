import 'crossfilter';
import 'd3';


import {ColorMap} from './colormap';
import {Legend} from './legend';


/**
 * This is the base class for all punchcards. It provides the methods that are
 * shared between all punchcards, such as drawing of the vertical axis (which is
 * always hour of day), drawing of the background box, generation of the SVG DOM
 * element, and so on.
 */
export class Base {

    /**
     * The crossfilter that contains the data which needs to be visualized.
     * @type {CrossFilter.CrossFilter<any>}
     */
    protected cf: CrossFilter.CrossFilter<any>;
    /**
     * The colormap: i.e. the element that determines what color is used to
     * display a certain value.
     * @type {ColorMap}
     */
    public colormap: ColorMap;
    /**
     * The user-defined dimensions that are used to manipulate the crossfilter
     * data.
     * @type {any}
     */
    protected dim: any;
    /**
     * The element of the DOM where the punchcard should be visualized.
     * @type {HTMLElement}
     */
    public domElem: HTMLElement;
    /**
     * The element ID of the this._domElem object.
     * @type {string}
     */
    protected domElemId: string;
    /**
     * The SVG DOM element that is used to draw a punchcard in.
     * @type {any}
     */
    public svg: any;
    /**
     * The space in pixels between the left side of the axis background and
     * edge of the SVG element.
     * @type {number}
     */
    private _marginLeft: number;
    /**
     * The space in pixels between the right side of the  axis background and
     * edge of the SVG element.
     * @type {number}
     */
    private _marginRight: number;
    /**
     * The space in pixels between the top side of axis background and edge of
     * the SVG element.
     * @type {number}
     */
    private _marginTop: number;
    /**
     * The space in pixels between the bottom side of axis background and edge
     * of the SVG element.
     * @type {number}
     */
    private _marginBottom: number;
    /**
     * Text to use as title for the graph
     * @type {string}
     */
    protected title: string;
    /**
     * Text to use as label for the horizontal axis
     * @type {string}
     */
    protected xlabel: string;
    /**
     * Text to use as label for the vertical axis
     * @type {string}
     */
    protected ylabel: string;
    /**
     * d3 time scale for the vertical axis
     * @type {d3.scale.Linear<any, any>}
     */
    protected todScale: d3.scale.Linear<any, any>;
    /**
     * height of the axis
     * @type {number}
     */
    protected height: number;
    /**
     * width in pixels that is occupied by the legend
     * @type {number}
     */
    private _legendWidth: number;
    /**
     * Whether or not there is enough data defined to be able to draw anything.
     * @type {boolean}
     */
    public canDraw: boolean;
    /**
     * Defines which key of your input data contains the datetime information
     * based on which you want to create the symbols in the punchcard's body.
     * The default value is 'datestr'
     * @type {string}
     */
    public datekey:string;



    /**
     * Constructs an instance of Base when given a crossfilter object and the
     * name of a DOM element to draw in.
     * @param  {CrossFilter.CrossFilter<any>} cf Crossfilter object
     * containing the data
     * @param  {string} domElemId DOM element identifier for the div in which to
     * draw the punchcard graph
     * @return {[type]} Returns an instance of Base class
     */
    constructor (cf: CrossFilter.CrossFilter<any>, domElemId: string, datekey: string) {

        // the crossfilter object
        this.cf = cf;

        // the name of the DOM element
        this.domElemId = domElemId;

        // the DOM element by ID
        this.domElem = document.getElementById(this.domElemId);

        // all the dimensions are collected into one object, dim, which is
        // initialized here:
        this.dim = {};

        // can only draw stuff after user has defined some dimensions
        this.canDraw = false;

        // the margins around the graph body
        this.marginLeft = 70;
        this.marginRight = 30;
        this.marginTop = 50;
        this.marginBottom = 110;
        this.legendWidth = 80;

        this.ylabel = 'Time of day';
        this.title = '';

        this.datekey = datekey || 'datestr';
        this.colormap = new ColorMap();

        this.domElem.classList.add('punchcard-common');

        // beware: JavaScript magic happens here
        let that:Base = this;
        window.addEventListener('resize', function() {
            that.onResize();
        });
    }




    /**
     * Placeholder method that does not do anything but needs to be here because
     * it's called by .onResize(). This method should be overridden by classes
     * that inherit from Base.
     * @return {Base} return the (unchanged) instance of Base
     */
    public draw():Base {

        // placeholder method to be overridden in classes that inherit from this class
        return this;
    }



    /**
     * Adds an SVG g element containing an SVG rect element with which to draw a
     * border around the punchcard graph.
     * @return {Base} returns a reference to the instance of Base
     */
    protected drawBox():Base {
        //
        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft;
        let dy:number = this.marginTop;


        this.svg.append('g')
            .attr('class', 'chartbody-box')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .append('rect')
                .attr('width', w)
                .attr('height', h)
                .attr('class', 'chartbody-box');

        return this;
    }



    /**
     * Appends an SVG g element containing an SVG rect, the size of which is
     * determined by the size of the SVG element minus the margins on 4 sides,
     * and minus the width taken up by the legend. The rect constitutes the
     * background of the punchcard's axes.
     * @return {Base} returns a reference to the instance of Base
     */
    protected drawChartBody():Base {
        //
        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft;
        let dy:number = this.marginTop;


        this.svg.append('g')
            .attr('class', 'chartbody')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .append('rect')
                .attr('width', w)
                .attr('height', h)
                .attr('class', 'chartbody');

        return this;
    }



    /**
     * Adds an SVG g element containing an SVG text element with which to label
     * the horizontal axis.
     * @return {Base} returns a reference to the instance of Base
     */
    protected drawHorizontalAxisLabel():Base {

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft + 0.5 * w;
        let dy:number = this.marginTop + h + 0.8 * this.marginBottom;

        this.svg.append('g')
            .attr('class', 'horizontal-axis-label')
            .attr('transform', 'translate(' + dx + ',' + dy + ')')
            .append('text')
            .text(this.xlabel)
            .attr('class', 'horizontal-axis-label');

        return this;
    }



    /**
     * Adds a Legend to the plot, while resizing the punchcard as necessary.
     * @return {Base} returns a reference to the instance of Base
     */
    protected drawLegend():Base {
        // draw the legend

        let legend:Legend = new Legend(this);
        legend.draw();


        return this;
    }



    /**
     * Adds an SVG element to the DOM, so that other methods you can do d3
     * things with it later.
     * @return {Base} returns a reference to the instance of Base
     */
    protected drawSvg():Base {

        this.svg = d3.select(this.domElem).append('svg')
            .attr('width', this.domElem.clientWidth)
            .attr('height', this.domElem.clientHeight);

        return this;
    }



    /**
     * Adds an SVG g element containing an SVG text element representing the
     * title of the punchcard graph.
     * @return {Base} returns a reference to the instance of Base
     */
    protected drawTitle():Base {

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let dx:number = this.marginLeft + 0.5 * w;
        let dy:number = 0.5 * this.marginTop;

        this.svg.append('g')
            .attr('class', 'title')
            .attr('transform', 'translate(' + dx + ',' + dy + ')')
            .append('text')
            .text(this.title)
            .attr('class', 'title');

        return this;
    }



    /**
     * Adds an SVG g element containing a d3.linear.axis representing the hour
     * of day.
     * @return {Base} returns a reference to the instance of Base
     */
    protected drawVerticalAxis():Base {
        //
        let dx:number = this.marginLeft;
        let dy:number = this.domElem.clientHeight - this.marginBottom;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;


        this.todScale = d3.scale.linear()
            .range([-h, 0])
            .domain([0.0, 24.0]);

        let todAxis = d3.svg.axis()
            .orient('left')
            .scale(this.todScale)
            .tickValues([0, 3, 6, 9, 12, 15, 18, 21, 24])
            .innerTickSize(5)
            .outerTickSize(0);

        this.svg.append('g')
            .attr('class', 'vertical-axis')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .call(todAxis);

        return this;

    }



    /**
     * Adds an SVG g element containing an SVG text element with which to label
     * the vertical axis.
     * @return {Base} returns a reference to the instance of Base
     */
    protected drawVerticalAxisLabel():Base {
        //
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = 0.3 * this.marginLeft;
        let dy:number = this.marginTop + 0.5 * h;

        this.svg.append('g')
            .attr('class', 'vertical-axis-label')
            .attr('transform', 'translate(' + dx + ',' + dy + ') rotate(-90)')
            .append('text')
            .text(this.ylabel)
            .attr('class', 'vertical-axis-label');

        return this;

    }






    /**
     * When the window is resized, redraw the punchcard graph in its entirety,
     * while observing the new maximum size.
     * @return {[type]} [description]
     */
    protected onResize() {

        // get the div element that we want to redraw
        let div = this.domElem;

        // delete the contents of the div
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }

        this.draw();

    }



    /**
     * Sets the CSS style min-height such that the body of the punchcard graph
     * cannot become smaller than 100px in height, while taking into account the
     * margins on the top and bottom of the graph.
     * @return {Base} returns a reference to the instance of Base
     */
    private updateMinHeight():Base {

        let top:number = this.marginTop;
        let bottom:number = this.marginBottom;

        if (typeof top === 'undefined' || top < 0) {
            top = 0;
        }

        if (typeof bottom === 'undefined' || bottom < 0) {
            bottom = 0;
        }

        this.domElem.style.minHeight = (top + bottom + 100).toString() + 'px';

        return this;
    }



    /**
     * Sets the CSS style min-width such that the body of the punchcard graph
     * cannot become narrower than 100px, while taking into account the
     * margins on the left and right of the graph.
     * @return {Base} returns a reference to the instance of Base
     */
    private updateMinWidth():Base {

        let left:number = this.marginLeft;
        let right:number = this.marginRight;

        if (typeof left === 'undefined' || left < 0) {
            left = 0;
        }

        if (typeof right === 'undefined' || right < 0) {
            right = 0;
        }

        this.domElem.style.minWidth = (left + right + 100).toString() + 'px';

        return this;
    }



    /**
     * [marginLeft description]
     * @param  {number} marginLeft [description]
     * @return {[type]}            [description]
     */
    public set marginLeft(marginLeft:number) {
        this._marginLeft = marginLeft;
        this.updateMinWidth();
    }

    /**
     * [marginLeft description]
     * @return {number} [description]
     */
    public get marginLeft():number {
        return this._marginLeft;
    }

    /**
     * [marginRight description]
     * @param  {number} marginRight [description]
     * @return {[type]}             [description]
     */
    public set marginRight(marginRight:number) {
        this._marginRight = marginRight;
        this.updateMinWidth();
    }

    /**
     * [marginRight description]
     * @return {number} [description]
     */
    public get marginRight():number {
        return this._marginRight;
    }

    /**
     * [marginTop description]
     * @param  {number} marginTop [description]
     * @return {[type]}           [description]
     */
    public set marginTop(marginTop:number) {
        this._marginTop = marginTop;
        this.updateMinHeight();
    }

    /**
     * [marginTop description]
     * @return {number} [description]
     */
    public get marginTop():number {
        return this._marginTop;
    }

    /**
     * [marginBottom description]
     * @param  {number} marginBottom [description]
     * @return {[type]}              [description]
     */
    public set marginBottom(marginBottom:number) {
        this._marginBottom = marginBottom;
        this.updateMinHeight();
    }

    /**
     * [marginBottom description]
     * @return {number} [description]
     */
    public get marginBottom():number {
        return this._marginBottom;
    }

    /**
     * [legendWidth description]
     * @param  {number} legendWidth [description]
     * @return {[type]}             [description]
     */
    public set legendWidth(legendWidth:number) {
        let minimumWidth:number = 50;
        this._legendWidth = Math.max(legendWidth, 50);
    }

    /**
     * [legendWidth description]
     * @return {number} [description]
     */
    public get legendWidth():number {
        return this._legendWidth;
    }

}


