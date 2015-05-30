
/** generate the time stamp labels in array form
*/
let genTimeTable = () => {

    let stampArray = [];

    for (let i=24; i>0; i--){
        let timestamp = 0;
        if (i > 12) { 
            let amdiff = 24-i;
            if (amdiff == 0) {
                timestamp = '12am';
            } else {
                timestamp = 24-i + 'am'; 
            }
        } else { 
            let pmdiff = 12-i;
            if (pmdiff == 0) {
                timestamp = '12pm'; 
            } else {
                timestamp = pmdiff +'pm'; 
            }
        }
        stampArray.push(timestamp);
    }

    return stampArray;
};

/** some useful date/time methods
*/
let timestuff = () => {

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

    let getDaysInMonth = (
        month, year) => {
        return new Date(year, month+1, 0).getDate();
    };

    // use somedate or current date
    // return formatted time obj

    let formatDate = (somedate) => {
        var rightnow = somedate ? new Date(somedate) : new Date();

        return {
            "year" : rightnow.getFullYear(),
            "month" : rightnow.getMonth(),
            "day" : rightnow.getDate(),
            "hour" : rightnow.getHours(),
            "minute" : rightnow.getMinutes(),
            "weekday" : rightnow.getDay(),
            "dayname" : dayNames[ rightnow.getDay() ],
            "monthname" : monthNames[ rightnow.getMonth() ]
        }
    };

    // uses somedate or current date
    // returns array of formatted date objects

    let getFullWeek = (somedate) => {
        let rightnow = somedate ? new Date(somedate) : new Date();
        rightnow.setHours(0,0,0,0);

        let start = new Date(rightnow);
        start.setDate(start.getDate() - start.getDay() );

        let end = new Date(rightnow);
        end.setDate(end.getDate() - end.getDay() + 6);

        return { weekStart: formatDate(start), weekEnd: formatDate(end) }
    };

    // uses somedate or current date
    // like get week return the date names from start of month to end of month

    let getFullMonth = (somedate) => {
        let rightnow = somedate ? new Date(somedate) : new Date();

        let month = rightnow.getMonth();
        let year = rightnow.getFullYear();

        let firstday = new Date(year, month, 1);
        let lastday =  new Date(year, month, getDaysInMonth(month, year));
 
        return { monthStart: getFullWeek(firstday).weekStart, monthEnd: getFullWeek(lastday).weekEnd };
    };

    // takes in FORMATTED objects not date objects
    // count how many weeks are in this month

    let getCountWeeks = (start, end) => {
        const MS_WEEK = 1000 * 60 * 60 * 24 * 7;

        let startInMS = Date.UTC(start.year, start.month, start.day);
        let endInMS = Date.UTC(end.year, end.month, end.day);

        return Math.ceil((endInMS - startInMS) / MS_WEEK);
    }

    // make date readable by returning an object
    // optional date object
    return {
        
        // takes month int and year int, note MONTH is 1 off bc DATE makes no sense
        // returns INT

        daysInMonth: (month, year) => {
            return getDaysInMonth();
        },

        // ------------------------------ helpers for current time

        current: () => {
            return formatDate();
        },

        currentMonth: () => {
            return new Date().getMonth();
        },

        currentYear: () => {
            return new Date().getFullYear();
        },

        currentDate: () => {
            return new Date().getDate();
        },

        currentHour: () => {
            return new Date().getHours();
        },

        currentMinute: () => {
            return new Date().getMinutes();
        },

        currentFullMonth: () => {
            return getFullMonth();
        },

        currentFullWeek: () => {
            return getFullWeek();
        },

        getDayNames: () => {
            return dayNames;
        },

        getMonthNames: () => {
            return monthNames;
        },

        countWeeks: (start, end) => {
            return getCountWeeks(start, end);
        }

    }
}();

export { genTimeTable, timestuff };