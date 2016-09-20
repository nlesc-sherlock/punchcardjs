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



    it('...html fixture should have loaded correctly. (code: 29c656)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: 4c05af)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["casenumber", "datestr", "description", "latitude", "longitude", "primary"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 5000 records. (code: 082a03)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 5000;
        expect(actual).toEqual(expected);
    });



    it('...constructor should return an instance of punchcards.WeekdayCircle when called with valid arguments. (code: 773f39)', function () {
        var actual, weekdaycircle;
        weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
        actual = weekdaycircle instanceof punchcards.WeekdayCircle;
        expect(actual).toBe(true);
    });

    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" attached to it. (code: e6f138)', function () {
            var actual, weekdaycircle;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
            weekdaycircle.drawSvg();
            weekdaycircle.drawHorizontalAxis();
            weekdaycircle.drawVerticalAxis();
            weekdaycircle.drawSymbols();
            actual = weekdaycircle.svg.select('g.symbol')[0][0];
            expect(actual).not.toBe(null);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 139 SVG circles of class ' +
        '"symbol" attached to it. (code: 88996e)', function () {
            var actual, weekdaycircle, symbols;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
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



    it('...html fixture should have loaded correctly. (code: 11ed22)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: 67497e)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["datestr"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 3 records. (code: 9bcec8)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 3;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 2 SVG circle elements of class ' +
        '"symbol" attached to it. (code: 7a27b6)', function () {
            var actual, weekdaycircle, symbols;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
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



    it('...html fixture should have loaded correctly. (code: 3522d9)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: 7d9f83)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["datestr"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have just 1 record. (code: 462d69)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 1;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG circle of class ' +
        '"symbol" attached to it. (code: f0189a)', function () {
            var actual, weekdaycircle, symbols;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
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
        '"symbol" attached to it, whose radius should be a positive number. (code: ca0d17)', function () {

            // matches the following radiuses
            //
            // 0
            // 120
            // 120.43
            // .4
            // .48982
            // 489.
            //
            // but not
            //
            // .
            // NaN

            var actual, weekdaycircle, symbols, re;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
            weekdaycircle.drawSvg();
            weekdaycircle.drawHorizontalAxis();
            weekdaycircle.drawVerticalAxis();
            weekdaycircle.drawSymbols();
            symbols = weekdaycircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            re = new RegExp('^([\\d\\.]{2,}|[\\d]{1,})$');
            actual = re.test(symbols[0].getAttribute('r'));
            expect(actual).toBe(true);
        });



});




describe('punchcards WeekdayCircle class with test/simple-n1-custom-datekey.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('weekday-circle.fixture.html',
            'simple-n1-custom-datekey.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function () {
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly. (code: e4bbb6)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: 6e3697)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["my-custom-datekey"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have just 1 record. (code: 809c01)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 1;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG circle of class ' +
        '"symbol" attached to it. (code: 00987c)', function () {
            var actual, weekdaycircle, symbols;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle', 'my-custom-datekey');
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
        '"symbol" attached to it, whose radius should be a positive number. (code: fa6622)', function () {

            // matches the following radiuses
            //
            // 0
            // 120
            // 120.43
            // .4
            // .48982
            // 489.
            //
            // but not
            //
            // .
            // NaN

            var actual, weekdaycircle, symbols, re;
            weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle', 'my-custom-datekey');
            weekdaycircle.drawSvg();
            weekdaycircle.drawHorizontalAxis();
            weekdaycircle.drawVerticalAxis();
            weekdaycircle.drawSymbols();
            symbols = weekdaycircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            re = new RegExp('^([\\d\\.]{2,}|[\\d]{1,})$');
            actual = re.test(symbols[0].getAttribute('r'));
            expect(actual).toBe(true);
        });



});


