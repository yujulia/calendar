/*! Calendar nav component
**/
import React from "react";
import CalButton from "./button.jsx";

class Nav {
    render(){
        return (
            <nav className="nav">
                <h1 className="logo">Calendar</h1>

                <div className="nav__time">
                    <CalButton text={ "Today" } class="nav__button--today" />
                    <CalButton text={ "Prev" } class="nav__button--prev" />
                    <CalButton text={ "Next" } class="nav__button--next" />
                </div>

                <date className="nav__today">April 2015</date>

                <div className="nav__views">
                    <CalButton text={ "Week" } class="nav__button--week on"/>
                    <CalButton text={ "Month" } class="nav__button--month"/>
                </div>
            </nav>
        );
    }
}

export default Nav;