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
        this.getTimeRangeString = this.getTimeRangeString.bind(this);
        this.updateTimeRange = this.updateTimeRange.bind(this);
        this.handleToggleView = this.handleToggleView.bind(this);

        let mdata = Time.getThisMonthData(),
            wdata = Time.getThisWeekData();

        this.state = {
            week : true,
            month : false,
            today : true,
            viewType: "week",
            realMonth: mdata.month, // the month we are actually on
            currentMonthStart: mdata.start,  // the starting day of this calendar
            currentMonthEnd: mdata.end,
            currentWeekStart: wdata.start, // the starting date of this week
            currentWeekEnd: wdata.end,
            dateRange: Time.getDateRange("m"), // the string title of the date range
            monthData: mdata.data, 
            weekData: wdata.data 
        };
    }

    // --------------------------- get the time range as string

    getTimeRangeString(type, realmonth){
        let title = "Wibbly Wobbly Timey Wimey";
        if (type == "month") {
            realmonth = realmonth ? realmonth : this.state.realMonth;
            title = Time.getDateRange("m", realmonth);
        }
        if (type == "week") {
            title = Time.getDateRange("w", this.state.currentWeekStart);
        }

        return title;
    }

    // ---------------------------  update the range

    updateTimeRange(getweek, getmonth){
        // test if today is true or false in here?
        let wdata = getweek(this.state.currentWeekStart),
            mdata = getmonth(this.state.realMonth),
            todayData = {
                mstart : mdata.start,
                mend : mdata.end,
                wstart : wdata.start,
                wend : wdata.end
            },
            todayIn = Time.isTodayInView(todayData);

        this.setState({
            today: (this.state.week) ? todayIn.inWeek : todayIn.inMonth, 
            dateRange: this.getTimeRangeString(this.state.viewType, mdata.month),
            realMonth: mdata.month,
            currentMonthStart: mdata.start,  // the starting day of this calendar
            currentMonthEnd: mdata.end,
            currentWeekStart: wdata.start, // the starting date of this week
            currentWeekEnd: wdata.end,
            monthData: mdata.data, 
            weekData: wdata.data 
        });
    }

    // --------------------------- the view needs to be changed

    handleToggleView(view){

        if (view === "today" && !this.state.today) {
            this.updateTimeRange(Time.getThisWeekData, Time.getThisMonthData);
        }
        if (view === "next") {
            this.updateTimeRange(Time.getNextWeekData, Time.getNextMonthData);
        }
        if (view === "prev") {  
            this.updateTimeRange(Time.getPrevWeekData, Time.getPrevMonthData); 
        }

        if ((view === "week") && (view !== this.state.viewType)) {
            this.setState({ week: true, month: false, viewType: view, dateRange: this.getTimeRangeString(view) });
        }

        if ((view === "month") && (view !== this.state.viewType)) {
            this.setState({ week: false, month: true, viewType: view, dateRange: this.getTimeRangeString(view) });
        }

    }

    // --------------------------- RENDER

    render(){

        let week = this.state.week ? <CalendarWeek data={this.state.weekData} today={this.state.today}/> : '',
            month = this.state.month ? <CalendarMonth data={this.state.monthData} realmonth={this.state.realMonth.getMonth()} /> : '',
            viewObj = { week: this.state.week, month: this.state.month, today: this.state.today };

        return (
            <main className="calendar">
                <Nav onToggleView={ this.handleToggleView } view={viewObj} dateRange={this.state.dateRange} />
                { week }{ month }
            </main>
        );
    }
}

export default Calendar;