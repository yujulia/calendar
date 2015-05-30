/*! Calendar week view
**/
import React from "react/addons";
import { genTimeTable, timestuff } from "../helpers/time";

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


/** REACT component Week
*/
class CalendarWeek extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);
        this.renderDays = this.renderDays.bind(this);
        this.renderWeek = this.renderWeek.bind(this);
        this.renderWeekHeader = this.renderWeekHeader.bind(this);
    }

    // --------------------------- render the week day 
    renderDays(day, i) {
        if (i == 0) { i = 7; }
        return (<td className="week__row__item" data-day={i} key={i}><div className="divider" /></td>);
    }

    // --------------------------- render the week 
    renderWeek(stamp, i) {
        if (i == 0 ) { i = 24; }
        let dayNames = timestuff.getDayNames();

        return (
            <tr className="week__row" data-time={i} key={i}>
                <th className="week__row__label">{stamp}</th>
                { dayNames.map(this.renderDays) }
            </tr>
        );
    }

    // --------------------------- render the week headers

    renderWeekHeader(day, i) {
        if (i == 0) { i = 7; }
        return (<th className="week__header__item" data-day={i} key={i}><strong>{day.slice(0, 3)}</strong> 10/10</th>);
    }

    // --------------------------- RETURN
    render(){
   
        let timeStamps = genTimeTable();    // get the list of times
        let dayNames = timestuff.getDayNames();

        return (      
            <section className="container">
                <ReactCSSTransitionGroup transitionName="week" transitionAppear={true}>
                <table className="week" key="w">
                    <thead className="week__header" key="wh">
                        <tr className="week__header__row" key="whr">
                            <th className="week__row__label empty" key="whre"><span key="whres">11pm</span></th>
                            { dayNames.map(this.renderWeekHeader) }
                        </tr>
                    </thead>
                    <tbody key="wb">
                        { timeStamps.map(this.renderWeek) }
                    </tbody>
                </table>
                </ReactCSSTransitionGroup>
            </section>
        );
    }
}

export default CalendarWeek;