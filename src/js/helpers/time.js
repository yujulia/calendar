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


/** ref data for weekdays
*/
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export { genTimeTable, dayNames };