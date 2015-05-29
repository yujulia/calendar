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

        // --------------------------- render the week day 
        let renderDays = (day, i) => {
            if (i == 0) { i = 7; }
            return (<td className="week__row__item" data-day={i}><div className="divider" /></td>);
        };

        // --------------------------- render the week 
        let renderWeek = (stamp, i) => {
            if (i == 0 ) { i = 24; }
 
            return (
                <tr className="week__row" data-time={i}>
                    <th className="week__row__label">{stamp}</th>
                    { weekdays.map(renderDays) }
                </tr>
            );
        };

        // --------------------------- render the week headers
        let renderWeekHeader = (day, i) => {
            if (i == 0) { i = 7; }
            return <th className="week__header__item" data-day={i}>{day.slice(0, 3)} 10/10</th>;
        };


        // -------------------------------------- the week view
        return (      
            <section className="container">
                <table className="week">
                    <thead className="week__header">
                        <tr className="week__header__row">
                            <th className="week__row__label empty"><span>11pm</span></th>
                            { weekdays.map(renderWeekHeader) }
                        </tr>
                    </thead>
                    <tbody>
                        { timeStamps.map(renderWeek) }
                    </tbody>
                </table>
            </section>
        );
    }
}

export default Week;