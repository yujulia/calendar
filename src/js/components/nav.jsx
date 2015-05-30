/*! Calendar nav component

**/
import React from "react";
import CalButton from "./button.jsx";

class Nav extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);   

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleTodayClick = this.handleTodayClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);

        this.state = {
            showWeek : false,
            showMonth : false, 
            today: true
        }
    }

    // --------------------------- before load set state to ones passed by parent

    componentWillMount(){
        this.setState({ 
            showWeek: (this.props.viewSelect.week) ? true : false, 
            showMonth: (this.props.viewSelect.month) ? true: false,
            today: (this.props.viewSelect.today) ? true: false,
        });
    }

    // --------------------------- today clicked

    handleTodayClick(){
        if (this.props.onToggleView) {
            this.props.onToggleView("today");
        }
    }

    handlePrev(){
        if (this.props.onToggleView) {
            this.props.onToggleView("prev");
        }
    }

    handleNext(){
        if (this.props.onToggleView) {
            this.props.onToggleView("next");
        }
    }
    // --------------------------- week clicked, inform parent

    handleWeekClick(on){
        if (!on && this.state.showMonth){
            this.setState({ showWeek: true, showMonth: false })
            if (this.props.onToggleView) {
                this.props.onToggleView("week");
            }
        }
    }

    // --------------------------- month clicked, inform parent 

    handleMonthClick(on){
        if (!on && this.state.showWeek ) {
            this.setState({ showWeek: false, showMonth: true })
            if (this.props.onToggleView) {
                this.props.onToggleView("month");
            }
        }
    }

    // --------------------------- RENDER

    render(){
        console.log("render nav");

        return (
            <nav className="nav">
                <h1 className="logo">Calendar</h1>

                <div className="nav__time">
                    <CalButton text="Today" id="today" on={ this.state.today } toggle={true} onBtnClick={ this.handleTodayClick }/>
                    <CalButton text="Prev" id="prev" useicon="icon-prev" onBtnClick={ this.handlePrev }/>
                    <CalButton text="Next" id="next" useicon="icon-next" onBtnClick={ this.handleNext }/>
                </div>

                <date className="nav__today">{ this.props.dateRange }</date>

                <div className="nav__views">
                    <CalButton text="Week" id="week" on={ this.state.showWeek } toggle={true} onBtnClick={ this.handleWeekClick.bind(this) }/>
                    <CalButton text="Month" id="month" on={ this.state.showMonth } toggle={true} onBtnClick={ this.handleMonthClick.bind(this) } />
                </div>
            </nav>
        );
    }
}

export default Nav;