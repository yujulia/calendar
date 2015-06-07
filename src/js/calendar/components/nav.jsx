/*! Calendar nav component

**/
import React from "react";
import CalButton from "button.jsx";

class Nav extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);   
        this.handleClick = this.handleClick.bind(this);
        this.handleAllClicks = this.handleAllClicks.bind(this);
    }

    // --------------------------- toggle view specified by button

    handleClick(viewType){  
        this.props.onToggleView(viewType);
        
    }

    // --------------------------- this includes clicks on empty space
    handleAllClicks(){
        this.props.onAnyClick();
    }

    // --------------------------- RENDER

    render(){
        return (
            <nav className="nav" onClick={this.handleAllClicks}>
                <h1 className="logo">Calendar</h1>
                <div className="nav__time">
                    <CalButton text="Today" id="today" on={this.props.view.today} onBtnClick={this.handleClick}/>
                    <CalButton text="Prev" id="prev" useicon="icon-prev" onBtnClick={this.handleClick}/>
                    <CalButton text="Next" id="next" useicon="icon-next" onBtnClick={this.handleClick}/>
                </div>
                <date className="nav__today">{this.props.view.dateRange}</date>
                <div className="nav__views">
                    <CalButton text="Week" id="week" on={this.props.view.week} onBtnClick={this.handleClick}/>
                    <CalButton text="Month" id="month" on={this.props.view.month} onBtnClick={this.handleClick} />
                </div>
            </nav>
        );
    }
}

export default Nav;