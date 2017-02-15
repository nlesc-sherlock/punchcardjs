
/**
 * Associates a point in the domain space to a color
 * @type {Object}
 */
export type ColorTableItem = {
    at   : number;
    color: [number, number, number];
}

/**
 * An array of ColorTableItems
 * @type {[type]}
 */
export type ColorTable = Array<ColorTableItem>;

/**
 * ColorMap helps you associate values from the domain to rgba color values,
 * where each channel is in the range [0,255]
 */
export class ColorMap {

    /**
     * Array of ColorTableItems, where each ColorTableItem associates a point
     * along the domain's number line to an rgba color.
     * @type {ColorTable}
     */
    public colortable: ColorTable;
    /**
     * Domain value assocatiated with the lowest color from the ColorMap.
     * @type {number}
     */
    public cLimLow: number;
    /**
     * Domain value assocatiated with the highest color from the ColorMap.
     * @type {number}
     */
    public cLimHigh: number;
    /**
     * if the user does not specify which ColorMap she wants to use,
     * defaultColorTable is what she'll get.
     * @type {ColorTable}
     */
    static defaultColorTable:ColorTable = [
        {
            at: Number.NEGATIVE_INFINITY,
            color: [255, 255, 255, 255]
        },
        {
            at: 0.0,
            color: [8, 106, 227, 0]
        },
        {
            at: 1.0,
            color: [227, 8, 88, 0]
        },
        {
            at: Number.POSITIVE_INFINITY,
            color: [255, 255, 255, 255]
        }
    ];

    /**
     * [constructor description]
     * @param  {ColorTable|string} colortable [description]
     * @return {[type]}                       [description]
     */
    constructor (colortable?:ColorTable|string) {

        let str: string;
        let ct : ColorTable;

        if (typeof colortable === 'undefined') {

            str = 'default';
            ct = this.expandColorTableStr(str);

        } else if (typeof colortable === 'string') {

            str = undefined;
            ct = this.expandColorTableStr(colortable);

        } else if (typeof colortable === 'object') {

            str = undefined;
            try {
                ct = <ColorTable>colortable;
            } catch (Error) {
                throw new Error('Can\'t cast to ColorTable type');
            }
        } else {
            throw new Error('Undefined behavior for these input arguments.');
        }

        // use my own compare function to sort the array based on the value of
        // each element's 'at' property:
        this.colortable = ct.sort(this.compare);

        // adjust the color limits
        let nColors = this.colortable.length;
        this.cLimLow = this.colortable[1].at;
        this.cLimHigh = this.colortable[nColors - 2].at;

    }


    /**
     * comparison function to help sort the ColorTableItems that make
     * up a ColorTable. Basically when comparing objects, you have to specify
     * which key you want to compare/sort on, which for this function is the
     * value of a ColorTableItem's 'at' key.
     * @param  {ColorTableItem} a the first ColorTableItem (left hand side
     * member of the comparison)
     * @param  {ColorTableItem} b the second ColorTableItem (right hand side
     * of the comparison)
     * @return {number} number identifying how a nd b compare. Returns -1 when
     * a<b, 1 when a>b, or 0 when a==b
     */
    private compare(a:ColorTableItem, b:ColorTableItem):number {

        if (a.at < b.at) {
            return -1;
        } else if (a.at > b.at) {
            return 1;
        } else {
            return 0;
        }
    }


