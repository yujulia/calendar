/*! Calendar month view

**/
import React from "react/addons";
import { timestuff } from "../helpers/time";
import _ from "underscore";

const WEEKDAYS = 7;

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


/** REACT component CalendarMonth
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
        let mhkey = "mh"+i;
        return (
            <th className="month__header__item" data-day={i} key={mhkey}>
                <strong>{day.slice(0, 3)}</strong>
            </th>
        );
    }

    // --------------------------- render days of this month
    renderDays(day, i){
        console.log(day.id);
        let dkey = "day"+day.id;
        return(
            <td className="month__item" key={dkey}>
             { day.day }
            </td>
        );
    }

    // --------------------------- render weeks of this month
    renderWeeks(week, i){
        let wkey = "week"+i;
        return (
            <tr className="month__row" key={wkey}> 
                { week.map(this.renderDays) }
            </tr>
        );
    }

    // --------------------------- find how many weeks in this month and every day
    setData(){
        let monthData = [];

        let weekCount = timestuff.getWeeks(this.props.month.monthStart, this.props.month.monthEnd);
        let days = timestuff.getDays(this.props.month.monthStart, this.props.month.monthEnd);

        let start = 0;
        for (let i=0; i < weekCount; i++){
            let myslice = days.slice(start, start+WEEKDAYS);
            start = start + WEEKDAYS;
            monthData.push(myslice);
        }

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
                        { this.state.data.map(this.renderWeeks) }
                    </tbody>
                </table>
                </ReactCSSTransitionGroup>
            </section>
        );
    }
}

export default CalendarMonth;