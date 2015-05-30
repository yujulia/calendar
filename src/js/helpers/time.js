import _ from "underscore";

/** some useful date/time methods
*/
let Time = () => {

    const WEEKDAYS = 7;

    let dayNames = [
        'Sunday', 
        'Monday', 
        'Tuesday', 
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday'
    ];

    let monthNames = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'
    ];

    // ------------------------------------------- find how many days in a certain month
    // args: INT month, INT year
    // return: INT day count

    let getDaysInMonth = (month, year) => {

        return new Date(year, month+1, 0).getDate();
    };

    // ------------------------------------------- make array of time intervals 12am - 11pm
    // return: ARRAY of { id, label }

    let makeHours = () => {
        let hourArray = [];

        for (let i=24; i>0; i--){
            let timestamp = 0;
            if (i > 12) { 
                let amdiff = 24-i;
                if (amdiff == 0) {
                    timestamp = '12am';
                } else {
                    timestamp = amdiff + 'am'; 
                }
            } else { 
                let pmdiff = 12-i;
                if (pmdiff == 0) {
                    timestamp = '12pm'; 
                } else {
                    timestamp = pmdiff +'pm'; 
                }
            }
            hourArray.push({ id: i, label: timestamp });
        }

        return hourArray;
    };

    // ------------------------------------------- make DATE obj into lookup
    // args: DATE 
    // return: OBJ {} of INT and STR

    let formatDate = (somedate) => {
        var formatThis = somedate ? new Date(somedate) : new Date();

        return {
            "year" : formatThis.getFullYear(),
            "month" : formatThis.getMonth(),
            "day" : formatThis.getDate(),
            "hour" : formatThis.getHours(),
            "minute" : formatThis.getMinutes(),
            "weekday" : formatThis.getDay(),
            "dayname" : dayNames[ formatThis.getDay() ],
            "monthname" : monthNames[ formatThis.getMonth() ]
        }
    };

    // ------------------------------------------- given date, find week its in
    // args: DATE somedate (optional)
    // return: OBJ { start, end } of OBJ

    let fullWeek = (somedate) => {
        let weekdate = somedate ? new Date(somedate) : new Date();
        weekdate.setHours(0,0,0,0);

        let start = new Date(weekdate);
        start.setDate(start.getDate() - start.getDay() );

        let end = new Date(weekdate);
        end.setDate(end.getDate() - end.getDay() + 6);

        return { 
            start: formatDate(start), 
            end: formatDate(end) 
        }
    };

    // ------------------------------------------- given date, find month its in
    // args: DATE somedate (optional)
    // return: OBJ { start, end } of OBJ

    let fullMonth = (somedate) => {
        let monthdate = somedate ? new Date(somedate) : new Date();

        let month = monthdate.getMonth(),
            year = monthdate.getFullYear();

        let firstday = new Date(year, month, 1);
        let lastday =  new Date(year, month, getDaysInMonth(month, year));
 
        return { 
            start: fullWeek(firstday).start, 
            end: fullWeek(lastday).end 
        };
    };


    // ------------------------------------------- given time range, find all the dates
    // args: OBJ start, OBJ end
    // return: ARRAY of OBJ { formatDate, id, month(fixed) }

    let getDays = (start, end) => {
        let days = [], 
            i = 0, 
            startDate = new Date(start.year, start.month, start.day),
            endDate = new Date(end.year, end.month, end.day);

        while (startDate <= endDate) {
            let oneDate = formatDate(startDate);
            oneDate.id = i;
            oneDate.month = oneDate.month; // fix month being off by 1
            days.push(oneDate);
            startDate.setDate(startDate.getDate()+1);
            i++;
        }

        return days;
    };

    // ------------------------------------------- given time range, arrange into matrix
    // args: OBJ start, OBJ end
    // return: ARRAY of ARRAY of OBJ [[], [], []]

    let splitMonthToWeeks = (start, end) => {

        let monthData = [],
            sliceStart = 0,
            days = getDays(start, end);         // how many days in this full month

        while (sliceStart < days.length){
            let sliceEnd = sliceStart + WEEKDAYS;
            monthData.push(days.slice(sliceStart, sliceEnd));
            sliceStart = sliceEnd;
        }

        return monthData;
    };

    // ------------------------------------------- given date, find this entire month's data
    // args: DATE somedate (optional)
    // return: return: OBJ { data, date }

    let findMonthData = (somedate) => {
        let thisDate = somedate ? new Date(somedate) : new Date(),
            thisMonth = fullMonth(thisDate),
            realMonth = new Date(thisMonth.start.year, thisMonth.start.month, thisMonth.start.day+10);

        let mdata = { 
            data: splitMonthToWeeks(thisMonth.start, thisMonth.end), 
            start: new Date(thisMonth.start.year, thisMonth.start.month, thisMonth.start.day),
            end: new Date(thisMonth.end.year, thisMonth.end.month, thisMonth.end.day),
            date: thisDate, 
            month: realMonth 
        };
        return mdata;
    };

    // ------------------------------------------- given date, find this entire week's data
    // args: DATE somedate (optional)
    // return: return: OBJ { data, date }

    let findWeekData = (somedate) => {
        let thisDate = somedate ? new Date(somedate) : new Date(),
            thisWeek = fullWeek(thisDate),
            wdata = { 
                data: getDays(thisWeek.start, thisWeek.end), 
                start: new Date(thisWeek.start.year, thisWeek.start.month, thisWeek.start.day),
                end: new Date(thisWeek.end.year, thisWeek.end.month, thisWeek.end.day),
                date: thisDate 
            };
            return wdata;
    }

    // ------------------------------------------- get next month's data
    // args: DATE somedate (optional)
    // return: OBJ { data, date }

    let nextMonthData = (somedate) => {     
        let thisDate = somedate ? new Date(somedate) : new Date();
        thisDate.setMonth(thisDate.getMonth() + 1);

        return findMonthData(thisDate);
    };

    // ------------------------------------------- get previous month's data
    // args: DATE somedate (optional)
    // return: OBJ { data, date }

    let prevMonthData = (somedate) => {   
        let thisDate = somedate ? new Date(somedate) : new Date();
        thisDate.setMonth(thisDate.getMonth() - 1);

        return findMonthData(thisDate);
    };

    // ------------------------------------------- get next week's data
    // args: DATE somedate (optional)
    // return: OBJ { data, date }

    let nextWeekData = (somedate) => {
        let thisDate = somedate ? new Date(somedate) : new Date();
        thisDate.setDate(thisDate.getDate() + WEEKDAYS);

        return findWeekData(thisDate);
    };

    // ------------------------------------------- get prev week's data
    // args: DATE somedate (optional)
    // return: OBJ { data, date }

    let prevWeekData = (somedate) => {
        let thisDate = somedate ? new Date(somedate) : new Date();
        thisDate.setDate(thisDate.getDate() - WEEKDAYS);

        return findWeekData(thisDate);
    };

    // ------------------------------------------- get current week data
    // args:
    // return: OBJ { data, date }

    let thisWeekData = () => {
        let thisDate = new Date();

        return findWeekData(thisDate);
    };

    // ------------------------------------------- get current month's data
    // args: 
    // return: OBJ { data, date }

    let thisMonthData = () => {   
        let thisDate = new Date();

        return findMonthData(thisDate);
    };


    // ------------------------------------------- format date range
    // args: STR type, DATE somedate
    // return STR 

    let formatDateRange = (type, somedate) => {
        let thisDate = somedate ? new Date(somedate) : new Date();

        if (type == "m") {
            return monthNames[ thisDate.getMonth() ] + " " + thisDate.getFullYear();
        }

        if (type == "w"){
            let thisWeek = fullWeek(thisDate),
                sameYear = (thisWeek.start.year == thisWeek.end.year) ? true : false,
                sameMonth = (thisWeek.start.month == thisWeek.end.month) ? true : false,
                temp = monthNames[thisWeek.start.month] + " " + thisWeek.start.day;

            if (!sameYear) { temp += thisWeek.start.year; }
            temp += " - ";
            if (!sameMonth) { temp += monthNames[thisWeek.end.month];  }
            temp += " " + thisWeek.end.day + " " + thisWeek.end.year;

            return temp;
        }

    };

    // ------------------------------------------- see if today is in range of data
    // args: OBJ { mstart, mend, wstart, wend }
    // return BOOLEAN 

    let checkTodayInView = (data) => {
        let todayInMonth = false,
            todayInWeek = false;

            let today = formatDate(new Date());
            let todayMS = Date.UTC(today.year, today.month, today.day);

            _.each(data, function(value, key) {
                let time = formatDate(value);
                let utc = Date.UTC(time.year, time.month, time.day);
                data[key] = utc;
            });

            if (todayMS >= data.mstart && todayMS <= data.mend ) {
                todayInMonth = true;
            }

            if (todayMS >= data.wstart && todayMS <= data.wend ) {
                todayInWeek = true;
            }
        return {
            inMonth : todayInMonth,
            inWeek : todayInWeek
        };
    };


    return {

        current: () => { return formatDate(); },

        getDayNames: () => { return dayNames; },

        getMonthNames: () => { return monthNames; },

        getHours: () => { return makeHours(); },

        getThisMonthData: () => { return thisMonthData(); },

        getThisWeekData: () => { return thisWeekData(); },

        getNextMonthData: (somedate) => { return nextMonthData(somedate); },

        getNextWeekData: (somedate) => { return nextWeekData(somedate); },

        getPrevMonthData: (somedate) => { return prevMonthData(somedate); },

        getPrevWeekData: (somedate) => { return prevWeekData(somedate); },

        getDateRange: (type, somedate) => { return formatDateRange(type, somedate); },

        isTodayInView: (data) => { return checkTodayInView(data); }

    }
}();

export default Time;