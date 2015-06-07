/*! Calendar quick event form

input from this form
        - create - submit and parse 
                    - create row in table
                    - create block in week

        - edit - info in field passed to edit view

    need to check boundaries of the browser window in case this runs off

    REGEX a number, if there is and a p after, add to TODAY if nothing is selected
    
**/

import React from "react/addons";
import CalButton from "button.jsx";
import Time from "time";

/** REACT component popup
*/
class QuickEvent extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.monthNames = Time.getMonthNames();
        this.dayNames = Time.getDayNames();
    }

    // --------------------------- find pointer and start timer

    componentDidMount() {
       
    }

    componentWillUnmount() {
      
    }

    handleSubmit(){

    }
   
    render(){

        let day = this.props.day,
            weekday = day.weekday,
            dayTitle = '',
            dayofweek = (day.weekday !== undefined) ? this.dayNames[weekday].slice(0,3) : '',
            hourString = (day.hour == null) ? '' : Time.getHourLong(day),
            selectTime = (day.hour == null) ? '' : <span>, {hourString}</span>,
            selectDate = <span>{ this.monthNames[day.month]} {day.day}</span>;

        if (day.month){
            dayTitle = <span className="quickEvent__time" ref="quicktime">{dayofweek}, {selectDate}{selectTime}</span>
        }

        return (      
            <form className="quickEvent" onSubmit={this.handleSubmit}>
                <fieldset className="quickEvent__set">
                    <label className="quickEvent__label icon-calendar">{dayTitle}</label>
                    <input className="quickEvent__text" id="quickName" type="text" placeholder="describe your event" ref="quickname" />
                </fieldset>
                <fieldset className="quickEvent__action">
                    <CalButton text="Save" classes="button--white" id="save" />
                    <a href="#" className="quickEvent__edit icon-edit">Edit</a>   
                </fieldset>
            </form>
        );
    }
}


export default QuickEvent;