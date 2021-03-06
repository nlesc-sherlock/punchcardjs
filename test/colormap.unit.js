/*global describe, it, punchcards, expect */

describe('punchcards.ColorMap', function () {
    'use strict';

    it('...constructing with a string argument should return an object of ' +
        'type \'ColorMap\' when called with a valid string. (code: a42ed3)', function () {
            var actual, expected;
            actual = (new punchcards.ColorMap('default')) instanceof punchcards.ColorMap;
            expected = true;
            expect(actual).toEqual(expected);
        });


    it('...constructing with a string argument \'default\' ...should return ' +
        'a colortable equal to the class property \'defaultColorTable\'. (code: 57d6d0)', function () {
            var actual, expected;
            actual = (new punchcards.ColorMap('default')).colortable;
            expected = punchcards.ColorMap.defaultColorTable;
            expect(actual).toEqual(expected);
        });


    it('...constructing with no arguments ...should yield the default color table. (code: defc9c)', function () {
        var actual, expected;
        actual = (new punchcards.ColorMap()).colortable;
        expected = punchcards.ColorMap.defaultColorTable;
        expect(actual).toEqual(expected);
    });


    it('...constructing with a ColorTable argument should yield a ColorMap ' +
        'with that ColorTable as .colortable. (code: 5fa817)', function () {
            var actual, expected, colortable;
            colortable = punchcards.ColorMap.defaultColorTable;
            actual = (new punchcards.ColorMap(colortable)).colortable;
            expected = punchcards.ColorMap.defaultColorTable;
            expect(actual).toEqual(expected);
        });


    it('...constructing with a Number is undefined and results in an Error. (code: 1371fb)', function () {
        var actual, expected;
        actual = function () {
            return new punchcards.ColorMap(8.682727);
        };
        expected = 'Undefined behavior for these input arguments.';
        expect(actual).toThrowError(expected);
    });

});



describe('punchcards.ColorMap.addColor()', function () {
    'use strict';

    it('...the colortable should include the test color after we add it. (code: ead471)', function () {

        var actual,
            expected,
            testcolor,
            cmgray;

        function hascolor(colortable, testcolor) {
            // returns true is testcolor occurs in colortable
            var iColor,
                nColors,
                cond1,
                cond2,
                cond3,
                cond4,
                cond5;

            nColors = colortable.length;

            for (iColor = 0; iColor < nColors; iColor += 1) {
                cond1 = colortable[iColor].at === testcolor.at;
                cond2 = colortable[iColor].color[0] === testcolor.color[0];
                cond3 = colortable[iColor].color[1] === testcolor.color[1];
                cond4 = colortable[iColor].color[2] === testcolor.color[2];
                cond5 = colortable[iColor].color[3] === testcolor.color[3];
                if (cond1 && cond2 && cond3 && cond4 && cond5) {
                    return true;
                }
            }
            return false;
        }

        // instantiate the colormap object using the predefined gray colormap
        cmgray = new punchcards.ColorMap('gray');

        // define the color that we'll add later
        testcolor = {at: 0.5, color: [128, 128, 128, 0]};

        // check that the colormap.colortable does not already have a color that
        // matches the testcolor we're going to add.
        actual = hascolor(cmgray.colortable, testcolor);
        expected = false;

        if (actual !== expected) {
            throw new Error('The colortable already includes the color we want ' +
                'to add, rendering the test pointless.');
        }

        // add the test color
        cmgray.addColor(testcolor);

        // check that the colormap.colortable now includes the testcolor.
        actual = hascolor(cmgray.colortable, testcolor);
        expected = true;

        expect(actual).toEqual(expected);

    });
});



describe('punchcards.ColorMap.addColors()', function () {
    'use strict';

    it('...constructing with a ColorTable argument should yield a ' +
        'ColorMap with that ColorTable. (code: aa511f)', function () {

            var colortable,
                colormap,
                actual,
                expected;

            // construct with a ColorTable
            colortable = [
                {
                    at: 0.0,
                    color: [0, 0, 0, 0]
                },
                {
                    at: 1.0,
                    color: [255, 255, 255, 0]
                }
            ];

            // make a colormap with an 'empty' colortable
            colormap = new punchcards.ColorMap('empty');

            // add the colortable info
            colormap.addColors(colortable);

            // get the colortable after we added the colors
            actual = colormap.colortable;
            expected = (new punchcards.ColorMap('gray')).colortable;

            expect(actual).toEqual(expected);

        });

});



describe('punchcards.ColorMap.getColorRGB()', function () {

    'use strict';

    it('...the rgb string representation of the color at value 0.0 should ' +
        'be \'rgb(0,0,0)\' when using the predefined \'gray\' colormap. (code: 7d8119)', function () {

            var actual,
                expected,
                cmgray;

            // instantiate the colormap object using the predefined gray colormap
            cmgray = new punchcards.ColorMap('gray');

            // check that the colormap.colortable now includes the testcolor.
            actual = cmgray.getColorRGB(0.0);
            expected = 'rgb(0,0,0)';
            expect(actual).toEqual(expected);

        });

});
