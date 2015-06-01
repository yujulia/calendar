/*! Calendar week pointer

**/

import React from "react/addons";
import Time from "../helpers/time";

const minute = 1000 * 60;
const offset = 34;

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
        this.timeout = setTimeout(this.minuteElapsed, minute);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    minuteElapsed(){
        let top = Time.getMinuteMark() + offset; 
        this.pointer.style.top = top + "px";
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.minuteElapsed, minute);
    }

    render(){
        return (      
            <div className="timepointer icon-next-block" ref="pointer"/>
        );
    }
}


export default TimePointer;