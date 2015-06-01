/*! Calendar app
**/

import React from "react";
import _ from "underscore";

import Nav from "./components/nav.jsx";
import Popup from "./components/popup.jsx";
import CalendarWeek from "./views/calendar-week.jsx";
import CalendarMonth from "./views/calendar-month.jsx";
import Time from "./helpers/time";


class Calendar extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.getTimeRangeString = this.getTimeRangeString.bind(this);
        this.updateAppState = this.updateAppState.bind(this);
        this.handleToggleView = this.handleToggleView.bind(this);

        let mdata = Time.getThisMonthData(),
            wdata = Time.getThisWeekData();

        this.state = {
            week : false,
            month : true,
            today : true,
            viewType: "month",
            realMonth: mdata.month,             // the month we are actually on
            currentMonthStart: mdata.start,     // the starting day of this calendar
            currentMonthEnd: mdata.end,
            currentWeekStart: wdata.start,      // the starting date of this week
            currentWeekEnd: wdata.end,
            dateRange: Time.getDateRange("month", mdata.month),  // the string title of the date range
            monthData: mdata.data, 
            weekData: wdata.data 
        };
    }

    // --------------------------- get the time range as string

    getTimeRangeString(type, rangestart){
        let title = "Wibbly Wobbly Timey Wimey";
        title = Time.getDateRange(type, rangestart);

        return title;
    }

    // ---------------------------  update the range

    updateAppState(dataType, viewState){

        // new view state 

        let viewWeek = viewState ? viewState.week : this.state.week,
            viewMonth = viewState ? viewState.month : this.state.month,
            viewType = viewState ? viewState.viewType : this.state.viewType,
            getData = null, 
            startOn = null,
            stateObj = {};

        // what method of getting data?

        if (dataType == "current") { getData = viewWeek ? Time.getWeekData : Time.getMonthData; }
        if (dataType == "next") { getData = viewWeek ? Time.getNextWeekData : Time.getNextMonthData; }
        if (dataType == "prev") { getData = viewWeek ? Time.getPrevWeekData : Time.getPrevMonthData; }
        if (dataType == "today") { getData = viewWeek ? Time.getThisWeekData : Time.getThisMonthData; }


        // figure out what date to start on 

        if (viewWeek) {
            if (this.state.week) {
                startOn = this.state.currentWeekStart; // on week go to next week
            } else {
                if (this.state.today) {
                    startOn = new Date(); // start on today
                } else {
                    startOn = this.state.realMonth; // on month go to week, start on first of month
                }
            }
        }
        if (viewMonth) {
            startOn = this.state.realMonth; // always go 1 real month 
        }

        // ok now get the data 

        let someData = getData(startOn); // this new date set's data
        let range = this.getTimeRangeString(viewType, someData.month); // title string
        let todayInView = Time.isTodayInView(someData.start, someData.end); // is today in new set of dates?

        // put data into state object

        if (viewWeek) {
            stateObj = {
                currentWeekStart: someData.start,
                currentWeekEnd: someData.end,
                weekData: someData.data,
            }
        }
        if (viewMonth) {
            stateObj = {
                currentMonthStart: someData.start,
                currentMonthEnd: someData.end,
                monthData: someData.data,
            }
        }

        if (viewState){ _.extend(stateObj, viewState); } // add view state if any
        _.extend(stateObj, { dateRange: range, today: todayInView, realMonth: someData.month }); // add common info

        // set the state finally
        
        this.setState(stateObj);
    }

    // --------------------------- the view needs to be changed

    handleToggleView(view){

        if (view === "today" && !this.state.today) {
            this.updateAppState("today");
        }
        if (view === "next") {
            this.updateAppState("next");
        }
        if (view === "prev") {  
            this.updateAppState("prev");
        }
        if ((view === "week") && (view !== this.state.viewType)) {
            this.updateAppState("current", { week: true, month: false, viewType: view});
        }
        if ((view === "month") && (view !== this.state.viewType)) {
            this.updateAppState("current", { week: false, month: true, viewType: view});
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
                <Popup />
            </main>
        );
    }
}

export default Calendar;