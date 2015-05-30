/** some useful date/time methods
*/
let Time = () => {

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

    // find how many days in a certain month

    let getDaysInMonth = (month, year) => {
        return new Date(year, month+1, 0).getDate();
    };

    // make the array of time stamps
    // return array of objects 

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
    }

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

    let fullWeek = (somedate) => {
        let rightnow = somedate ? new Date(somedate) : new Date();
        rightnow.setHours(0,0,0,0);

        let start = new Date(rightnow);
        start.setDate(start.getDate() - start.getDay() );

        let end = new Date(rightnow);
        end.setDate(end.getDate() - end.getDay() + 6);

        return { weekStart: formatDate(start), weekEnd: formatDate(end) }
    };

    // uses somedate or current date
    // return the formatted dates from start of month to end of month

    let fullMonth = (somedate) => {
        let rightnow = somedate ? new Date(somedate) : new Date();

        let month = rightnow.getMonth();
        let year = rightnow.getFullYear();

        let firstday = new Date(year, month, 1);
        let lastday =  new Date(year, month, getDaysInMonth(month, year));
 
        return { monthStart: fullWeek(firstday).weekStart, monthEnd: fullWeek(lastday).weekEnd };
    };

    // takes in FORMATTED objects not date objects
    // count how many weeks are in this month

    let countWeeks = (start, end) => {
        const MS_WEEK = 1000 * 60 * 60 * 24 * 7;

        let startInMS = Date.UTC(start.year, start.month, start.day);
        let endInMS = Date.UTC(end.year, end.month, end.day);

        return Math.ceil((endInMS - startInMS) / MS_WEEK);
    }

    // given formatted objects range of days
    // return array of formatted objects + an id

    let countDays = (start, end) => {

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
    }



    // make date readable by returning an object
    // optional date object
    return {

        current: () => { return formatDate(); },

        getDayNames: () => { return dayNames; },

        getMonthNames: () => { return monthNames; },

        getHours: () => { return makeHours(); },

        getFullMonth: (somedate) => { return fullMonth(somedate); },

        getFullWeek: (somedate) => { return fullWeek(somedate); },

        getWeeks: (start, end) => { return countWeeks(start, end); },

        getDays: (start, end) => { return countDays(start, end) }

    }
}();

export default Time;