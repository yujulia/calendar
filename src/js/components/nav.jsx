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
                    <CalButton text={ "Today" } class="button--today" />
                    <CalButton text={ "Prev" } class="button--prev" />
                    <CalButton text={ "Next" } class="button--next" />
                </div>

                <date className="nav__today">April 2015</date>

                <div className="nav__views">
                    <CalButton text={ "Week" } class="button--week on"/>
                    <CalButton text={ "Month" } class="button--month"/>
                </div>
            </nav>
        );
    }
}

export default Nav;