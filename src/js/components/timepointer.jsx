/*! Calendar week pointer

**/

import React from "react/addons";
import Time from "../helpers/time";

const minute = 1000 * 60;

/** REACT component pointer
*/
class TimePointer extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.minuteElapsed = this.minuteElapsed.bind(this);
    }

    // --------------------------- find pointer and start timer

    componentDidMount() {
        this.pointer = React.findDOMNode(this.refs.pointer);
        this.minuteElapsed();
        this.interval = setInterval(this.minuteElapsed.bind(this), minute);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    minuteElapsed(){
        const offset = 34; // table header - arrow height

        let top = Time.getMinuteMark() + offset; 
        this.pointer.style.top = top + "px";
    }

    render(){
        return (      
            <div className="timepointer icon-next-block" ref="pointer"/>
        );
    }
}


export default TimePointer;