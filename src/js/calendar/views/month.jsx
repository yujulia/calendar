/*! Calendar month view

**/
import React from "react/addons";
import $ from "jquery";
import _ from "underscore";
import Time from "time";
import Day from "day.jsx";
import Popup from "popup.jsx";

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/** REACT component CalendarMonth
*/
class CalendarMonth extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.renderWeek = this.renderWeek.bind(this);
        this.renderMonthHeader = this.renderMonthHeader.bind(this);
        this.unselectDay = this.unselectDay.bind(this);

        this.container = null; 
        
        this.state = {
            day: 0,
            dayData: {}
        }
    }

    // --------------------------- mounted

    componentDidMount() {
        this.container = React.findDOMNode(this.refs.container);
        $(window).on("calendar-closepoup", this.unselectDay);
    }

    // --------------------------- unmounting

    componentWillUnmount(){
        $(window).unbind("calendar-closepoup", this.unselectDay);
    }

    // --------------------------- unselect if popup is closed

    unselectDay(){
        if (this.state.day !== 0){
            this.setState({ day: 0 });   
        }   
    }

    // --------------------------- day is clicked

    handleDayClick(data){
        let day = data.day,
            selectedDay = ''+day.year+day.month+day.day;

        _.extend(day, { hour: null, minute: null });

        this.setState({ 
            day: selectedDay, 
            dayData: data.day,
            target: data.element
        }); 

        this.props.triggerPopup(); 
    }

    // --------------------------- render days of this month

    renderDay(day, i){
        let dk = 'day'+i,
            data = {
                day: day,
                onDay: this.state.day,
                realmonth: this.props.data.realMonth
            };

        return(
            <Day onDayClick={this.handleDayClick} data={data} key={dk} ref={dk} />
        );
    }

    // --------------------------- render weeks of this month

    renderWeek(week, i){
        let wkey = "week"+i;

        return (
            <tr className="month__row" key={wkey}>{ week.map(this.renderDay) }</tr>
        );
    }

    // --------------------------- render the week headers

    renderMonthHeader(day, i) {
        let mhkey = "mh"+i;

        return (
            <th className="month__header__item" data-day={i} key={mhkey}>
                <strong>{day.slice(0, 3)}</strong>
            </th>
        );
    }

    // --------------------------- RENDER

    render(){
        let popupData = {
            type: "day",
            day: this.state.dayData,
            target: this.state.target,
            container: this.container,
            showPopup: this.props.data.popupshow
        };

        return (      
            <section className="container" ref="container">
                <ReactCSSTransitionGroup transitionName="month">
                <table className="month" key="m">
                    <thead className="month__header" key="mh">
                        <tr className="month__header__row" key="mhr">
                            { Time.getDayNames().map(this.renderMonthHeader) }
                        </tr>
                    </thead>
                    <tbody key="mb">
                        { this.props.data.month.map(this.renderWeek) }
                    </tbody>
                </table>
                </ReactCSSTransitionGroup>
                <Popup ref="popup" data={popupData} />
            </section>
        );
    }
}

export default CalendarMonth;