/*! Calendar week view

**/
import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Time from "time";
import TimePointer from "timepointer.jsx";
import Hour from "hour.jsx";
import Popup from "popup.jsx";

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/** REACT component Week
*/
class CalendarWeek extends React.Component {

    constructor() {
        super();        
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.renderHour = this.renderHour.bind(this);
        this.renderWeekHeader = this.renderWeekHeader.bind(this);
        this.handleHourClick = this.handleHourClick.bind(this);

        this.timeLabels = Time.getTimeLabels(); 
        this.today = Time.current();
        this.popup = null;
        this.container = null; 

        this.state = {
            day : 0,
            dayData : {}
        }
    }

    // --------------------------- scroll to timeline area if it exists

    componentDidMount() {

        // if there is an active timeline scroll the window so we can see it
        let activeTimeline = document.querySelector(".timeLine--active");
        if (activeTimeline){
            let offset = $(activeTimeline).offset().top - 200,
                container = React.findDOMNode(this.refs.container);
            
            container.scrollTop = offset;
        }

        this.popup = React.findDOMNode(this.refs.popup);
        this.container = React.findDOMNode(this.refs.container);

        let parentData = {
            container: this.container,
            popup: this.popup
        }

        this.props.loadChildData(parentData);
    }

    // ---------------------------
    handleHourClick(data){

        _.extend(data.day, {
            hour: data.hour,
            minute: data.minute
        });
              
        // this data contains hour and minute, more than month
        this.setState({ 
            dayData: data.day
        }); // this populates data in popup

        let clickData = {
            target: data.element,
            day: data.day,
            type: "halfhour"
        }

        this.props.triggerPopup(clickData);
    }
 
    // --------------------------- render the week day 

    renderDay(hourID, day, i) {
        let dhkey = '' + day.year + day.day + hourID + i,
            hourData = {
                thisDay: day,
                hour: hourID,
                index : i
            };
        return(
            <Hour data={hourData} key={dhkey} onHourClick={this.handleHourClick} ref={dhkey}/>
        )
    }

    // --------------------------- render the week 
    renderHour(label, timeID) {
        let wrlkey = "hourlbl" + timeID;

        return (
            <tr className="week__row" data-time={timeID} key={timeID}>
                <th className="week__row__label" data-time={timeID} key={wrlkey}>
                    {label}
                </th>
                { this.props.data.map(function(timeID){ return this.renderDay.apply(this, arguments) }.bind(this, timeID)) }
            </tr>
        );
    }

    // --------------------------- render the week headers

    renderWeekHeader(day, i) {
        let whkey = "wh"+i,
            dayName = Time.getDayNames()[i].slice(0,3),
            todayClass = 'week__header__item';
            
        if (this.today.year == day.year && this.today.month == day.month && this.today.day == day.day) {
            todayClass += ' today';
        } 

        return (
            <th className={todayClass} data-day={i} key={whkey}>
                <strong>{dayName}</strong> {day.month+1}/{day.day}
            </th>
        );
    }

    // --------------------------- RETURN
    render(){

        return (      
            <section className="container" ref="container">
                <ReactCSSTransitionGroup transitionName="week">
                <table className="week" key="w">
                    <thead className="week__header" key="wh">
                        <tr className="week__header__row" key="whr">
                            <th className="week__row__label empty" key="whre">
                                <span key="whres" aria-hidden="true">00pm</span>
                            </th>
                            { this.props.data.map(this.renderWeekHeader) }
                        </tr>
                    </thead>
                    <tbody key="wb">
                        { this.timeLabels.map(this.renderHour) }
                    </tbody>
                </table>
                <TimePointer />
                </ReactCSSTransitionGroup>
                <Popup ref="popup" day={this.state.dayData}/>
            </section>
        );
    }
}

export default CalendarWeek;