/*! Calendar week view

**/
import React from "react/addons";
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
        this.showPopup = this.showPopup.bind(this);
        this.handlePopupMount = this.handlePopupMount.bind(this);

        this.timeLabels = Time.getTimeLabels(); 
        this.today = Time.current();

        this.state = {
            day : 0,
            dayData : {},
            popupWidth : 0,
            popupHeight: 0,
            containerWidth: 0
        }
    }

    // --------------------------- scroll to timeline area if it exists

    componentDidMount() {
        let activeTimeline = document.querySelector(".timeLine--active");
        if (activeTimeline){
            let offset = $(activeTimeline).offset().top - 200,
                container = React.findDOMNode(this.refs.container);
            
            container.scrollTop = offset;
        }

        // probably make parent do this
        this.container = React.findDOMNode(this.refs.container);
        this.popup =   React.findDOMNode(this.refs.popup);


        this.day1Node = document.querySelector(".halfhour");
        console.log(this.day1Node);
    }

    handlePopupMount(data){
        this.setState({
            popupWidth: data.width,
            popupHeight: data.height
        });
    }

    // ---------------------------
    handleHourClick(data){
        console.log("handle hour click");
        this.dayElement = data.element;
        this.setState({ 
            dayData: data.day
        });

        this.showPopup();
    }

    showPopup(){

        // the calculation for popup is different here...
        
        let popupType = ["popup"],
            containerRECT = this.container.getBoundingClientRect(),
            containerWidth = this.container.offsetWidth,
            onedayRECT = this.dayElement.getBoundingClientRect(),
            offsetY = onedayRECT.top - containerRECT.top,
            offsetX = onedayRECT.left - containerRECT.left,
            onedayHeight = this.dayElement.offsetHeight,
            onedayWidth = this.dayElement.offsetWidth,
            calcTop = offsetY - (this.state.popupHeight+10)/2,
            calcLeft = offsetX - this.state.popupWidth/2 + onedayWidth/2;


        // did we hit the top
        if (calcTop <= 0) {
            calcTop = offsetY + (onedayHeight/2);
            popupType.push("popup--bottom");
        } else {
            popupType.push("popup--top");
        }

        // did we hit left or right
        if (calcLeft <= 0) {
            calcLeft = 20;
            popupType.push("popup--left");
        } else if ((calcLeft + this.state.popupWidth) > containerWidth) {
            calcLeft = containerWidth - this.state.popupWidth - 50;   
            popupType.push("popup--right");
        }

        let typeString = popupType.join(" ");
        if (typeString !== this.popup.className) {
            this.popup.className = typeString; 
        }
        
        // let calcTop = 200, calcLeft = 300;

        this.popup.style.top = calcTop + "px"; // subtract popup size here i think
        this.popup.style.left = calcLeft + "px";
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
                <Popup onPopupMount={this.handlePopupMount} ref="popup" day={this.state.dayData}/>
            </section>
        );
    }
}

export default CalendarWeek;