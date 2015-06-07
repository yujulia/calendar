/*! Calendar week timeline
    this is only added by "today" hours
**/

import React from "react/addons";
import Time from "time";

const MINUTE_IN_MS = 1000 * 60;
const ON_CLASS = "timeLine timeLine--active";
const OFF_CLASS = "timeLine";
const END_OF_HOUR = 59; // since js time starts at 0;

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
        this.timeout = setTimeout(this.minuteElapsed, MINUTE_IN_MS);
    }

    // --------------------------- clear the timer

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    // --------------------------- every minute if its right hour, move the line

    minuteElapsed(){
        let now = Time.getHourMark();

        if (this.hour == now.hour) {
            if (this.notset){
                this.node.className = ON_CLASS;
                this.notset = false;
            }
            this.node.style.top = now.minute + "px";
            this.minuteMark = now.minute; // save what minute
        } 

        //  moved out of range so reset
        if (this.minuteMark >= END_OF_HOUR) {
            this.notset = true;
            this.node.className = OFF_CLASS ;
            this.minuteMark = 0;
        } 
     
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.minuteElapsed, MINUTE_IN_MS);
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