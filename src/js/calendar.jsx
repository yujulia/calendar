/*! Calendar app
**/

import React from "react";
import Nav from "./components/nav.jsx";
import Week from "./components/week.jsx";

class Calendar {
    render(){
        return (
            <main className="calendar">
                <Nav />
                <Week />
            </main>
        );
    }
}

export default Calendar;