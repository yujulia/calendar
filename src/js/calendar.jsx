/*! Calendar app
**/

import React from "react";
import Nav from "./components/nav.jsx";
import CalendarWeek from "./components/calendar-week.jsx";
import CalendarMonth from "./components/calendar-month.jsx";
import Time from "./helpers/time";

class Calendar extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleToggleView = this.handleToggleView.bind(this);

        this.state = {
            week : false,
            month : true,
            today : true,

            todayDate: new Date(),
            currentMonth: new Date(),
            currentWeekStart: Time.getWeekStartDate(),

            monthData: Time.getMonthData().data,
            weekData: Time.getWeekData().data
        };
    }

    // --------------------------- 

    componentDidMount(){

    }

    // ---------------------------  update the range

    updateTimeRange(getweek, getmonth){
        // test if today is true or false in here?
        let weekData = getweek(this.state.currentWeekStart);
        let monthData = getmonth(this.state.currentMonth);

        this.setState({
            today: false,
            currentMonth: new Date(monthData.date),
            currentWeekStart: new Date(weekData.date),
            monthData: monthData.data,
            weekData: weekData.data
        });
    }

    // --------------------------- the view needs to be changed

    handleToggleView(view){
        if (view === "today") {
            if (!this.state.today) {
                this.updateTimeRange(Time.getWeekData, Time.getMonthData);
            }
        }
        if (view === "next") {
            this.updateTimeRange(Time.getNextWeekData, Time.getNextMonthData);
        }
        if (view === "prev") {  
            this.updateTimeRange(Time.getPrevWeekData, Time.getPrevMonthData); 
        }

        if (view === "week") {
            this.setState({ week: true, month: false });
        }

        if (view === "month") {
            this.setState({ week: false, month: true });
        }

    }

    // --------------------------- RENDER

    render(){

        console.log("render calendar");

        let week = this.state.week ? <CalendarWeek data={ this.state.weekData } /> : '',
            month = this.state.month ? <CalendarMonth data={ this.state.monthData } month={ this.state.currentMonth.getMonth() + 1 } /> : '';

        return (
            <main className="calendar">
                <Nav onToggleView={ this.handleToggleView.bind(this) } viewSelect={this.state} />
                { week }{ month }
            </main>
        );
    }
}

export default Calendar;