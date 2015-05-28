/*! Calendar week view
**/
import React from "react";
import { genTimeTable, dayNames } from "../helpers/time";

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
        let weekdays = dayNames;
        let renderWeekDays = (day, i) => {
            let dayClassName = "weekdays__day day--"+i;
            return <li className={dayClassName}>{day}</li>;
        }


        // -------------------------------------- the week view
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