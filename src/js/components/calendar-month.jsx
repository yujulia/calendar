/*! Calendar month view

**/
import React from "react/addons";
import Time from "../helpers/time";
import _ from "underscore";

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

        this.state = {
            monthNames : Time.getMonthNames(),
            today : Time.current()
        }
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
            dayString='';

        if (day.day == 1) {
            dayString = this.state.monthNames[day.month].slice(0,3) + " " + day.day;
        } else {
            dayString = day.day;
        }
        if (day.month !== this.props.realmonth ) {
            dayString = <span className="fade">{ dayString }</span>;
        }

        let todayClass = 'month__item', 
            today = this.state.today;
            
        if (today.year == day.year && today.month == day.month && today.day == day.day) {
            todayClass += ' today';
        } 

        return(
            <td className={todayClass} data-month={day.month} data-day={ day.day } data-year={day.year} key={dkey}>
                { dayString } 
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
        console.log("render month");

        return (      
            <section className="container">
                <ReactCSSTransitionGroup transitionName="month" transitionAppear={true}>
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