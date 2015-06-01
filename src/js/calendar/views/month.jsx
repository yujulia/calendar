/*! Calendar month view

**/
import React from "react/addons";
import _ from "underscore";
import Time from "time";
import Day from "dayofmonth.jsx";

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/** REACT component CalendarMonth
*/
class CalendarMonth extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);

        this.handleDayClick = this.handleDayClick.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.renderWeek = this.renderWeek.bind(this);
        this.renderMonthHeader = this.renderMonthHeader.bind(this);

        this.state = {
            day : 0
        }
    }

    // --------------------------- day is clicked
    handleDayClick(clickedDay){
        let selectedDay = ''+clickedDay.year+clickedDay.month+clickedDay.day;
        this.setState({ day: selectedDay });
    }

    // --------------------------- render days of this month
    renderDay(day, i){
        let dk = 'day'+day.year+day.month+day.day;

        return(
            <Day day={day} onDay={ this.state.day } onDayClick={this.handleDayClick} key={dk}/>
        );
    }

    // --------------------------- render weeks of this month
    renderWeek(week, i){
        let wkey = "week"+i;

        return (
            <tr className="month__row" key={wkey}>{ week.map(this.renderDay) }</tr>
        );
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