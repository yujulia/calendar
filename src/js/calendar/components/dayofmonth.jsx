/** Calendar one day in a month

*/
import React from "react/addons";
import _ from "underscore";
import Time from "time";

/** REACT component dayofmonth
*/
class DayOfMonth extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.today = Time.current();
        this.monthNames = Time.getMonthNames();
    }

    // --------------------------- find pointer and start timer

    componentDidMount() {
        this.handleClick = _.debounce(this.handleClick.bind(this), 150);
    }

    // ---------------------------

    handleClick(){
        console.log("click");
        let data = {
            day: this.props.data.day,
            dayElement: React.findDOMNode(this.refs.day)
        }
        if (this.props.onDayClick) {
            this.props.onDayClick(data);
        }
    }

    // ---------------------------
   
    render(){

        let day = this.props.data.day, 
            dKey = ''+day.year+day.month+day.day,
            dlkey = "dl" + dKey,
            dayLabel='',
            classArray = ['month__item'];

        if (day.day == 1) {
            dayLabel = <span>{ this.monthNames[day.month].slice(0,3) } <span className="num">{day.day}</span></span>;
        } else {
            dayLabel = <span className="num">{day.day}</span>;
        }
        if (day.month !== this.props.data.realmonth ) {
            dayLabel = <span className="fade">{ dayLabel }</span>;
        }
        if (this.today.year == day.year && this.today.month == day.month && this.today.day == day.day) {
            classArray.push('today');
        } 
        if (this.props.data.onDay === dKey) {
            classArray.push('on');
        } else {
            classArray = _.without(classArray, "on"); 
        }

        return(
            <td className={classArray.join(' ')} data-month={day.month} data-day={ day.day } data-year={day.year} key={dKey} ref="day" onClick={ this.handleClick }>
                <span className="month__item__label" key={dlkey}>{ dayLabel }</span>
            </td>
        );
    }
}

export default DayOfMonth;