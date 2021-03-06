/** Calendar one hour in a day

*/
import React from "react/addons";
import _ from "underscore";
import Time from "time";
import TimeLine from "timeline.jsx";

/** REACT component hour
*/
class Hour extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleStartHourClick = this.handleStartHourClick.bind(this);
        this.handleEndHourClick = this.handleEndHourClick.bind(this);
        this.today = Time.current();

    }

    // --------------------------- find pointer and start timer

    componentDidMount() {
        this.handleClick = _.debounce(this.handleClick.bind(this), 150);
    }

    // ---------------------------

    handleClick(moreData){
        let data = {
            day: this.props.data.thisDay,
            hour: this.props.data.hour
        }
        _.extend(data, moreData); // add data

        if (this.props.onHourClick) {
            this.props.onHourClick(data);
        }
    }

    // ---------------------------

    handleStartHourClick(){
        let extData = {
            minute: 0,
            element: React.findDOMNode(this.refs.startHour)
        }
        this.handleClick(extData);
    }

    // ---------------------------

    handleEndHourClick(){
        let extData = {
            minute: 30,
            element: React.findDOMNode(this.refs.endHour)
        }
        this.handleClick(extData);
    }

    // ---------------------------
   
    render(){

        let data = this.props.data,
            hourID = data.hour,
            day = data.thisDay,
            i = data.index,
            dhkey = day.day + hourID +i,
            dhtopkey = dhkey+1,
            dhbotkey = dhkey+2,
            timelineKey = "timeline-" + hourID,
            isToday = (this.today.year == day.year && this.today.month == day.month && this.today.day == day.day),
            todayClass = isToday ? 'week__row__item today' : 'week__row__item',
            timeline = isToday ? <TimeLine day={day} hour={hourID} key={timelineKey} ref="timeline"/> : '';

        return(
            <td className={todayClass} key={dhkey} >
                <div className="hour">
                    <div className="halfhour" ref="startHour" onClick={this.handleStartHourClick} data-month={day.month} data-day={ day.day } data-year={day.year} data-hour={hourID} data-minute="0" key={dhtopkey}/>
                    <div className="halfhour divider" ref="endHour" onClick={this.handleEndHourClick} data-month={day.month} data-day={ day.day } data-year={day.year} data-hour={hourID} data-minute="30" key={dhbotkey}/>
                    {timeline}
                </div>
            </td>
        );
    }
}

export default Hour;