    /**
     * Returns a ColorTable based on an input string
     * @param  {string} input string, e.g. 'default', 'gray', 'empty',
     * 'autumn', 'blues', 'summer', 'rainbow'
     * @return {ColorTable} The ColorTable associated with the input string
     */
    protected expandColorTableStr(str:string):ColorTable {

        let colortable:ColorTable;

        switch (str) {
            case 'default': {
                colortable = ColorMap.defaultColorTable;
                break;
            }
            case 'gray': {
                colortable = [
                    {
                        at: Number.NEGATIVE_INFINITY,
                        color: [0, 0, 0, 255]
                    },
                    {
                        at: 0.0,
                        color: [0, 0, 0, 0]
                    },
                    {
                        at: 1.0,
                        color: [255, 255, 255, 0]
                    },
                    {
                        at: Number.POSITIVE_INFINITY,
                        color: [255, 255, 255, 255]
                    }
                ];
                break;
            }
            case 'empty': {
                colortable = [
                    {
                        at: Number.NEGATIVE_INFINITY,
                        color: [0, 0, 0, 255]
                    },
                    {
                        at: Number.POSITIVE_INFINITY,
                        color: [255, 255, 255, 255]
                    }
                ];
                break;
            }
            case 'autumn': {
                colortable = [
                    {
                        at: Number.NEGATIVE_INFINITY,
                        color: [0, 0, 0, 255]
                    },
                    {
                        at: 0.0,
                        color: [255, 0, 0, 0]
                    },
                    {
                        at: 1.0,
                        color: [255, 255, 0, 0]
                    },
                    {
                        at: Number.POSITIVE_INFINITY,
                        color: [255, 255, 255, 255]
                    }
                ];
                break;
            }
            case 'blues': {
                colortable = [
                    {
                        at: Number.NEGATIVE_INFINITY,
                        color: [0, 0, 0, 255]
                    },
                    {
                        at: 0.0,
                        color: [0, 0, 255, 0]
                    },
                    {
                        at: 1.0,
                        color: [0, 255, 255, 0]
                    },
                    {
                        at: Number.POSITIVE_INFINITY,
                        color: [255, 255, 255, 255]
                    }
                ];
                break;
            }
            case 'summer': {
                colortable = [
                    {
                        at: Number.NEGATIVE_INFINITY,
                        color: [0, 0, 0, 255]
                    },
                    {
                        at: 0.0,
                        color: [8, 160, 120, 0]
                    },
                    {
                        at: 1.0,
                        color: [252, 252, 42, 0]
                    },
                    {
                        at: Number.POSITIVE_INFINITY,
                        color: [255, 255, 255, 255]
                    }
                ];
                break;
            }
            case 'rainbow': {
                colortable = [
                    {
                        at:Number.NEGATIVE_INFINITY,
                        color: [255, 255,   0,  0]
                    },
                    {
                        at:0.000,
                        color: [255, 255,   0,  0]
                    },
                    {
                        at:0.125,
                        color: [255, 255,   0,  0]
                    },
                    {
                        at:0.250,
                        color: [145, 255,   0,  0]
                    },
                    {
                        at:0.375,
                        color: [  0, 255,  54,  0]
                    },
                    {
                        at:0.500,
                        color: [  0, 179, 255,  0]
                    },
                    {
                        at:0.625,
                        color: [ 10,   0, 255,  0]
                    },
                    {
                        at:0.750,
                        color: [171,   0, 255,  0]
                    },
                    {
                        at:0.875,
                        color: [255,   0, 159,  0]
                    },
                    {
                        at:1.000,
                        color: [255,  89,   0,  0]
                    },
                    {
                        at:Number.POSITIVE_INFINITY,
                        color: [255,  89,   0,  0]
                    }
                ];
                break;
            }
            default: {
                throw new Error('ColorMap.expandColorTableStr(): unknown case');
            }
        }

        return colortable;

    }



    /**
     * Returns an rgba color array based on the current colormap (including the
     * domain values at the upper and lower boundaries of the ColorMap) and an
     * input domain value. The color values are determined by linear
     * interpolation between the known color values, as defined by the ColorMap.
     * @param  {number} at Value for which you want to know the associated color
     * @return {[type]} 4-D vector containing rgba value of the color, with 0
     * represetning zero intensity and 255 full intensity.
     */
    public getColor(at:number):[number, number, number, number] {

        // if there is only one value in the range, lower the lower limit and
        // raise the upper limit
        if (this.cLimLow === this.cLimHigh) {
            this.cLimLow -= 0.5;
            this.cLimHigh += 0.5;
        }

        let atUnity = (at - this.cLimLow) / (this.cLimHigh - this.cLimLow);
        let nColors = this.colortable.length;

        let prev:ColorTableItem;
        let next:ColorTableItem;

        for (let iColor = 0; iColor < nColors; iColor++) {
            let cond1 = this.colortable[iColor].at <= atUnity;
            let cond2 = atUnity < this.colortable[iColor + 1].at;
            if (cond1 && cond2) {
                prev = this.colortable[iColor];
                next = this.colortable[iColor + 1];
                break;
            }
        }

        let atRelative:number = (atUnity - prev.at) / (next.at - prev.at);
        let theColor: [number, number, number, number] = [
            Math.floor(prev.color[0] + (next.color[0] - prev.color[0]) * atRelative),
            Math.floor(prev.color[1] + (next.color[1] - prev.color[1]) * atRelative),
            Math.floor(prev.color[2] + (next.color[2] - prev.color[2]) * atRelative),
            255
        ];

        for (let channel of theColor) {
            if (channel < 0 || channel > 255) {
                throw new Error('Calculated color out of bounds.');
            }
        }

        return theColor;
    }



    /**
     * CSS string representation of the result returned by ColorMap.getColor().
     * Note that the string does not include a transparency value.
     * @param  {number} at Value for which you want to know the associated color.
     * @return {string} CSS string representing the rgb color.
     */
    public getColorRGB(at:number):string {

        let color:[number, number, number];
        color = this.getColor(at);
        return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    }



    /**
     * Add a ColorTableItem to the current ColorMap
     * @param  {ColorTableItem} color Color to add, with linkage to domain value.
     * @return {ColorMap} Updated ColorMap
     */
    public addColor(color: ColorTableItem): ColorMap {

        this.colortable.push(color);
        this.colortable = this.colortable.sort(this.compare);

        return this;
    }

    /**
     * Add multiple ColorTableItems to the ColorMap
     * @param  {ColorTable} colors Colors to add to the ColorMap
     * @return {ColorMap} Updated Colormap
     */
    public addColors(colors:ColorTable): ColorMap {

        for (let elem of colors) {
            this.colortable.push(elem);
        }
        this.colortable = this.colortable.sort(this.compare);

        return this;
    }




}
