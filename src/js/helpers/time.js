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
    // return: OBJ { weekStart, weekEnd } of OBJ

    let fullWeek = (somedate) => {
        let weekdate = somedate ? new Date(somedate) : new Date();
        weekdate.setHours(0,0,0,0);

        let start = new Date(weekdate);
        start.setDate(start.getDate() - start.getDay() );

        let end = new Date(weekdate);
        end.setDate(end.getDate() - end.getDay() + 6);

        return { weekStart: formatDate(start), weekEnd: formatDate(end) }
    };

    // ------------------------------------------- given date, find month its in
    // args: DATE somedate (optional)
    // return: OBJ { monthStart, monthEnd } of OBJ

    let fullMonth = (somedate) => {
        let monthdate = somedate ? new Date(somedate) : new Date();

        let month = monthdate.getMonth(),
            year = monthdate.getFullYear();

        let firstday = new Date(year, month, 1);
        let lastday =  new Date(year, month, getDaysInMonth(month, year));
 
        return { monthStart: fullWeek(firstday).weekStart, monthEnd: fullWeek(lastday).weekEnd };
    };

    // ------------------------------------------- given time range, count how many weeks it is MAX
    // args: OBJ start, OBJ end
    // return: INT weeks count

    let countWeeks = (start, end) => {
        const MS_WEEK = 1000 * 60 * 60 * 24 * 7;
        let startInMS = Date.UTC(start.year, start.month, start.day);
        let endInMS = Date.UTC(end.year, end.month, end.day);

        return Math.ceil((endInMS - startInMS) / MS_WEEK);
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
            oneDate.month = oneDate.month+1; // fix month being off by 1
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
            weekCount = countWeeks(start, end), // how many weeks in this full month
            days = getDays(start, end);         // how many days in this full month

        for (let i=0; i < weekCount; i++){
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
        let thisDate = somedate ? new Date(somedate) : new Date();
        let thisMonth = fullMonth(thisDate);

        return { data: splitMonthToWeeks(thisMonth.monthStart, thisMonth.monthEnd), date: thisDate };
    };

    // ------------------------------------------- given date, find this entire week's data
    // args: DATE somedate (optional)
    // return: return: OBJ { data, date }

    let findWeekData = (somedate) => {
        let thisDate = somedate ? new Date(somedate) : new Date();
        let thisWeek = fullWeek(thisDate);

        return { data: getDays(thisWeek.weekStart, thisWeek.weekEnd), date: thisDate };

    }

    // ------------------------------------------- find sunday's date
    // args: DATE somedate (optional)
    // return: DATE


    let findWeekStartDate = (somedate) => {
        let thisDate = somedate ? new Date(somedate) : new Date();
        let startDate = fullWeek(thisDate).weekStart;

        return new Date(startDate.year, startDate.month, startDate.day); 
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


    return {

        current: () => { return formatDate(); },

        getDayNames: () => { return dayNames; },

        getMonthNames: () => { return monthNames; },

        getHours: () => { return makeHours(); },

        getMonthData: (somedate) => { return findMonthData(somedate); },

        getWeekData: (somedate) => { return findWeekData(somedate); },

        getWeekStartDate: (somedate) => { return findWeekStartDate(somedate); },

        getNextMonthData: (somedate) => { return nextMonthData(somedate); },

        getNextWeekData: (somedate) => { return nextWeekData(somedate); },

        getPrevMonthData: (somedate) => { return prevMonthData(somedate); },

        getPrevWeekData: (somedate) => { return prevWeekData(somedate); }

    }
}();

export default Time;