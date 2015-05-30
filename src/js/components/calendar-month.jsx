/*! Calendar month view
**/
import React from "react/addons";
import { timestuff } from "../helpers/time";
import _ from "underscore";

const WEEKDAYS = 7;

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/** REACT component Month
*/
class CalendarMonth extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);
        this.renderDays = this.renderDays.bind(this);
        this.renderWeeks = this.renderWeeks.bind(this);
        this.renderMonthHeader = this.renderMonthHeader.bind(this);
        this.setData = this.setData.bind(this);
        this.state = {
            data: [],
            weeks: 0
        };
    }

    // --------------------------- load data
    componentWillMount() {
        this.setData();
    }

    // --------------------------- render the week headers

    renderMonthHeader(day, i) {
        if (i == 0) { i = WEEKDAYS; }
        return (<th className="month__header__item" data-day={i} key={i}><strong>{day.slice(0, 3)}</strong></th>);
    }

    // --------------------------- render days of this month
    renderDays(i){
        // let info = this.state.monthdata.data.shift();
   
        // return(
        //     <td className="month__item" key={i}>
        //      { info.day }
        //     </td>
        // );
    }

    // --------------------------- render weeks of this month
    renderWeeks(i){
        return (
            <tr className="month__row" key={i}> 
                { _(WEEKDAYS).times(this.renderDays) }
            </tr>
        );
    }

    // --------------------------- figure out the array
    setData(){

        let weekCount = timestuff.countWeeks(this.props.month.monthStart, this.props.month.monthEnd);
        let monthData = [];

        // let days = [], 
        //     prevDays = [], 
        //     nextDays = [],
        //     currDays = [],
        //     prevYear = this.state.year, 
        //     nextYear = this.state.year,
        //     prevMonth = this.state.month-1, 
        //     nextMonth = this.state.month+1, 
        //     year=this.state.year;


        // // if we are going back a year or going forward a year...
        // if (prevMonth < 0) { prevMonth = 11; prevYear--;}
        // if (nextMonth > 11 ) { nextMonth = 0; nextYear++; }

        // // see how many days in last month and current month
        // let prevMonthDays = timestuff.daysInMonth(prevMonth, prevYear); // how many days last month
        // let currentMonthDays = timestuff.daysInMonth(this.state.month, this.state.year); // how many days this month

        // // helper function to store some data
        // let addData = (year, month, i) => {
        //     return { "year": year, "month": month, "day": i }
        // };

        // // create arrays of integers to map the days
        // _(prevMonthDays).times((i) => prevDays.push(addData(prevYear, prevMonth, i+1))); 
        // _(currentMonthDays).times((i) => currDays.push(addData(this.state.year, this.state.month, i+1)));

        // // find dates we are showing of the previous month
        // let prevSpill = prevDays.slice(prevDays.length -1 - this.state.weekday, prevDays.length); 

   
        // let finalSum = prevSpill.concat(currDays); // previous days and current month days
        // let weeks = Math.floor(finalSum.length / 7); // how many weeks?

        // // we can't divide the days evenly into weeks so lets add another week
        // if (finalSum.length%7){
        //     weeks++;
        //     _(WEEKDAYS).times((i) => nextDays.push(addData(nextYear, nextMonth,i+1))); // pad with next month
        //     finalSum = finalSum.concat(nextDays);
        // } 

        // let maxdays = weeks*WEEKDAYS; // we dont need to add all 7 days, truncate the array

        // return { "data": finalSum.slice(0, maxdays), "weeks": weeks };

        this.setState({ weeks: weekCount, data: monthData });
    }

    // --------------------------- RENDER

    render(){
        return (      
            <section className="container">
                <ReactCSSTransitionGroup transitionName="month" transitionAppear={true}>
                <table className="month" key="m">
                    <thead className="month__header" key="mh">
                        <tr className="month__header__row" key="mhr">
                            { timestuff.getDayNames().map(this.renderMonthHeader) }
                        </tr>
                    </thead>
                    <tbody key="mb">
                        // { _(this.state.weeks).times(this.renderWeeks) }
                    </tbody>
                </table>
                </ReactCSSTransitionGroup>
            </section>
        );
    }
}

export default CalendarMonth;