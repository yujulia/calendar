/*! Calendar month view

**/
import React from "react/addons";
import _ from "underscore";
import Time from "time";
import Day from "dayofmonth.jsx";
import Popup from "popup.jsx";

const BOUNCE_RESIZE = 250;

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/** REACT component CalendarMonth
*/
class CalendarMonth extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.renderWeek = this.renderWeek.bind(this);
        this.renderMonthHeader = this.renderMonthHeader.bind(this);
        this.handlePopupMount = this.handlePopupMount.bind(this);
        this.showPopup = this.showPopup.bind(this);

        this.state = {
            day : 0,
            popupWidth : 0,
            popupHeight: 0,
            containerWidth: 0
        }
    }

    // --------------------------- 

    componentDidMount() {
        this.container = React.findDOMNode(this.refs.container);
        this.day1Node = React.findDOMNode(this.refs.day1);
        this.popup =   React.findDOMNode(this.refs.popup);
        this.handleResize = _.debounce(this.handleResize, BOUNCE_RESIZE);
        window.addEventListener("resize", this.handleResize);
    }

    // ---------------------------  handle resize of window

    handleResize(){
        // console.log(" month resize"); // move popup from edge if resized
    }

    // --------------------------- day is clicked

    handleDayClick(clickedDay){
        let selectedDay = ''+clickedDay.year+clickedDay.month+clickedDay.day;
        this.setState({ day: selectedDay });

        this.showPopup();
    }

    showPopup(){
        this.popup.style.left = "50%";
        this.popup.style.top = "50%";
    }


    // --------------------------- the popup has been built

    handlePopupMount(data){
        this.setState({
            popupWidth: data.width,
            popupHeight: data.height
        });
    }

    // --------------------------- render days of this month

    renderDay(day, i){
        let dk = 'day'+i,
            data = {
                popupWidth : this.state.popupWidth,
                popupHeight : this.state.popupHeight,
                containerWidth: this.state.containerWidth,
                day: day,
                onDay: this.state.day,
                realmonth: this.props.realmonth
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
                        { this.props.data.map(this.renderWeek) }
                    </tbody>
                </table>
                </ReactCSSTransitionGroup>
                <Popup onPopupMount={this.handlePopupMount} ref="popup"/>
            </section>
        );
    }
}

export default CalendarMonth;