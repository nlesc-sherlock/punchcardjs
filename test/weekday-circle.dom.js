/*
 * tests requiring DOM manipulation for punchcards.WeekdayCircle from dist/punchcards.js
 */

/*global describe, beforeEach, fixture, crossfilter, afterEach, it, expect, punchcards*/

describe('punchcards WeekdayCircle class with cityofchicago-police-data.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('weekday-circle.fixture.html',
            'cityofchicago-police-data.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function () {
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["casenumber", "datestr", "description", "latitude", "longitude", "primary"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 5000 records', function () {
        var actual, expected;
        actual = cf.size();
        expected = 5000;
        expect(actual).toEqual(expected);
    });



    it('...constructor should return an instance of punchcards.WeekdayCircle when called with valid arguments', function () {
        var actual, weekdaycircle;
        weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
        actual = weekdaycircle instanceof punchcards.WeekdayCircle;
        expect(actual).toBe(true);
    });

    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" attached to it', function () {
            var actual, weekdaycircle;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
            weekdaycircle.defineDimensions();
            weekdaycircle.drawSvg();
            weekdaycircle.drawHorizontalAxis();
            weekdaycircle.drawVerticalAxis();
            weekdaycircle.drawSymbols();
            actual = weekdaycircle.svg.select('g.symbol')[0][0];
            expect(actual).not.toBe(null);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 139 SVG circles of class ' +
        '"symbol" attached to it', function () {
            var actual, weekdaycircle, symbols;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
            weekdaycircle.defineDimensions();
            weekdaycircle.drawSvg();
            weekdaycircle.drawHorizontalAxis();
            weekdaycircle.drawVerticalAxis();
            weekdaycircle.drawSymbols();
            symbols = weekdaycircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(139);
        });


});








describe('punchcards WeekdayCircle class with test/simple-n3.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('weekday-circle.fixture.html',
            'simple-n3.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function () {
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["datestr"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 3 records', function () {
        var actual, expected;
        actual = cf.size();
        expected = 3;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 2 SVG circle elements of class ' +
        '"symbol" attached to it', function () {
            var actual, weekdaycircle, symbols;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
            weekdaycircle.defineDimensions();
            weekdaycircle.drawSvg();
            weekdaycircle.drawHorizontalAxis();
            weekdaycircle.drawVerticalAxis();
            weekdaycircle.drawSymbols();
            symbols = weekdaycircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(2);
        });



});





describe('punchcards WeekdayCircle class with test/simple-n1.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('weekday-circle.fixture.html',
            'simple-n1.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function () {
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["datestr"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have just 1 record', function () {
        var actual, expected;
        actual = cf.size();
        expected = 1;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG circle of class ' +
        '"symbol" attached to it', function () {
            var actual, weekdaycircle, symbols;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
            weekdaycircle.defineDimensions();
            weekdaycircle.drawSvg();
            weekdaycircle.drawHorizontalAxis();
            weekdaycircle.drawVerticalAxis();
            weekdaycircle.drawSymbols();
            symbols = weekdaycircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(1);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG circle of class ' +
        '"symbol" attached to it, whose radius should be a positive number', function () {

            // matches the following
            //
            // <circle class="symbol" cx="104" cy="-125.66666666666667" r="0" fill="rgb(0,127,255)"></circle>
            // <circle class="symbol" cx="104" cy="-125.66666666666667" r="120" fill="rgb(0,127,255)"></circle>
            // <circle class="symbol" cx="104" cy="-125.66666666666667" r="0" fill="rgb(0,127,255)"></circle>
            // <circle class="symbol" cx="104" cy="-125.66666666666667" r="120.43" fill="rgb(0,127,255)"></circle>
            // <circle class="symbol" cx="104" cy="-125.66666666666667" r=".4" fill="rgb(0,127,255)"></circle>
            // <circle class="symbol" cx="104" cy="-125.66666666666667" r=".48982" fill="rgb(0,127,255)"></circle>
            //
            // but not
            //
            // <circle class="symbol" cx="104" cy="-125.66666666666667" r="NaN" fill="rgb(0,127,255)"></circle>

            var actual, weekdaycircle, symbols, re;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
            weekdaycircle.defineDimensions();
            weekdaycircle.drawSvg();
            weekdaycircle.drawHorizontalAxis();
            weekdaycircle.drawVerticalAxis();
            weekdaycircle.drawSymbols();
            symbols = weekdaycircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            re = new RegExp('^<circle.*r="(\d{1,}|\d{0,}\.\d{1,})".*><\/circle>$');
            actual = re.test(symbols[0]);
            expect(actual).toEqual(true);
        });



});


