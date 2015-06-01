/*! Calendar month view

**/
import React from "react/addons";
import _ from "underscore";

import Time from "../helpers/time";


let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


/** REACT component CalendarMonth
*/
class CalendarMonth extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.renderWeek = this.renderWeek.bind(this);
        this.renderMonthHeader = this.renderMonthHeader.bind(this);

        this.monthNames = Time.getMonthNames();
        this.today = Time.current();
    }

    // --------------------------- render the week headers

    renderMonthHeader(day, i) {
        let mhkey = "mh"+i;

        return (
            <th className="month__header__item" data-day={i} key={mhkey}>
                <strong>{day.slice(0, 3)}</strong>
            </th>
        );
    }

    // --------------------------- render days of this month
    renderDay(day, i){
        let dkey = "day"+day.id, 
            dlkey = "daylabel"+day.id,
            dayString='';

        if (day.day == 1) {
            dayString = <span>{ this.monthNames[day.month].slice(0,3) } <span className="num">{day.day}</span></span>;
        } else {
            dayString = <span className="num">{day.day}</span>;
        }
        if (day.month !== this.props.realmonth ) {
            dayString = <span className="fade">{ dayString }</span>;
        }

        let todayClass = 'month__item';

        if (this.today.year == day.year && this.today.month == day.month && this.today.day == day.day) {
            todayClass += ' today';
        } 

        return(
            <td className={todayClass} data-month={day.month} data-day={ day.day } data-year={day.year} key={dkey}>
                <span className="month__item__label" key={dlkey}>{ dayString }</span>
            </td>
        );
    }

    // --------------------------- render weeks of this month
    renderWeek(week, i){
        let wkey = "week"+i;

        return (
            <tr className="month__row" key={wkey}> 
                { week.map(this.renderDay) }
            </tr>
        );
    }

    // --------------------------- RENDER

    render(){
        
        return (      
            <section className="container">
                <ReactCSSTransitionGroup transitionName="month">
                <table className="month" key="m">
                    <thead className="month__header" key="mh">
                        <tr className="month__header__row" key="mhr">
                            { Time.getDayNames().map(this.renderMonthHeader) }
                        </tr>
                    </thead>
                    <tbody key="mb">
                        { this.props.data.map(this.renderWeek) }
                    </tbody>
                </table>
                </ReactCSSTransitionGroup>
            </section>
        );
    }
}

export default CalendarMonth;