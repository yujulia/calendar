/*! Calendar nav component

**/
import React from "react";

import CalButton from "./button.jsx";

class Nav extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);   
        this.handleClick = this.handleClick.bind(this);
    }

    // --------------------------- toggle view specified by button

    handleClick(viewType){  
        if (this.props.onToggleView) {
            this.props.onToggleView(viewType);
        }
    }

    // --------------------------- RENDER

    render(){
        return (
            <nav className="nav">
                <h1 className="logo">Calendar</h1>
                <div className="nav__time">
                    <CalButton text="Today" id="today" on={this.props.view.today} onBtnClick={this.handleClick}/>
                    <CalButton text="Prev" id="prev" useicon="icon-prev" onBtnClick={this.handleClick}/>
                    <CalButton text="Next" id="next" useicon="icon-next" onBtnClick={this.handleClick}/>
                </div>
                <date className="nav__today">{this.props.dateRange}</date>
                <div className="nav__views">
                    <CalButton text="Week" id="week" on={this.props.view.week} onBtnClick={this.handleClick}/>
                    <CalButton text="Month" id="month" on={this.props.view.month} onBtnClick={this.handleClick} />
                </div>
            </nav>
        );
    }
}

export default Nav;