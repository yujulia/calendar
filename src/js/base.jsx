/*! 
    
**/
import React from "react";
import Calendar from "calendar.jsx";
import $ from "jquery";
import _ from "underscore";

function clickedH1(){
    console.log("h1 click");
}

// ------------------------------- load our app

function loadCalendar(){
    React.render(<Calendar />, document.getElementById("calendar-app"));

    $("h1").click(_.debounce(clickedH1, 400));
};

// ------------------------------- on dom ready

$(document).ready(loadCalendar);