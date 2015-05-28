/*! 
    
**/
import React from "react";
import Calendar from "./calendar.jsx";

// ------------------------------- load our app

function loadCalendar(){
    React.render(<Calendar />, document.getElementById("calendar-app"));
};

// ------------------------------- on dom load

Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  })
]).then(loadCalendar);