/*! Calendar week view
**/
import React from "react/addons";
import Time from "../helpers/time";

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/** REACT component Week
*/
class CalendarWeek extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.renderHour = this.renderHour.bind(this);
        this.renderWeekHeader = this.renderWeekHeader.bind(this);
        this.setData = this.setData.bind(this);

        this.state = {
            weekData: [],
            hourData: []
        };
    }

    // --------------------------- load data
    componentWillMount() {
        this.setData();
    }

    // --------------------------- week data
    setData(){
        this.setState({ 
            weekData: Time.getDays(this.props.week.weekStart, this.props.week.weekEnd), 
            hourData: Time.getHours() 
        });
    }

    // --------------------------- render the week day 
    renderDay(hour, day, i) {
        let dhkey = day.day + hour.id +i,
            dhtopkey = dhkey+1,
            dhbotkey = dhkey+2;

        return (
            <td className="week__row__item" data-month={day.month} data-day={ day.day } data-year={day.year} data-hour={hour.id} key={dhkey}>
                <div className="halfhour" data-month={day.month} data-day={ day.day } data-year={day.year} data-hour={hour.id} data-minute="0" key={dhtopkey}/>
                <div className="halfhour divider" data-month={day.month} data-day={ day.day } data-year={day.year} data-hour={hour.id} data-minute="30" key={dhbotkey}/>
            </td>
        );
    }

    // --------------------------- render the week 
    renderHour(hour) {
        let wrlkey = "hourlbl"+hour.id;
        return (
            <tr className="week__row" data-time={ hour.id } key={ hour.id }>
                <th className="week__row__label" data-time={ hour.id } key={ wrlkey }>{hour.label}</th>
                { this.state.weekData.map(function(day, hour, i){ return this.renderDay.apply(this, arguments) }.bind(this, hour)) }
            </tr>
        );
    }

    // --------------------------- render the week headers

    renderWeekHeader(day, i) {
        let whkey = "wh"+i,
            dayName = Time.getDayNames()[i].slice(0,3);

        return (
            <th className="week__header__item" data-day={i} key={whkey}>
                <strong>{dayName}</strong> {day.month}/{day.day}
            </th>
        );
    }

    // --------------------------- RETURN
    render(){

        return (      
            <section className="container">
                <ReactCSSTransitionGroup transitionName="week" transitionAppear={true}>
                <table className="week" key="w">
                    <thead className="week__header" key="wh">
                        <tr className="week__header__row" key="whr">
                            <th className="week__row__label empty" key="whre">
                                <span key="whres" aria-hidden="true">00pm</span>
                            </th>
                            { this.state.weekData.map(this.renderWeekHeader) }
                        </tr>
                    </thead>
                    <tbody key="wb">
                        { this.state.hourData.map(this.renderHour) }
                    </tbody>
                </table>
                </ReactCSSTransitionGroup>
            </section>
        );
    }
}

export default CalendarWeek;