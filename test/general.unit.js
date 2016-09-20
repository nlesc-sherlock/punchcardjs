/*
 * Tests whether the general testing setup works
 */

/*global describe, it, expect, punchcards, crossfilter, d3, moment, fixture*/

describe('punchcards general testing functionality', function () {

    'use strict';

    it('...should know about Punchcards. (code: b77707)', function () {
        expect(punchcards).not.toBe(null);
    });


    it('...should have loaded the crossfilter library. (code: 21168d)', function () {
        expect(crossfilter).not.toBe(null);
    });


    it('...should have loaded the d3 library. (code: 425599)', function () {
        expect(d3).not.toBe(null);
    });


    it('...should have loaded the moment library. (code: 8fcbf4)', function () {
        expect(moment).not.toBe(null);
    });


    it('...should have loaded the test data. (code: a15dc0)', function () {
        var data;
        fixture.base = 'test';
        data = fixture.load('cityofchicago-police-data.fixture.json');
        expect(data).not.toBe(null);
    });


    it('...should have created a crossfilter object out of the test data. (code: a18c5f)', function () {
        var data, cf;
        fixture.base = 'test';
        data = fixture.load('cityofchicago-police-data.fixture.json');
        cf = crossfilter(data);
        expect(cf).not.toBe(null);
    });


    it('...should be able to find the html fixtures. (code: 0c1dc5)', function () {
        var html;
        fixture.base = 'test';
        html = fixture.load('base.fixture.html');
        expect(html).not.toBe(null);
    });


});
