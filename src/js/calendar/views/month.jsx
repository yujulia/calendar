/*! Calendar month view

**/
import React from "react/addons";
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
        this.handleDayClick = this.handleDayClick.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.renderWeek = this.renderWeek.bind(this);
        this.renderMonthHeader = this.renderMonthHeader.bind(this);

        this.popup = null;
        this.container = null; 
        
        this.state = {
            day : 0,
            dayData : {}
        }
    }

    // --------------------------- 

    componentDidMount() {
        this.popup = React.findDOMNode(this.refs.popup);
        this.container = React.findDOMNode(this.refs.container);

        let parentData = {
            container: this.container,
            popup: this.popup
        }

        this.props.loadChildData(parentData);
    }

    // --------------------------- day is clicked

    handleDayClick(data){
        let day = data.day,
            selectedDay = ''+day.year+day.month+day.day;

        this.setState({ 
            day: selectedDay, 
            dayData: data.day
        }); 

        let clickData = {
            target: data.dayElement,
            day: data.day,
            type: "day"
        }

        this.props.triggerPopup(clickData);
    }

    // --------------------------- render days of this month

    renderDay(day, i){
        let dk = 'day'+i,
            data = {
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
                <Popup ref="popup" day={this.state.dayData}/>
            </section>
        );
    }
}

export default CalendarMonth;