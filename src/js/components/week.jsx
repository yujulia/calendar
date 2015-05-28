/*! Calendar week view
**/
import React from "react";
import { genTimeTable, dayNames } from "../helpers/time";

/** REACT component Week
*/
class Week {
    render(){
   
        let timeStamps = genTimeTable();    // get the list of times
        let weekdays = dayNames;            // get the list of days

        let renderDays = (day, i) => {
            let dayClassName = "week__body__item weekday--"+i;
            return (<td className={dayClassName}><div className="divider" /></td>);
        };

        let renderWeek = (stamp, i) => {
            if (i ==0 ) { i = 24; }
            let stampClassName = "timerow timerow--"+i;
            return (
                <tr className={stampClassName}>
                    <th className="timerow__label">{stamp}</th>
                    { weekdays.map(renderDays) }
                </tr>
            );
        };

        let renderWeekHeader = (day, i) => {
            let dayClassName = "week__header__item weekday--"+i;
            return <th className={dayClassName}>{day.slice(0, 3)} 10/10</th>;
        };


        // -------------------------------------- the week view
        return (      
            <section className="container">
                <table className="week">
                    <thead className="week__header">
                        <tr className="week__header__row">
                            <th className="timerow__label"><span>11pm</span></th>
                            { weekdays.map(renderWeekHeader) }
                        </tr>
                    </thead>
                    <tbody className="week__body">
                        { timeStamps.map(renderWeek) }
                    </tbody>
                </table>
            </section>
        );
    }
}

export default Week;