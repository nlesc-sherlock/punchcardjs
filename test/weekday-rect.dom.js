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



    it('...html fixture should have loaded correctly. (code: c7261a)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-rect"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: c7e0a7)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["casenumber", "datestr", "description", "latitude", "longitude", "primary"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 5000 records. (code: 67d281)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 5000;
        expect(actual).toEqual(expected);
    });



    it('...constructor should return an instance of punchcards.WeekdayRect when called with valid arguments. (code: 3365c6)', function () {
        var actual, weekdayrect;
        weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
        actual = weekdayrect instanceof punchcards.WeekdayRect;
        expect(actual).toBe(true);
    });



    it('...after calling .drawHorizontalAxis(), the chart should have an ' +
        'SVG g element of class "horizontal-axis" attached to it. (code: 569623)', function () {
            var actual, weekdayrect;
            weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
            weekdayrect.drawSvg();
            weekdayrect.drawHorizontalAxis();
            actual = weekdayrect.svg.select('g.horizontal-axis')[0][0];
            expect(actual).not.toBe(null);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" attached to it. (code: 768b12)', function () {
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
        '"symbol" attached to it. (code: 4566ed)', function () {
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



    it('...html fixture should have loaded correctly. (code: 568d68)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-rect"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: 9704e4)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["datestr"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 3 records. (code: 61f4d7) ', function () {
        var actual, expected;
        actual = cf.size();
        expected = 3;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 2 SVG rects of class ' +
        '"symbol" attached to it. (code: 02d32f)', function () {
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



    it('...html fixture should have loaded correctly. (code: 32fdc1)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-rect"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: 4b7ff9)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["datestr"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have just 1 record. (code: 0f92d2)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 1;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG rect of class ' +
        '"symbol" attached to it. (code: b4cc40)', function () {
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



    it('...html fixture should have loaded correctly. (code: 55724c)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-rect"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: c2ef41) ', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["my-custom-datekey"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have just 1 record. (code: ceefa8)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 1;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG rect of class ' +
        '"symbol" attached to it. (code: d993ba)', function () {
            var actual, weekdayrect, symbols;
            weekdayrect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect', 'my-custom-datekey');
            weekdayrect.drawSvg();
            weekdayrect.drawHorizontalAxis();
            weekdayrect.drawVerticalAxis();
            weekdayrect.drawSymbols();
            symbols = weekdayrect.svg.select('g.symbol').selectAll('rect.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(1);
        });



});

