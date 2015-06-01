/** Calendar one day in a month

*/
import React from "react/addons";
import Time from "time";

/** REACT component dayofmonth
*/
class DayOfMonth extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.today = Time.current();
        this.monthNames = Time.getMonthNames();
    }

    // --------------------------- find pointer and start timer

    componentDidMount() {
       
    }

    componentWillUnmount() {
      
    }

    handleSubmit(){

    }
   
    render(){

        let day = this.props.day, i = this.props.index,
            dkey = "day"+day.id, 
            dlkey = "daylabel"+day.id,
            dayString='';

        if (day.day == 1) {
            dayString = <span>{ this.monthNames[day.month].slice(0,3) } <span className="num">{day.day}</span></span>;
        } else {
            dayString = <span className="num">{day.day}</span>;
        }
        if (day.month !== this.props.realmonth ) {
            dayString = <span className="fade">{ dayString }</span>;
        }

        let todayClass = 'month__item';

        if (this.today.year == day.year && this.today.month == day.month && this.today.day == day.day) {
            todayClass += ' today';
        } 

        return(
            <td className={todayClass} data-month={day.month} data-day={ day.day } data-year={day.year} key={dkey}>
                <span className="month__item__label" key={dlkey}>{ dayString }</span>
            </td>
        );
    }
}


export default DayOfMonth;