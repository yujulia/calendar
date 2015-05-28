/*! 
    
**/
import React from "react";
import Calendar from "./calendar.jsx";

function loadCalendar(){
    let Root = document.getElementById("calendar-app");
    React.render(<Calendar />, Root);
};

Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  })
]).then(loadCalendar);