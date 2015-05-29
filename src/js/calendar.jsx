/*! Calendar app
**/

import React from "react";
import Nav from "./components/nav.jsx";
import CalendarWeek from "./components/calendar-week.jsx";
import CalendarMonth from "./components/calendar-month.jsx";

class Calendar extends React.Component {
    render(){
        return (
            <main className="calendar">
                <Nav />
                <CalendarMonth />
            </main>
        );
    }
}

export default Calendar;