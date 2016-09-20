/*
 * tests requiring DOM manipulation for punchcards.WeekdayRect from dist/punchcards.js
 */

/*global describe, beforeEach, fixture, crossfilter, afterEach, it, expect, punchcards*/

describe('punchcards WeekdayRect class with test/cityofchicago-police-data.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('weekday-rect.fixture.html',
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
        expected = '<div id="punchcard-weekday-rect"></div>';
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



    it('...constructor should return an instance of punchcards.WeekdayRect when called with valid arguments', function () {
        var actual, weekdayrect;
        weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
        actual = weekdayrect instanceof punchcards.WeekdayRect;
        expect(actual).toBe(true);
    });



    it('...after calling .drawHorizontalAxis(), the chart should have an ' +
        'SVG g element of class "horizontal-axis" attached to it', function () {
            var actual, weekdayrect;
            weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
            weekdayrect.drawSvg();
            weekdayrect.drawHorizontalAxis();
            actual = weekdayrect.svg.select('g.horizontal-axis')[0][0];
            expect(actual).not.toBe(null);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" attached to it', function () {
            var actual, weekdayrect;
            weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
            weekdayrect.drawSvg();
            weekdayrect.drawHorizontalAxis();
            weekdayrect.drawVerticalAxis();
            weekdayrect.drawSymbols();
            actual = weekdayrect.svg.select('g.symbol')[0][0];
            expect(actual).not.toBe(null);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 139 SVG rects of class ' +
        '"symbol" attached to it', function () {
            var actual, weekdayrect, symbols;
            weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
            weekdayrect.drawSvg();
            weekdayrect.drawHorizontalAxis();
            weekdayrect.drawVerticalAxis();
            weekdayrect.drawSymbols();
            symbols = weekdayrect.svg.select('g.symbol').selectAll('rect.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(139);
        });

});





describe('punchcards WeekdayRect class with test/simple-n3.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('weekday-rect.fixture.html',
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
        expected = '<div id="punchcard-weekday-rect"></div>';
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
        'SVG g element of class "symbol" with 2 SVG rects of class ' +
        '"symbol" attached to it', function () {
            var actual, weekdayrect, symbols;
            weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
            weekdayrect.drawSvg();
            weekdayrect.drawHorizontalAxis();
            weekdayrect.drawVerticalAxis();
            weekdayrect.drawSymbols();
            symbols = weekdayrect.svg.select('g.symbol').selectAll('rect.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(2);
        });



});





describe('punchcards WeekdayRect class with test/simple-n1.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('weekday-rect.fixture.html',
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
        expected = '<div id="punchcard-weekday-rect"></div>';
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
        'SVG g element of class "symbol" with 1 SVG rect of class ' +
        '"symbol" attached to it', function () {
            var actual, weekdayrect, symbols;
            weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
            weekdayrect.drawSvg();
            weekdayrect.drawHorizontalAxis();
            weekdayrect.drawVerticalAxis();
            weekdayrect.drawSymbols();
            symbols = weekdayrect.svg.select('g.symbol').selectAll('rect.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(1);
        });


});





describe('punchcards WeekdayRect class with test/simple-n1-custom-datekey.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('weekday-rect.fixture.html',
            'simple-n1-custom-datekey.fixture.json');

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
        expected = '<div id="punchcard-weekday-rect"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["my-custom-datekey"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have just 1 record', function () {
        var actual, expected;
        actual = cf.size();
        expected = 1;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG rect of class ' +
        '"symbol" attached to it', function () {
            var actual, weekdayrect, symbols;
            weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
            weekdayrect.datekey = 'my-custom-datekey';
            weekdayrect.drawSvg();
            weekdayrect.drawHorizontalAxis();
            weekdayrect.drawVerticalAxis();
            weekdayrect.drawSymbols();
            symbols = weekdayrect.svg.select('g.symbol').selectAll('rect.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(1);
        });



});

