/*! Calendar week view
**/
import React from "react";
import { genTimeTable, dayNames } from "../helpers/time";

/** REACT component Week
*/
class CalendarWeek extends React.Component {

    // --------------------------- render the week day 
    renderDays(day, i) {
        if (i == 0) { i = 7; }
        return (<td className="week__row__item" data-day={i} key={i}><div className="divider" /></td>);
    }

    // --------------------------- render the week 
    renderWeek(stamp, i) {
        if (i == 0 ) { i = 24; }

        return (
            <tr className="week__row" data-time={i}>
                <th className="week__row__label" key={i}>{stamp}</th>
                { dayNames.map(renderDays) }
            </tr>
        );
    }

    // --------------------------- render the week headers

    renderWeekHeader(day, i) {
        if (i == 0) { i = 7; }
        return <th className="week__header__item" data-day={i} key={i}><strong>{day.slice(0, 3)}</strong> 10/10</th>;
    }

    // --------------------------- RETURN
    render(){
   
        let timeStamps = genTimeTable();    // get the list of times

        return (      
            <section className="container">
                <table className="week">
                    <thead className="week__header">
                        <tr className="week__header__row">
                            <th className="week__row__label empty"><span>11pm</span></th>
                            { dayNames.map(renderWeekHeader) }
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

export default CalendarWeek;