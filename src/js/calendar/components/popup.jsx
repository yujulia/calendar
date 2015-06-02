/*! Calendar event popup

    this is always attached to the main view
    when something is clicked, pip to parent calendar
    parent also tells child that is selected to have some on state color
    this is poped up in the correct position

    ADD a close animation fade out probably
    add close handler

**/

import React from "react/addons";
import QuickEvent from "quickevent.jsx";

/** REACT component popup
*/
class Popup extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    // --------------------------- get the width and height of popup for calculations

    componentDidMount() {
        let popup = React.findDOMNode(this.refs.popup),
            w = popup.offsetWidth,
            h = popup.offsetHeight,
            data = {
                width: w,
                height: h,
                popup: popup
            };

        if (this.props.onPopupMount) {
            this.props.onPopupMount(data);
        } 
    }
   
    render(){
        let quickevent = <QuickEvent />;

        return (      
            <div className="popup" ref="popup">
                <a href="#" className="use-icon popup__close">
                    <span className="icon icon-close-round"></span>
                    <span className="access-text" aria-hidden="true">close</span>
                </a>
                {quickevent}
            </div>
        );
    }
}


export default Popup;