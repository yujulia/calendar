/*! Calendar button component
**/

import React from "react";

class CalButton {
    render(){
        let classes = "button " + this.props.class;
        return (
            <button className={classes}>{ this.props.text }</button>
        );
    }
}

export default CalButton;