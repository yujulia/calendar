/*! 
    
**/
import React from "react";
import Calendar from "calendar.jsx";
import $ from "jquery";
import _ from "underscore";

// ------------------------------- load our app

function loadCalendar(){
    React.render(<Calendar />, document.getElementById("calendar-app"));
};

// ------------------------------- on dom ready

$(document).ready(loadCalendar);