/*! Calendar app
**/

import React from "react";
import Nav from "./nav";
import Week from "./week";

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