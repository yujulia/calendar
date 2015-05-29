
/** ref data for weekdays
*/

let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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


/** 
*/

let currentTime = () => {
    let rightnow = new Date();

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
}

let timestuff = {

    daysInMonth: (month, year) => {
        return new Date(year, month+1, 0).getDate();
    }
    
}

export { genTimeTable, dayNames, monthNames, currentTime, timestuff };