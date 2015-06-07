/*! 
    
**/
import React from "react";
import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import Router from "router";
import Calendar from "calendar.jsx";


// ------------------------------- load our app

function loadCalendar(){

    // var Router = Backbone.Router.extend({
    //   routes : {
    //     ""    : "index",
    //     "month" : "month",
    //     "week" : "week"
    //   },
    //   index : function() {
    //     console.log("index");
    //   },
    //   month : function() {
    //     console.log("month");
    //   },
    //   week : function() {
    //     console.log("week");
    //   }
    // });

    let router = new Router();


    React.render(<Calendar router={router}/>, document.getElementById("calendar-app"));
    Backbone.history.start();
};

// ------------------------------- on dom ready

$(document).ready(loadCalendar);