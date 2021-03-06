/*
 * tests requiring DOM manipulation for punchcards.DateCircle from dist/punchcards.js
 */

/*global describe, beforeEach, fixture, crossfilter, afterEach, it, expect, punchcards*/

describe('punchcards DateCircle class with cityofchicago-police-data.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('date-circle.fixture.html',
            'cityofchicago-police-data.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function () {
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly. (code: 7ffb40)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-date-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: f03283)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["casenumber", "datestr", "description", "latitude", "longitude", "primary"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 5000 records. (code: f03283)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 5000;
        expect(actual).toEqual(expected);
    });



    it('...constructor should return an instance of punchcards.DateCircle when called with valid arguments. (code: c20f3b)', function () {
        var actual, datecircle;
        datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
        actual = datecircle instanceof punchcards.DateCircle;
        expect(actual).toBe(true);
    });

    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" attached to it. (code: fc8a8e)', function () {
            var actual, datecircle;
            datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
            datecircle.drawSvg();
            datecircle.drawHorizontalAxis();
            datecircle.drawVerticalAxis();
            datecircle.drawSymbols();
            actual = datecircle.svg.select('g.symbol')[0][0];
            expect(actual).not.toBe(null);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 139 SVG circles of class ' +
        '"symbol" attached to it. (code: 9d5370)', function () {
            var actual, datecircle, symbols;
            datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
            datecircle.drawSvg();
            datecircle.drawHorizontalAxis();
            datecircle.drawVerticalAxis();
            datecircle.drawSymbols();
            symbols = datecircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(139);
        });


});




describe('punchcards DateCircle class with test/simple-n3.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('date-circle.fixture.html',
            'simple-n3.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function () {
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly. (code: 406aff)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-date-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: 6c6830)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["datestr"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 3 records. (code: 4b65c6)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 3;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 2 SVG circle elements of class ' +
        '"symbol" attached to it. (code: 7dbfd6)', function () {
            var actual, datecircle, symbols;
            datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
            datecircle.drawSvg();
            datecircle.drawHorizontalAxis();
            datecircle.drawVerticalAxis();
            datecircle.drawSymbols();
            symbols = datecircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(2);
        });



});





describe('punchcards DateCircle class with test/simple-n1.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('date-circle.fixture.html',
            'simple-n1.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function () {
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly. (code: 98ca4b)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-date-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: 2c127b)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["datestr"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have just 1 record. (code: 9a9ee3)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 1;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG circle of class ' +
        '"symbol" attached to it. (code: a52a17)', function () {
            var actual, datecircle, symbols;
            datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
            datecircle.drawSvg();
            datecircle.drawHorizontalAxis();
            datecircle.drawVerticalAxis();
            datecircle.drawSymbols();
            symbols = datecircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(1);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG circle of class ' +
        '"symbol" attached to it, whose radius should be a positive number. (code: 67f968)', function () {

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

            var actual, datecircle, symbols, re;
            datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
            datecircle.drawSvg();
            datecircle.drawHorizontalAxis();
            datecircle.drawVerticalAxis();
            datecircle.drawSymbols();
            symbols = datecircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            re = new RegExp('^([\\d\\.]{2,}|[\\d]{1,})$');
            actual = re.test(symbols[0].getAttribute('r'));
            expect(actual).toBe(true);
        });



});





describe('punchcards DateCircle class with test/simple-n1-custom-datekey.fixture.json...', function () {

    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('date-circle.fixture.html',
            'simple-n1-custom-datekey.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function () {
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly. (code: 6ecf88)', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-date-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly. (code: 11b8b9)', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["my-custom-datekey"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have just 1 record. (code: 183a15)', function () {
        var actual, expected;
        actual = cf.size();
        expected = 1;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG circle of class ' +
        '"symbol" attached to it. (code: 7accb6)', function () {
            var actual, datecircle, symbols;
            datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle', 'my-custom-datekey');
            datecircle.drawSvg();
            datecircle.drawHorizontalAxis();
            datecircle.drawVerticalAxis();
            datecircle.drawSymbols();
            symbols = datecircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(1);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 1 SVG circle of class ' +
        '"symbol" attached to it, whose radius should be a positive number. (code: 961601)', function () {

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

            var actual, datecircle, symbols, re;
            datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle', 'my-custom-datekey');
            datecircle.drawSvg();
            datecircle.drawHorizontalAxis();
            datecircle.drawVerticalAxis();
            datecircle.drawSymbols();
            symbols = datecircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            re = new RegExp('^([\\d\\.]{2,}|[\\d]{1,})$');
            actual = re.test(symbols[0].getAttribute('r'));
            expect(actual).toBe(true);
        });



});



