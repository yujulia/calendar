/*! Calendar app
**/

import React from "react";
import Nav from "./components/nav.jsx";
import CalendarWeek from "./components/calendar-week.jsx";
import CalendarMonth from "./components/calendar-month.jsx";
import timestuff from "./helpers/time";

class Calendar extends React.Component {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);

        this.state = {
            viewSelect : {
                week : true,
                month : false,
                today : true
            },
            monthSelect : timestuff.getFullMonth(),
            weekSelect : timestuff.getFullWeek()
        };
    }

    // ---------------------------  
    componentWillMount(){

    }

    // --------------------------- toggle between week and month

    handleToggleView(view){
        this.setState({ 
            viewSelect: {
                week: (view ==="week") ? true : false,
                month: (view === "month") ? true: false,
                today: (view === "today") ? true: false
            }
        });

        // other states like prev and next here
    }

    // --------------------------- RENDER

    render(){

        let week = this.state.viewSelect.week ? <CalendarWeek week={ this.state.weekSelect } /> : '',
            month = this.state.viewSelect.month ? <CalendarMonth month={ this.state.monthSelect} /> : '';

        return (
            <main className="calendar">
                <Nav onToggleView={ this.handleToggleView.bind(this) } viewSelect={this.state.viewSelect} />
                { week } { month }
            </main>
        );
    }
}

export default Calendar;