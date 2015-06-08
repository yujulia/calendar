/*! 
    
**/
import React from "react";
import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import Router from "router";
import Calendar from "calendar.jsx";

// ------------------------------- load our app

var loadCalendar = () => {

    let router = new Router();

    React.render(<Calendar router={router}/>, document.getElementById("calendar-app"));
    
    Backbone.history.start();
};

// ------------------------------- on dom ready

$(document).ready(loadCalendar);