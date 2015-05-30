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
        this.getDateRangeString = this.getDateRangeString.bind(this);
        this.handleToggleView = this.handleToggleView.bind(this);
        this.updateTimeRange = this.updateTimeRange.bind(this);


        this.state = {
            week : false,
            month : true,
            today : true,
            viewType: "month",
            todayDate: new Date(),
            currentMonth: new Date(),
            currentWeekStart: Time.getWeekStartDate(),
            dateRange: Time.getDateRange("m"),

            monthData: Time.getMonthData().data,
            weekData: Time.getWeekData().data
        };
    }

    // --------------------------- 

    componentDidMount(){

    }

    // --------------------------- 
    getDateRangeString(type){
        let title = "Wibbly Wobbly Timey Wimey";

        console.log("GET ", type);
        if (type == "month") {
            title = Time.getDateRange("m", this.state.currentMonth);
        }

        if (type == "week") {
            title = Time.getDateRange("w", this.state.currentWeekStart);
        }

        return title;
    }

    // ---------------------------  update the range

    updateTimeRange(getweek, getmonth){
        // test if today is true or false in here?
        let weekData = getweek(this.state.currentWeekStart);
        let monthData = getmonth(this.state.currentMonth);

        console.log("V", this.state);

        let somestring = this.getDateRangeString(this.state.viewType);

        this.setState({
            today: false,
            dateRange: somestring,
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
            this.setState({ week: true, month: false, viewType: view, dateRange: this.getDateRangeString(view) });
        }

        if (view === "month") {
            this.setState({ week: false, month: true, viewType: view, dateRange: this.getDateRangeString(view) });
        }

    }

    // --------------------------- RENDER

    render(){

        console.log("render calendar");

        let week = this.state.week ? <CalendarWeek data={ this.state.weekData } /> : '',
            month = this.state.month ? <CalendarMonth data={ this.state.monthData } month={ this.state.currentMonth.getMonth() + 1 } /> : '';

        return (
            <main className="calendar">
                <Nav onToggleView={ this.handleToggleView.bind(this) } viewSelect={this.state} dateRange={ this.state.dateRange } />
                { week }{ month }
            </main>
        );
    }
}

export default Calendar;