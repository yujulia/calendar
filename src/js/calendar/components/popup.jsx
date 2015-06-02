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

        console.log("popup mounted in popup");
        if (this.props.onPopupMount) {
            console.log("call popup mounted")
            this.props.onPopupMount(data);
        } else {
            console.log("popup did not mount");
        }
      
    }
   
    render(){
        let quickevent = <QuickEvent />;

        return (      
            <div className="popup" ref="popup">
                <a href="#" className="popup__close icon-close-round">close</a>
                {quickevent}
            </div>
        );
    }
}


export default Popup;