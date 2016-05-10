/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../../typings/moment/moment-node.d.ts" />
/// <reference path="idatarow.ts" />

var start:moment.Moment;


// record the start of the visualization for performance analysis
start = moment();
console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: script starts');



function doit(data: IDataRow[]) {

    let punchcardDateCircle   : PunchcardDateCircle;
    let punchcardDateRect     : PunchcardDateRect;
    let punchcardWeekdayCircle: PunchcardWeekdayCircle;
    let punchcardWeekdayRect  : PunchcardWeekdayRect;

    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: doit() starts');

    let cf:CrossFilter.CrossFilter<IDataRow> = crossfilter(data);
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: crossfilter object done');

    // draw the punchcard-weekday with svg circles using the crossfilter object and D3
    punchcardWeekdayCircle = new PunchcardWeekdayCircle(cf, 'punchcard-weekday-circle');
    punchcardWeekdayCircle.defineDimensions();
    punchcardWeekdayCircle.draw();
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: punchcardWeekdayCircle done');

    // draw the punchcard-weekday with svg rects using the crossfilter object and D3
    punchcardWeekdayRect = new PunchcardWeekdayRect(cf, 'punchcard-weekday-rect');
    punchcardWeekdayRect.defineDimensions();
    punchcardWeekdayRect.draw();
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: punchcardWeekdayRect done');

    // draw the punchcard-date with svg circles using the crossfilter object and D3
    punchcardDateCircle = new PunchcardDateCircle(cf, 'punchcard-date-circle');
    punchcardDateCircle.defineDimensions();
    punchcardDateCircle.draw();
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: punchcardDateCircle done');

    // draw the punchcard-date with svg rects using the crossfilter object and D3
    punchcardDateRect = new PunchcardDateRect(cf, 'punchcard-date-rect');
    punchcardDateRect.defineDimensions();
    punchcardDateRect.draw();
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: punchcardDateRect done');

    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: doit() done');

};


// make a new dataloader
let dataloader: DataLoader = new DataLoader();

// configure the dataloader
dataloader.limit = 5000;

// set the offset to a large value to get to the more recent records (the
// results are sorted by increasing date); the more recent records are more
// likely to have valid coordinates.
dataloader.offset = 5559000;

// load the data
dataloader.loadData(doit);



