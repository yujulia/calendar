/*! Calendar week timeline
    this is only added by "today" hours
**/

import React from "react/addons";
import Time from "../helpers/time";

const minute = 1000 * 60;

/** REACT component timeline
*/
class TimeLine extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.minuteElapsed = this.minuteElapsed.bind(this);
        this.notset = true;

    }

    // --------------------------- find the timeline node and start the timer

    componentDidMount() {
        this.node = React.findDOMNode(this.refs["timeline"]);
        this.hour = this.node.dataset.hour;
        this.minuteMark = 0;
        this.minuteElapsed(); // initialize
        this.interval = setInterval(this.minuteElapsed.bind(this), minute);
    }

    // --------------------------- clear the timer

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // --------------------------- every minute if its right hour, move the line

    minuteElapsed(){
        let now = Time.getHourMark();

        if (this.hour == now.hour) {
            if (this.notset){
                this.node.style.display = "block";
                this.notset = false;
            }
            this.node.style.top = now.minute + "px";
            this.minuteMark = now.minute; // save what minute
        } 

        //  moved out of range so reset
        if (this.minuteMark >= 60) {
            this.notset = true;
            this.node.style.display = "none";
            this.node.style.top = "-5px"; // hide the red line
            this.minuteMark = 0;
        } 
     
    }

    // ---------------------------

    render(){
        let p = this.props;

        return (      
            <div className="timeLine" data-month={p.day.month} data-day={ p.day.day } data-year={ p.day.year} data-hour={ p.hour } ref="timeline" />
        );
    }
}


export default TimeLine;