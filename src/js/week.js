/*! Calendar week view
**/

import React from "react";

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
}

/** REACT component Week
*/
class Week {
    render(){

        // generate the left hand time stamp label list

        let timeStamps = genTimeTable();

        let renderStampList = (stamp, i) => {
            if (i ==0 ) { i = 24; }
            let stampClassName = "timestamps__stamp stamp--"+i;

            return (
                <li className={stampClassName}>
                    <div className="timestamps__label">{stamp}</div>
                    <div className="timestamps__divider" />
                </li>
            );
        }

        // generate the week days col list

        let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let renderWeekDays = (day, i) => {
            let dayClassName = "weekdays__day day--"+i;
            return <li className={dayClassName}>{day}</li>;
        }

        return (
            <section className="week">
                <div className="week__header">heading goes here </div>
                <div className="week__scrollpane">
                    <ol className="timestamps">{ timeStamps.map(renderStampList) }</ol>
                    <ol className="weekdays">{ weekdays.map(renderWeekDays) }</ol>
                </div>
            </section>
        );
    }
}

export default Week;