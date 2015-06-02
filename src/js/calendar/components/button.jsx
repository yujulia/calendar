/*! Calendar generic button component
    a button can be "toggle" where there is an persistent on state
**/
import React from "react";
import _ from "underscore";

class CalButton extends React.Component {

    constructor() {
        super();

        this.render = this.render.bind(this);   
        this.handleClick = this.handleClick.bind(this);
        this.handleClick = _.debounce(this.handleClick, 250);
        this.renderIcon = this.renderIcon.bind(this);
    }

    // --------------------------- button clicked, let parent know if button is on

    handleClick(e) {
        let BTN = React.findDOMNode(this.refs.btn);
        BTN.blur(); // clear focus in chrome...

        if (this.props.onBtnClick) {
            this.props.onBtnClick(this.props.id);
        }
    }

    // ---------------------------- render icon and hidden text
    renderIcon(){
        return(
            <span className={this.props.useicon}>
                <span className="access-text">{this.props.text}</span> 
            </span>
        );
    }

    // --------------------------- RENDER

    render(){
        let classArray = ["button"],
            buttonInside = this.props.text;

        if (this.props.id) { classArray.push("button--"+this.props.id)} // add element class
        if (this.props.classes) { classArray.push(this.props.classes); } // add passed in class
        if (this.props.on) { 
            classArray.push("on"); // add on state
        } else { 
            classArray = _.without(classArray, "on"); // remove on state
        }
        
        if (this.props.useicon){ buttonInside = this.renderIcon(); }
        
        return (
            <button className={classArray.join(" ")} onClick={this.handleClick} ref="btn" key={ this.props.id }>
                { buttonInside }
            </button>
        );
    }
}

export default CalButton;