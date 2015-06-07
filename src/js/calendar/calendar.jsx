/*! Calendar app
**/

import React from "react";
import _ from "underscore";
import $ from "jquery";
import Nav from "nav.jsx";
import CalendarWeek from "week.jsx";
import CalendarMonth from "month.jsx";
import Time from "time";

const BOUNCE_RESIZE = 250;

class Calendar extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.getTimeRangeString = this.getTimeRangeString.bind(this);
        this.updateAppState = this.updateAppState.bind(this);
        this.handleToggleView = this.handleToggleView.bind(this);
        
        this.loadChildData = this.loadChildData.bind(this);
        this.triggerPopup = this.triggerPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);

        let mdata = Time.getThisMonthData(),
            wdata = Time.getThisWeekData();

        this.state = {
            week: false,
            month: true,
            today: true,
            viewType: "month",
            realMonth: mdata.month,             // the month we are actually on
            currentMonthStart: mdata.start,     // the starting day of this calendar
            currentMonthEnd: mdata.end,
            currentWeekStart: wdata.start,      // the starting date of this week
            currentWeekEnd: wdata.end,
            dateRange: Time.getDateRange("month", mdata.month),  // the string title of the date range
            monthData: mdata.data, 
            weekData: wdata.data,

            // clickDay: '',      // the day user clicked on
            // popupWidth: 0,
            // popupHeight: 0,
            // containerWidth: 0  // container width 
        };

        this.popupShow = false;
        this.popup = null;
        this.popupWidth = 0;
        this.popupHeight = 0;

        this.container = null;
        this.containerWidth = 0;
        this.containerRECT = 0;

        this.clicked = null;
        this.clickedWidth = 0;
        this.clickedHeight = 0;
    }

    // --------------------------- 

    componentDidMount() {
        this.handleResize = _.debounce(this.handleResize, BOUNCE_RESIZE);
        window.addEventListener("resize", this.handleResize);
    }

    // ---------------------------  child passed up some data on load
    loadChildData(data){
        this.popup = data.popup;
        this.popupWidth = this.popup.offsetWidth;
        this.popupHeight = this.popup.offsetHeight;
        this.popupClose = this.popup.querySelector(".popup__close");
        $(this.popupClose).on("click", this.closePopup);

        this.container = data.container;
        this.containerWidth = this.container.offsetWidth;
        this.containerRECT = data.container.getBoundingClientRect();
    }

    // ---------------------------  handle resize of window

    handleResize(){
        this.containerWidth = this.container.offsetWidth;
        this.containerRECT = this.container.getBoundingClientRect();

        // calculate clicked element size if any
        // update popup position
    }

    // ---------------------------  close the popup if these areas are clicked
    closePopup(e){
        if (e) { e.preventDefault(); }
        if (this.popup && this.popupShow){
            this.popup.style.left = "-10000px";
            this.popup.style.top = "-10000px";
            this.poupShow = false;
        }
    }

    // --------------------------- a child component has called trigger pop handler
    triggerPopup(data){

        let popupType = ["popup"],
            elementRECT = data.target.getBoundingClientRect(),
            offsetY = elementRECT.top - this.containerRECT.top,
            offsetX = elementRECT.left - this.containerRECT.left,
            eleHeight = data.target.offsetHeight,
            eleWidth = data.target.offsetWidth,
            calcTop = offsetY - (this.popupHeight+10)/2,
            calcLeft = offsetX - this.popupWidth/2 + eleWidth/2;

        // calculation for week element is different
        if (data.type === "halfhour") {
            calcTop = offsetY - (this.popupHeight + 5) + this.container.scrollTop;
        }

        // did we hit the top
        if ((calcTop-this.container.scrollTop) <= 0) {
            if (data.type === "day") {
                calcTop = offsetY + (eleHeight/2);
            } else {
                calcTop = offsetY + eleHeight + 5 + this.container.scrollTop;
            }
            popupType.push("popup--bottom");
        } else {
            popupType.push("popup--top");
        }

        // did we hit left or right
        if (calcLeft <= 0) {
            if (data.type === "day") {
                calcLeft = 20;
            } else {
                calcLeft = offsetX + 15;
            }
            popupType.push("popup--left");

        } else if ((calcLeft + this.popupWidth) > this.containerWidth) {
            calcLeft = this.containerWidth - this.popupWidth - 50;   
            popupType.push("popup--right");
        }
        

        // set the new popup class if its different
        let typeString = popupType.join(" ");
        if (typeString !== this.popup.className) {
            this.popup.className = typeString; 
        }
     
        // update popup position
        this.popup.style.top = calcTop + "px"; // subtract popup size here i think
        this.popup.style.left = calcLeft + "px";

        this.popupShow = true;
    }

    // --------------------------- 
    showPopup(){
        
        // let popupType = ["popup"],
        //     containerRECT = this.container.getBoundingClientRect(),
        //     containerWidth = this.container.offsetWidth,
        //     onedayRECT = this.dayElement.getBoundingClientRect(),
        //     offsetY = onedayRECT.top - containerRECT.top,
        //     offsetX = onedayRECT.left - containerRECT.left,
        //     onedayHeight = this.dayElement.offsetHeight,
        //     onedayWidth = this.dayElement.offsetWidth,
        //     calcTop = offsetY - (this.state.popupHeight+10)/2,
        //     calcLeft = offsetX - this.state.popupWidth/2 + onedayWidth/2;


        // // did we hit the top
        // if (calcTop <= 0) {
        //     calcTop = offsetY + (onedayHeight/2);
        //     popupType.push("popup--bottom");
        // } else {
        //     popupType.push("popup--top");
        // }

        // // did we hit left or right
        // if (calcLeft <= 0) {
        //     calcLeft = 20;
        //     popupType.push("popup--left");
        // } else if ((calcLeft + this.state.popupWidth) > containerWidth) {
        //     calcLeft = containerWidth - this.state.popupWidth - 50;   
        //     popupType.push("popup--right");
        // }

        // let typeString = popupType.join(" ");
        // if (typeString !== this.popup.className) {
        //     this.popup.className = typeString; 
        // }
        

        // this.popup.style.top = calcTop + "px"; // subtract popup size here i think
        // this.popup.style.left = calcLeft + "px";
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
        let week = this.state.week ? <CalendarWeek data={this.state.weekData} today={this.state.today} triggerPopup={this.triggerPopup} loadChildData={this.loadChildData}/> : '',
            month = this.state.month ? <CalendarMonth data={this.state.monthData} realmonth={this.state.realMonth.getMonth()} triggerPopup={ this.triggerPopup } loadChildData={this.loadChildData}/> : '',
            viewData = { 
                week: this.state.week, 
                month: this.state.month, 
                today: this.state.today 
            };

        return (
            <main className="calendar" >
                <Nav onToggleView={ this.handleToggleView } view={viewData} dateRange={this.state.dateRange} onAnyClick={this.closePopup} />
                <aside className="calendar__aside" onClick={this.closePopup}>aside content </aside>
                { week }{ month }
            </main>
        );
    }
}

export default Calendar;