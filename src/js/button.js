/*! Calendar button component
**/

import React from "react";

class CalButton {
    render(){
        let classes = "nav__button "+this.props.class;

        return (
            <button className={classes}>{ this.props.text }</button>
        );
    }
}

export default CalButton;